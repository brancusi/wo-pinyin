import DS from 'ember-data';

const { empty } = Ember.computed;

export default DS.Model.extend({
  title: DS.attr('string'),
  lesson: DS.belongsTo('lesson'),
  position: DS.attr('number'),
  flashCards: DS.hasMany('flash-card'),

  isEmpty: empty("flashCards")
});
