import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('communication/video-chat', 'Integration | Component | communication/video chat', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{communication/video-chat}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#communication/video-chat}}
      template block text
    {{/communication/video-chat}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
