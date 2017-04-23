import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr('string'),
  lang: DS.attr('string'),
  flashCard: DS.belongsTo('flash-card', {inverse: null})
});
