import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('navs/lesson-nav', 'Integration | Component | navs/lesson nav', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{navs/lesson-nav}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#navs/lesson-nav}}
      template block text
    {{/navs/lesson-nav}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
