import Ember from 'ember';
import {
  isCorrectAnswer
} from 'wo-pinyin/utils/study-utils';

export default Ember.Component.extend({
  classNames: ['row', 'card-2'],
  currentAnswer: '',
  showingAnswer: false,

  didInsertElement() {
    this.$('textarea').focus();
    window.yo = this.$;
  },

  didReceiveAttrs() {
    this.reset();
  },

  processAnswer(isCorrect) {
    this.set('wasAnswered', true);
    this.set('isCorrect', isCorrect);

    if(isCorrect) {
      Ember.run.later(() => this.get('onComplete')(), 400);
    }
  },

  reset() {
    this.set('wasAnswered', undefined);
    this.set('isCorrect', undefined);
    this.set('currentAnswer', '');
    this.set('showingAnswer', false);
  },

  actions: {
    handleUpdate(str) {
      this.set('wasAnswered', false);
      this.set('currentAnswer', str);
    },

    async submit() {
      const submission = this.get('currentAnswer');
      const answer = await this.get('model.pinyin');

      this.processAnswer(isCorrectAnswer(submission, answer.get('text')));
    },

    showAnswer() {
      this.set('showingAnswer', true);
    }
  }
});
