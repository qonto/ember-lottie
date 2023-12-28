
## [1.1.0](https://github.com/qonto/ember-lottie/compare/v1.0.1...v1.1.0) (2023-12-28)

## [1.0.1](https://github.com/qonto/ember-lottie/compare/v1.0.0...v1.0.1) (2023-12-19)


### Bug Fixes

* dont pass undefined options to fetch ([78e36d4](https://github.com/qonto/ember-lottie/commit/78e36d44e152679c6a5d8d0974576995243eaf20))
* update broken lockfile ([786b705](https://github.com/qonto/ember-lottie/commit/786b7057320ef398566edf63933272a412ad907c))

## v1.0.0 (2023-11-17)

#### :boom: Breaking Change
* [#285](https://github.com/qonto/ember-lottie/pull/285) feat: drop node v16 ([@vscav](https://github.com/vscav))
* [#253](https://github.com/qonto/ember-lottie/pull/253) ci: add TypeScript compatibility check jobs ([@vscav](https://github.com/vscav))

#### :rocket: Enhancement
* [#274](https://github.com/qonto/ember-lottie/pull/274) fix(lottie.ts): passing credentials include param to fetch request ([@mrloop](https://github.com/mrloop))
* [#238](https://github.com/qonto/ember-lottie/pull/238) feat: use official ember-source TypeScript types public preview in addon package ([@vscav](https://github.com/vscav))
* [#237](https://github.com/qonto/ember-lottie/pull/237) feat: use official ember-source TypeScript types public preview in test-app ([@nicolasgasco](https://github.com/nicolasgasco))

#### :bug: Bug Fix
* [#273](https://github.com/qonto/ember-lottie/pull/273) Add backward compatibility with MediaQueryList.addEventListener in older browsers ([@nicolasgasco](https://github.com/nicolasgasco))

#### :memo: Documentation
* [#252](https://github.com/qonto/ember-lottie/pull/252) fix(docs): remove unused columns in API reference table ([@vscav](https://github.com/vscav))
* [#204](https://github.com/qonto/ember-lottie/pull/204) fix: typo in README ([@vscav](https://github.com/vscav))

#### :house: Internal
* [#260](https://github.com/qonto/ember-lottie/pull/260) chore: install and use @qonto/eslint-config-typescript@1.0.0-rc.0 ([@vscav](https://github.com/vscav))
* [#241](https://github.com/qonto/ember-lottie/pull/241) feat(ts): setup and use Glint in test-app package ([@vscav](https://github.com/vscav))
* [#240](https://github.com/qonto/ember-lottie/pull/240) chore(lint): add specific set of rules for TypeScript linting and run lint with --fix option ([@vscav](https://github.com/vscav))
* [#203](https://github.com/qonto/ember-lottie/pull/203) fix: use correct syntax for no-lockfile option ([@nicolasgasco](https://github.com/nicolasgasco))
* [#202](https://github.com/qonto/ember-lottie/pull/202) chore: update action-setup-pnpm to v3 ([@nicolasgasco](https://github.com/nicolasgasco))

#### Committers: 3
- Ewan McDougall ([@mrloop](https://github.com/mrloop))
- Nicolas Gasco ([@nicolasgasco](https://github.com/nicolasgasco))
- Vincent Scavinner ([@vscav](https://github.com/vscav))


## v0.6.1 (2023-09-07)

#### :rocket: Enhancement
* [#196](https://github.com/qonto/ember-lottie/pull/196) throw LottieError if the fetch response is not ok ([@SkoebaSteve](https://github.com/SkoebaSteve))

#### Committers: 5
- Steef Janssen ([@SkoebaSteve](https://github.com/SkoebaSteve))

## v0.6.0 (2023-09-05)

#### :rocket: Enhancement
* [#195](https://github.com/qonto/ember-lottie/pull/195) Add option to pass an onError function to handle any lottie fetch err… ([@SkoebaSteve](https://github.com/SkoebaSteve))
* [#194](https://github.com/qonto/ember-lottie/pull/194) Expose template registry and drop rollup-plugin-ts ([@vscav](https://github.com/vscav))

#### :house: Internal
* [#132](https://github.com/qonto/ember-lottie/pull/132) Remove unnecessary jobs in CI script ([@vscav](https://github.com/vscav))

#### Committers: 5
- Anastasia ([@anas7asia](https://github.com/anas7asia))
- Ewan McDougall ([@mrloop](https://github.com/mrloop))
- Steef Janssen ([@SkoebaSteve](https://github.com/SkoebaSteve))
- Vincent Scavinner ([@vscav](https://github.com/vscav))
- [@CYriuk](https://github.com/CYriuk)


## v0.5.0 (2023-04-13)

#### :house: Internal

- [#63](https://github.com/qonto/ember-lottie/pull/63) Convert to v2 addon format ([@nickschot](https://github.com/nickschot))

#### Committers: 2

- [@nickschot](https://github.com/nickschot)
- [@anas7asia](https://github.com/anas7asia)

## v0.4.0 (2023-02-24)

#### :house: Internal

- [#30](https://github.com/qonto/ember-lottie/pull/30) Update lerna changelog plugin ([@herzzanu](https://github.com/herzzanu))

#### Committers: 2

- Danny Calleri ([@dannycalleri](https://github.com/dannycalleri))
- Sabin Hertanu ([@herzzanu](https://github.com/herzzanu))

## v0.4.0-beta.0 (2023-01-26)

#### :house: Internal

- [#29](https://github.com/qonto/ember-lottie/pull/29) Remove redundant catch block ([@herzzanu](https://github.com/herzzanu))

## v0.3.0 (2023-01-20)

#### :house: Internal

- [#4](https://github.com/qonto/ember-lottie/pull/4) Create dependabot configuration ([@dbendaou](https://github.com/dbendaou))

#### :rocket: Enhancement

- [#5](https://github.com/qonto/ember-lottie/pull/21) MAdd ember test waiters waiter in animate function ([@clairekrucker](https://github.com/clairekrucker))

#### Committers: 2

- Djamel B. ([@dbendaou](https://github.com/dbendaou))
- [@clairekrucker](https://github.com/clairekrucker)

## v0.2.0 (2022-10-05)

#### :rocket: Enhancement

- [#5](https://github.com/qonto/ember-lottie/pull/5) Modify autoplay default by taking into account prefers-reduced-motion ([@dannycalleri](https://github.com/dannycalleri))

#### Committers: 1

- Danny Calleri ([@dannycalleri](https://github.com/dannycalleri))

## v0.1.1 (2022-09-15)

#### :bug: Bug Fix

- [#1](https://github.com/qonto/ember-lottie/pull/1) Fix issues so project builds ([@mrloop](https://github.com/mrloop))

#### :memo: Documentation

- [#2](https://github.com/qonto/ember-lottie/pull/2) Minimal description added in preparation for release ([@mrloop](https://github.com/mrloop))

#### :house: Internal

- [#3](https://github.com/qonto/ember-lottie/pull/3) Add release mechanism ([@mrloop](https://github.com/mrloop))

#### Committers: 1

- Ewan McDougall ([@mrloop](https://github.com/mrloop))

# Changelog
