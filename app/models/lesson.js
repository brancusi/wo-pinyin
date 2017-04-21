import DS from 'ember-data';

export default DS.Model.extend({
  conversations: DS.hasMany('conversation'),
  date: DS.attr('date')
});
