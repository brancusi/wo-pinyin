import Ember from 'ember';
import firebase from 'firebase';

export default Ember.Component.extend({
  audioRecorder: Ember.inject.service(),

  init() {
    this._super(...arguments);
    this.get("audioRecorder").requestAccess();
  },

  mouseDown() {
    const recorder = this.get("audioRecorder").createRecorder();
    this.set("recorder", recorder);
    Ember.run.later(recorder.start, 100);
  },

  mouseUp() {
    const recorder = this.get("recorder");
    recorder
      .stop()
      .then(this.get("created"));
  }
});
