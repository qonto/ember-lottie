import Component from '@glimmer/component';
import { action } from '@ember/object';
import Ember from 'ember';

import { AnimationItem, LottiePlayer } from 'lottie-web';

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
  animationData?: any;
  path?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  containerId?: string;
  onDataReady?: () => void;
}

export default class LottieComponent extends Component<LottieArgs> {
  animation?: AnimationItem;

  async loadLottie(): Promise<LottiePlayer> {
    const lottieModule = await import('lottie-web');
    return lottieModule.default;
  }

  @action
  async animate(element: HTMLElement): Promise<void> {
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
      } catch (error) {
        if (error instanceof NotFoundError) {
          throw error;
        } else {
          throw new Error(
            'There was an issue fetching the animation file. Try again.'
          );
        }
      }
    }

    this.args.onDataReady?.();

    this.animation = lottie.loadAnimation({
      name: this.args.name,
      loop: this.args.loop,
      autoplay: this.args.autoplay,
      animationData,
      container: document.querySelector(`#${this.args.containerId}`) || element,
      rendererSettings: {
        progressiveLoad: true,
      },
    });

    const speed = Ember.testing ? 0 : this.args.speed || 1;
    this.animation.setSpeed(speed);
  }

  willDestroy() {
    super.willDestroy();

    if (this.animation) {
      this.animation.destroy();
    }
  }
}
