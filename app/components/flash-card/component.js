import Ember from 'ember';
import _ from 'lodash';
import computed from 'ember-computed-decorators';

const TONE_REGEX = /([aeiouAEIOU][1234])/g;

const TONE_MAPPING = {
  "a1": "ā",
  "a2": "á",
  "a3": "ǎ",
  "a4": "à",

  "A1": "Ā",
  "A2": "Á",
  "A3": "Ǎ",
  "A4": "À",

  "e1": "ē",
  "e2": "é",
  "e3": "ě",
  "e4": "è",

  "E1": "Ē",
  "E2": "É",
  "E3": "Ě",
  "E4": "È",

  "i1": "ī",
  "i2": "í",
  "i3": "ǐ",
  "i4": "ì",

  "I1": "Ī",
  "I2": "Í",
  "I3": "Ǐ",
  "I4": "Ì",

  "o1": "ō",
  "o2": "ó",
  "o3": "ǒ",
  "o4": "ò",

  "O1": "Ō",
  "O2": "Ó",
  "O3": "Ǒ",
  "O4": "Ò",

  "u1": "ū",
  "u2": "ú",
  "u3": "ǔ",
  "u4": "ù",

  "U1": "Ū",
  "U2": "Ú",
  "U3": "Ǔ",
  "U4": "Ù"
};

const {
  computed: { notEmpty }
} = Ember;

export default Ember.Component.extend({
  classNames: ['card-2', 'stretch'],

  setSelection(elm, start, end) {
    elm.selectionStart = start;
    elm.selectionEnd = end;
  },

  actions: {
    processChange(str) {
      const editor = this.$(".pinyinEditor")[0];
      let cursorPosition = editor.selectionStart;
      let newStr = str;
      const matches = str.match(TONE_REGEX);

      if(!_.isEmpty(matches)) {
        newStr = str.replace(TONE_REGEX, match => TONE_MAPPING[match]);
        cursorPosition = cursorPosition - matches.length;
      }

      this.set("model.pinyin", newStr);

      this.get("saveModel")(this.get("model"));

      Ember.run.scheduleOnce('afterRender', this, this.setSelection, editor, cursorPosition, cursorPosition);
    },

    handleUpdate(key, str) {
      this.get("model").set(key, str);
      this.get("saveModel")(this.get("model"));
    }
  }
});
