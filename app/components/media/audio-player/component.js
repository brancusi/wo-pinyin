import Ember from 'ember';
import firebase from 'firebase';

const {
  isPresent,
  computed: { notEmpty }
} = Ember;

export default Ember.Component.extend({
  classNames: ['row'],
  hifi: Ember.inject.service(),

  hasAudio: notEmpty('audioUrl'),

  init() {
    try {
      this.set("fbRef", firebase.app().storage().ref());
    } catch(_) {
      this.set("fbRef", undefined);
    }
    this._super(...arguments);
  },

  didReceiveAttrs() {
    if(isPresent(this.get('fbRef'))) {
      this.set('audioUrl', undefined);
      const cloudUrl = this.get('model');

      if(isPresent(cloudUrl)) {
        this.get("fbRef")
          .child(cloudUrl)
          .getDownloadURL()
          .then(url => {
            this.set('audioUrl', url)
          })
          .catch(() => {
            this.set('audioUrl', undefined);
          })
      } else {
        this.set('audioUrl', undefined);
      }
    }
  },

  actions: {
    play() {
      this.get('hifi').play(this.get('audioUrl'));
    }
  }
});
