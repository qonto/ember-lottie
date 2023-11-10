import Component from '@glimmer/component';
import { action } from '@ember/object';
import { buildWaiter } from '@ember/test-waiters';
import Ember from 'ember';

import type { AnimationItem, LottiePlayer } from 'lottie-web';
import window from 'ember-window-mock';

const waiter = buildWaiter('ember-lottie:lottie-waiter');
class NotFoundError extends Error {
  constructor() {
    super();

    this.name = 'NotFoundError';
    this.message = 'You must pass an existing file to the `@path`';

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
class LottieError extends Error {
  status: number;
  statusText: string;

  constructor(status: number, statusText: string) {
    super(statusText);

    this.name = 'LottieError';

    this.status = status;
    this.statusText = statusText;
  }
}

export interface LottieArgs {
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animationData?: any;
  path?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  containerId?: string;
  onDataReady?: () => void;
  onError?: (error: unknown) => void;
  fetchOptions?: RequestInit;
}

export interface LottieSignature {
  Element: HTMLElement;
  Args: LottieArgs;
}

export default class LottieComponent extends Component<LottieSignature> {
  private animation?: AnimationItem;
  private mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');

  get autoplay(): boolean {
    return this.canAutoplay ?? true;
  }

  get canAutoplay(): boolean | undefined {
    const prefersReducedMotion = this.mediaQuery?.matches;
    return !prefersReducedMotion && this.args.autoplay;
  }

  @action
  async animate(element: HTMLElement): Promise<void> {
    const token = waiter.beginAsync();
    const lottie = await this.loadLottie();
    let animationData;

    if (this.args.animationData) {
      animationData = this.args.animationData;
    } else if (this.args.path) {
      try {
        const response = await window.fetch(
          this.args.path,
          this.args.fetchOptions,
        );

        if (response.status === 404) {
          throw new NotFoundError();
        } else if (!response.ok) {
          throw new LottieError(response.status, response.statusText);
        } else {
          animationData = await response.json();
        }
      } catch (error) {
        if (this.args.onError) {
          this.args.onError(error);
        } else {
          throw error;
        }
      } finally {
        waiter.endAsync(token);
      }
    }

    this.args.onDataReady?.();

    const { containerId } = this.args;
    const container = containerId
      ? (document.querySelector(`#${containerId}`) as Element)
      : element;

    this.animation = lottie.loadAnimation({
      name: this.args.name,
      loop: this.args.loop,
      autoplay: this.autoplay,
      animationData,
      container,
      rendererSettings: {
        progressiveLoad: true,
      },
    });

    const speed = Ember.testing ? 0 : this.args.speed || 1;
    this.animation.setSpeed(speed);

    if (this.mediaQuery?.addEventListener) {
      this.mediaQuery.addEventListener(
        'change',
        this.handleReducedMotionPreferenceChange,
      );
    } else if (this.mediaQuery?.addListener) {
      // For backward compatibility with older browsers, e.g. Safari 13
      this.mediaQuery.addListener(this.handleReducedMotionPreferenceChange);
    }
  }

  @action
  private handleReducedMotionPreferenceChange(): void {
    const prefersReducedMotion = this.mediaQuery?.matches;
    if (prefersReducedMotion) {
      this.animation?.stop();
    }
  }

  willDestroy(): void {
    super.willDestroy();

    if (this.mediaQuery?.removeEventListener) {
      this.mediaQuery.removeEventListener(
        'change',
        this.handleReducedMotionPreferenceChange,
      );
    } else if (this.mediaQuery?.removeListener) {
      // For backward compatibility with older browsers, e.g. Safari 13
      this.mediaQuery.removeListener(this.handleReducedMotionPreferenceChange);
    }

    if (this.animation) {
      this.animation.destroy();
    }
  }

  private async loadLottie(): Promise<LottiePlayer> {
    const lottieModule = await import('lottie-web');
    return lottieModule.default;
  }
}
