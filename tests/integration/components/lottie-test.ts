import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, waitFor } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import type { TestContext as TestContextBase } from '@ember/test-helpers';

import type { LottieArgs } from '@qonto/ember-lottie/components/lottie';

interface TestContext extends TestContextBase {
  args: LottieArgs;
}

module('Integration | Component | lottie', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.args = {
      onDataReady: (): void => {
        /* noop */
      },
    };
  });

  test('it renders', async function (this: TestContext, assert) {
    this.args.onDataReady = () => assert.step('data ready called');

    await render(hbs`
      <Lottie
        @path="/data.json"
        @onDataReady={{this.args.onDataReady}}
      />
    `);

    await waitFor('svg');

    assert.verifySteps(['data ready called']);
  });
});
