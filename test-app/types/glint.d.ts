import '@glint/environment-ember-loose';
import type LottieRegistry from '@qonto/ember-lottie/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends LottieRegistry {}
}
