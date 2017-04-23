import DS from 'ember-data';

export default DS.Model.extend({
  pinyin: DS.belongsTo('translation', {inverse: null}),
  chinese: DS.belongsTo('translation', {inverse: null}),
  english: DS.belongsTo('translation', {inverse: null}),

  audioUrl: DS.attr('string'),
  ts: DS.attr('number'),
  position: DS.attr('number', {defaultValue: 1}),

  conversation: DS.belongsTo('conversation')
});
