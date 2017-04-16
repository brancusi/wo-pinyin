import Ember from 'ember';
import computed from 'ember-computed-decorators';

const { isPresent, computed: { alias, sort } } = Ember;

export default Ember.Controller.extend({
  timestampSorting: ['ts:desc'],
  sortedFlashCards: sort('session.flashCards', 'timestampSorting'),
  cardCount: alias("sortedFlashCards.length"),

  @computed("sortedFlashCards")
  hasFlashCards(collection) {
    return isPresent(collection);
  },

  @computed('sessionId')
  shareLink(sessionId) {
    return `https://pin.else.run/session/${sessionId}`;
  }
});
