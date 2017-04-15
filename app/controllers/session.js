import Ember from 'ember';

export default Ember.Controller.extend({
  timestampSorting: ['ts'],
  sortedFlashCards: Ember.computed.sort('model.flashCards', 'timestampSorting')
});
