import DS from 'ember-data';

export default DS.Model.extend({
  pinyin: DS.attr('string'),
  chinese: DS.attr('string'),
  english: DS.attr('string'),
  audioUrl: DS.attr('string'),
  ts: DS.attr('number'),
  position: DS.attr('number', {defaultValue: 1}),

  conversation: DS.belongsTo('conversation')
});
