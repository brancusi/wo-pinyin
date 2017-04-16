import Ember from 'ember';
import computed from 'ember-computed-decorators';

const { isPresent } = Ember;

export default Ember.Controller.extend({
  timestampSorting: ['ts'],
  sortedFlashCards: Ember.computed.sort('session.flashCards', 'timestampSorting'),

  @computed("sortedFlashCards")
  hasFlashCards(collection) {
    return isPresent(collection);
  },

  @computed('sessionId')
  shareLink(sessionId) {
    return `https://pin.else.run/session/${sessionId}`;
  }
});
