// Add any types here that you need for local development only.
// These will *not* be published as part of your addon, so be careful that your published code does not rely on them!

import '@glint/environment-ember-loose';

import Modifier from 'ember-modifier';

import 'ember-source/types';
import 'ember-source/types/preview';

declare class RenderModifier<
  Args extends Array<unknown> = Array<unknown>
> extends Modifier<{
  Element: HTMLElement;
  Args: { Positional: [(element: HTMLElement, args: Args) => void, ...Args] };
}> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'did-insert': typeof RenderModifier;
  }
}
