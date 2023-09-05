![ember-lottie-illustration](https://user-images.githubusercontent.com/15218861/189691066-5fe5bb92-2451-4772-b3e6-978ac207bec2.svg)

# ember-lottie

![CI](https://github.com/qonto/ember-lottie/workflows/CI/badge.svg)
[![Latest NPM release][npm-badge]][npm-badge-url]

[npm-badge]: https://img.shields.io/npm/v/@qonto/ember-lottie.svg
[npm-badge-url]: https://www.npmjs.com/package/@qonto/ember-lottie

Render [lottie](https://github.com/airbnb/lottie-web) after effects animations in [Ember.js](https://emberjs.com).

## Compatibility

- Ember.js v3.28 or above
- Ember CLI v3.28 or above
- Node.js v14 or above

## Installation

```
ember install @qonto/ember-lottie
```

## Usage

```hbs
<Lottie
  @name="empty state"
  @animationData={{this.animationData}}
  @path="/data.json"
  @loop={{false}}
  @autoplay={{false}}
  @speed={{500}}
  @containerId={{this.id}}
  @onDataReady={{this.args.onDataReady}}
/>
```

## API reference

### Arguments

| Argument      | Type     | Description                                                                                     |     | Example |
| ------------- | -------- | ----------------------------------------------------------------------------------------------- | --- | ------- |
| name          | string   | animation name for future reference                                                             |
| animationData | object   | an object with the exported animation data (mandatory at least one: `animationData` or `path`)  |
| path          | string   | the relative path to the animation object (mandatory at least one: `animationData` or `path`)   |
| loop          | boolean  | by default at `true`, the animation runs forever, at `false`, the animation is played only once |
| autoplay      | boolean  | by default to `true`, it will play as soon as it's loaded                                       |
| speed         | number   | `1` is normal speed                                                                             |
| containerId   | string   | the dom element id on which to render the animation (mandatory)                                 |
| onDataReady   | function | a function that triggers the Lottie when you want it                                            |

## TypeScript usage

The `Lottie`` component has proper [Glint](https://github.com/typed-ember/glint) types, which allow you to get strict type checking in your templates when using TypeScript.

Unless you are using [strict mode](http://emberjs.github.io/rfcs/0496-handlebars-strict-mode.html) templates (via [first class component templates](http://emberjs.github.io/rfcs/0779-first-class-component-templates.html)),
you need to import the addon's Glint template registry entries as described in the [Using Addons](https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons#using-glint-enabled-addons) documentation:

```ts
// e.g. types/glint.d.ts
import "@glint/environment-ember-loose";
import type LottieRegistry from "@qonto/ember-lottie/template-registry";

declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry
    extends LottieRegistry /* other addon registries */ {
    // local entries
  }
}
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
