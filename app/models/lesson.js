import DS from 'ember-data';

export default DS.Model.extend({
  flashCards: DS.hasMany('flash-card'),
  date: DS.attr('date')
});
