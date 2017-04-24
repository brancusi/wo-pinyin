import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('inputs/pinyin-input', 'Integration | Component | inputs/pinyin input', {
  integration: true
});

test('it renders', function(assert) {
  this.on('handleUpdate', function(str){
    this.set('value', str);
  });

  this.set('value', 'o1o2o');

  this.render(hbs`{{inputs/pinyin-input value update=(action 'handleUpdate')}}`);

  assert.equal(this.$('textarea').val(), 'o1o2o');

  this.$('textarea').val('o1o2o3o4');
  this.$('textarea').change();

  assert.equal(this.$('textarea').val(), 'ōóǒò');
});
