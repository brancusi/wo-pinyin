import Ember from 'ember';
import computed from 'ember-computed-decorators';
import _ from 'lodash';

export default Ember.Component.extend({
  @computed('model.@each.{id}')
  shuffledCards(collection) {
    return _.shuffle(collection.toArray());
  },

  didInsertElement() {
    this.setupNextStudyCard();
  },

  setupNextStudyCard() {
    const flashCards = this.get('shuffledCards');
    const current = this.get('current');

    let flashCard;

    if(Ember.isPresent(current)) {
      const currentIndex = flashCards.indexOf(current.flashCard);

      if(currentIndex + 1 > flashCards.length-1) {
        flashCard = flashCards[0];
      } else {
        flashCard = flashCards[currentIndex + 1];
      }
    } else {
      flashCard = flashCards[0];
    }

    this.set('current', {
      type:'study/modes/eng-to-pin',
      flashCard
    });
  },

  actions: {
    next() {
      this.setupNextStudyCard();
    }
  }
});
