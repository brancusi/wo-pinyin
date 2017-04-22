import DS from 'ember-data';
import computed from 'ember-computed-decorators';

const { empty, filterBy } = Ember.computed;

export default DS.Model.extend({
  title: DS.attr('string'),
  lesson: DS.belongsTo('lesson'),
  ts: DS.attr('number'),
  position: DS.attr('number', {defaultValue: 1}),

  flashCards: DS.hasMany('flash-card'),

  activeFlashCards: filterBy('flashCards', 'isDeleted', false),

  isEmpty: empty("activeFlashCards")
});
