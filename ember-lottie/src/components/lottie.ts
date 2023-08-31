import Component from '@glimmer/component';
import { action } from '@ember/object';
import { buildWaiter } from '@ember/test-waiters';
import Ember from 'ember';

import { AnimationItem, LottiePlayer } from 'lottie-web';
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
}

export interface LottieSignature {
  Element: HTMLElement;
  Args: LottieArgs;
}

export default class LottieComponent extends Component<LottieSignature> {
  private animation?: AnimationItem;
  private mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');

  get autoplay() {
    return this.canAutoplay ?? true;
  }

  get canAutoplay() {
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
        const response = await fetch(this.args.path);

        if (response.status === 404) {
          throw new NotFoundError();
        } else {
          animationData = await response.json();
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

    this.mediaQuery?.addEventListener(
      'change',
      this.handleReducedMotionPreferenceChange
    );
  }

  willDestroy() {
    super.willDestroy();

    this.mediaQuery?.removeEventListener(
      'change',
      this.handleReducedMotionPreferenceChange
    );

    if (this.animation) {
      this.animation.destroy();
    }
  }

  @action
  private handleReducedMotionPreferenceChange() {
    const prefersReducedMotion = this.mediaQuery?.matches;
    if (prefersReducedMotion) {
      this.animation?.stop();
    }
  }

  private async loadLottie(): Promise<LottiePlayer> {
    const lottieModule = await import('lottie-web');
    return lottieModule.default;
  }
}
