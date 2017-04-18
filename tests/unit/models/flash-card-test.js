import { moduleForModel, test } from 'ember-qunit';

moduleForModel('flash-card', 'Unit | Model | flash card', {
  // Specify the other units that are required for this test.
  needs: ['model:lesson']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
