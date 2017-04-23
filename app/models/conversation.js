import DS from 'ember-data';
import Ember from 'ember';

const { filterBy, empty } = Ember.computed;

export default DS.Model.extend({
  title: DS.attr('string'),
  lesson: DS.belongsTo('lesson'),
  ts: DS.attr('number'),
  position: DS.attr('number', {defaultValue: 1}),

  flashCards: DS.hasMany('flash-card'),

  activeFlashCards: filterBy('flashCards', 'isDeleted', false),

  isEmpty: empty("activeFlashCards")
});
