import Ember from 'ember';

const TONE_REGEX = /([aeiouAEIOU][1234])/;

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

export default Ember.Component.extend({
  classNames: ['stretch'],
  actions: {
    processChange(str) {
      this.set("model.pinyin", str.replace(TONE_REGEX, match => TONE_MAPPING[match]));
    }
  }
});
