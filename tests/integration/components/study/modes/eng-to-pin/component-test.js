import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('study/modes/eng-to-pin', 'Integration | Component | study/modes/eng to pin', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{study/modes/eng-to-pin}}`);

  assert.equal(this.$().text().trim(), '');
});
