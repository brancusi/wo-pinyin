import Ember from 'ember';

const STRIP_PUNCTUATION = /[.,\/#!$%\^&\*;:{}=\-_?`~()]/g;

export default Ember.Component.extend({
  classNames: ['row', 'card-2'],
  currentAnswer: '',

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
  },

  actions: {
    handleUpdate(str) {
      this.set('wasAnswered', false);
      this.set("currentAnswer", str);
    },

    async submit() {
      const pinyin = await this.get('model.pinyin');

      const answer = this.get('currentAnswer')
        .replace(STRIP_PUNCTUATION, "")
        .toLowerCase();

      const solution = pinyin.get("text")
        .replace(STRIP_PUNCTUATION, "")
        .toLowerCase();

      this.processAnswer(answer === solution);
    }
  }
});
