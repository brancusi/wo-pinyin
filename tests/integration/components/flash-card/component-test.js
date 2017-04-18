import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('flash-card', 'Integration | Component | flash card', {
  integration: true
});

test('The index shows in reverse', function(assert) {
  this.render(hbs`{{flash-card total=10 index=0}}`);
  assert.equal(this.$('.index').text().trim(), '10.');
});
