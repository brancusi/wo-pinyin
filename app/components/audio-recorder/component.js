import Ember from 'ember';
import firebase from 'firebase';

const {
  computed: { notEmpty }
} = Ember;

export default Ember.Component.extend({
  classNames: ['row'],
  audioRecorder: Ember.inject.service(),
  hifi: Ember.inject.service(),

  hasAudio: notEmpty('model.audioUrl'),
  saving: false,

  init() {
    this._super(...arguments);
    this.get("audioRecorder").requestAccess();
  },

  actions: {
    startRecording() {
      const recorder = this.get("audioRecorder").createRecorder();
      this.set("recorder", recorder);
      Ember.run.later(recorder.start, 100);
    },

    stopRecording() {
      this.set("saving", true);
      const recorder = this.get("recorder");
      recorder
        .stop()
        .then(this.get("created"))
        .then(() => this.set("saving", false));
    },

    play() {
      const app = firebase.app();
      var storageRef = app.storage().ref();
      var audioRef = storageRef.child(this.get('model.audioUrl'));

      audioRef
        .getDownloadURL()
        .then(url => this.get("hifi").play(url));
    }
  }
});
