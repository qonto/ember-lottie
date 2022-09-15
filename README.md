![ember-lottie-illustration](https://user-images.githubusercontent.com/15218861/189691066-5fe5bb92-2451-4772-b3e6-978ac207bec2.svg)


# ember-lottie

![CI](https://github.com/qonto/ember-lottie/workflows/CI/badge.svg)
[![Latest NPM release][npm-badge]][npm-badge-url]

[npm-badge]: https://img.shields.io/npm/v/@qonto/ember-lottie.svg
[npm-badge-url]: https://www.npmjs.com/package/@qonto/ember-lottie


Render [lottie](https://github.com/airbnb/lottie-web) after effects animations in [Ember.js](https://emberjs.com).

## Compatibility

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above


## Installation

```
ember install @qonto/ember-lottie
```


## Usage

```hbs
<Lottie
  @path="/data.json"
  @onDataReady={{this.args.onDataReady}}
/>
```


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
