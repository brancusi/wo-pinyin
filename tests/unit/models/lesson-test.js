import { moduleForModel, test } from 'ember-qunit';

moduleForModel('lesson', 'Unit | Model | lesson', {
  // Specify the other units that are required for this test.
  needs: ['model:conversation']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
