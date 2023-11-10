import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { clearRender, find, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import type { TestContext as TestContextBase } from '@ember/test-helpers';

import window from 'ember-window-mock';
import { setupWindowMock } from 'ember-window-mock/test-support';
import * as sinon from 'sinon';

interface TestContext extends TestContextBase {
  onDataReady: () => void;
  fetchOptions: RequestInit;
}

const NOOP = (): void => {};

module('Integration | Component | lottie', function (hooks) {
  setupRenderingTest(hooks);
  setupWindowMock(hooks);

  const originalQuerySelector: ParentNode['querySelector'] =
    document.querySelector;

  hooks.beforeEach(function (this: TestContext) {
    this.onDataReady = NOOP;
  });

  hooks.afterEach(function () {
    document.querySelector = originalQuerySelector;
  });

  test('it renders', async function (this: TestContext, assert) {
    this.onDataReady = (): void => assert.step('data ready called');

    await render<TestContext>(hbs`
      <Lottie
        @path="/data.json"
        @onDataReady={{this.onDataReady}}
      />
    `);

    find('svg');
    assert.verifySteps(['data ready called']);
  });

  test('it calls window.matchMedia to check for prefers-reduced-motion', async function (this: TestContext, assert) {
    window.matchMedia = (mediaQuery): MediaQueryList => {
      assert.step(`matchMedia(${mediaQuery})`);
      return {
        addEventListener: sinon.spy(),
        removeEventListener: sinon.spy(),
        matches: true,
      } as unknown as MediaQueryList;
    };

    await render<TestContext>(hbs`
      <Lottie
        @path="/data.json"
      />
    `);

    find('svg');
    assert.verifySteps([`matchMedia((prefers-reduced-motion: reduce))`]);
  });

  test('it listens for changes to prefers-reduced-motion and cleanup the listener when destroyed', async function (this: TestContext, assert) {
    const addEventListener = sinon.spy();
    const removeEventListener = sinon.spy();
    window.matchMedia = (): MediaQueryList => {
      return {
        addEventListener,
        removeEventListener,
        matches: true,
      } as unknown as MediaQueryList;
    };

    await render<TestContext>(hbs`
      <Lottie
        @path="/data.json"
      />
    `);

    find('svg');
    assert.true(addEventListener.calledOnce);

    await clearRender();
    assert.true(removeEventListener.calledOnce);
  });

  test('it does not autoplay the animation when prefers-reduced-motion is enabled', async function (this: TestContext, assert) {
    window.matchMedia = (): MediaQueryList => {
      return {
        addEventListener: NOOP,
        removeEventListener: NOOP,
        matches: true,
      } as unknown as MediaQueryList;
    };

    await render<TestContext>(hbs`
      <Lottie
        @path="/data.json"
        @autoplay={{true}}
      />
    `);

    find('svg');
    assert.dom('[data-test-autoplay=false]').exists();
  });

  test('it defaults to addListener and removeListener for browsers where MediaQueryList does not inherit form EventTarget', async function (this: TestContext, assert) {
    const addListener = sinon.spy();
    const removeListener = sinon.spy();
    window.matchMedia = (): MediaQueryList => {
      return {
        addListener,
        removeListener,
        addEventListener: undefined,
        removeEventListener: undefined,
        matches: true,
      } as unknown as MediaQueryList;
    };

    await render<TestContext>(hbs`
      <Lottie
        @path="/data.json"
      />
    `);

    find('svg');
    assert.true(addListener.calledOnce);

    await clearRender();
    assert.true(removeListener.calledOnce);
  });

  test('it does not autoplay the animation when autoplay is false', async function (this: TestContext, assert) {
    window.matchMedia = (): MediaQueryList => {
      return {
        addEventListener: NOOP,
        removeEventListener: NOOP,
        matches: false,
      } as unknown as MediaQueryList;
    };

    await render<TestContext>(hbs`
      <Lottie
        @path="/data.json"
        @autoplay={{false}}
      />
    `);

    find('svg');
    assert.dom('[data-test-autoplay=false]').exists();
  });

  test('it autoplays the animation when prefers-reduced-motion is disabled', async function (this: TestContext, assert) {
    window.matchMedia = (): MediaQueryList => {
      return {
        addEventListener: NOOP,
        removeEventListener: NOOP,
        matches: false,
      } as unknown as MediaQueryList;
    };

    await render<TestContext>(hbs`
      <Lottie
        @path="/data.json"
        @autoplay={{true}}
      />
    `);

    find('svg');
    assert.dom('[data-test-autoplay=true]').exists();
  });

  test('it autoplays the animation by default when prefers-reduced-motion is disabled', async function (this: TestContext, assert) {
    window.matchMedia = (): MediaQueryList => {
      return {
        addEventListener: NOOP,
        removeEventListener: NOOP,
        matches: false,
      } as unknown as MediaQueryList;
    };

    await render<TestContext>(hbs`
      <Lottie
        @path="/data.json"
      />
    `);

    find('svg');
    assert.dom('[data-test-autoplay=true]').exists();
  });

  test('it does not call document.querySelector when containerId is undefined', async function (this: TestContext, assert) {
    const querySelector = sinon.spy();
    document.querySelector = querySelector;
    await render<TestContext>(hbs`
      <Lottie
        @path="/data.json"
      />
    `);

    assert.false(querySelector.calledOnce);

    await render<TestContext>(hbs`
      <Lottie
        @path="/data.json"
        @containerId={{undefined}}
      />
    `);

    assert.false(querySelector.calledOnce);
  });

  test('it calls document.querySelector when containerId is not falsy', async function (this: TestContext, assert) {
    const querySelector = sinon.spy();
    document.querySelector = querySelector;
    await render<TestContext>(hbs`
      <Lottie
        @path="/data.json"
        @containerId='this-is-an-id'
      />
    `);

    assert.true(querySelector.calledOnce);
  });

  test('it should pass fetchOptions to fetch method', async function (this: TestContext, assert) {
    this.fetchOptions = { credentials: 'omit' };
    const fetch = sinon.spy(window, 'fetch');
    await render<TestContext>(hbs`
      <Lottie
        @path="/data.json"
        @fetchOptions={{this.fetchOptions}}
      />
    `);
    const fetchArgs = fetch.getCall(0).args;
    assert.deepEqual(
      fetchArgs,
      ['/data.json', { credentials: 'omit' }],
      'fetch arguments match',
    );
  });

  test('it should pass path to fetch method when fetchOptions is undefined', async function (this: TestContext, assert) {
    const fetch = sinon.spy(window, 'fetch');
    await render(hbs`
      <Lottie
        @path="/data.json"
      />
    `);
    const fetchArgs = fetch.getCall(0).args;
    assert.deepEqual(
      fetchArgs,
      ['/data.json', undefined],
      'fetch arguments match',
    );
  });
});
