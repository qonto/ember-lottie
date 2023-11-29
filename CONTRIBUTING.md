# How To Contribute

## Installation

- `git clone <repository-url>`
- `cd ember-lottie`
- `pnpm install`

## Conventional Commits

This repository enforces conventional commits through Git hooks and `commitlint`. Thus, your commits must follow the [Conventional Commits spec](https://www.conventionalcommits.org/en/v1.0.0/) and `@commitlint/config-conventional` [rules](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#rules).

## Linting

- `pnpm lint`
- `pnpm lint:fix`

## Building the addon

- `cd ember-lottie`
- `pnpm build`

## Running tests

- `cd test-app`
- `pnpm test` – Runs the test suite on the current Ember version
- `ember try:each` – Runs the test suite against multiple Ember versions

## Running the dummy application

- `cd test-app & ember serve`
- Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://cli.emberjs.com/release/](https://cli.emberjs.com/release/).
