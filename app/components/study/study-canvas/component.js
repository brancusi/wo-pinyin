import Ember from 'ember';

const {
  notEmpty
} = Ember.computed;

export default Ember.Component.extend({
  hasFlashCards: notEmpty('flashCards'),

  didInsertElement() {
    this.setupNextStudyCard();
  },

  setupNextStudyCard() {
    const flashCards = this.get('model').toArray();
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
