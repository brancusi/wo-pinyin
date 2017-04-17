import Ember from 'ember';
import firebase from 'firebase';
import { v4 as uuid } from 'uuid';

export default Ember.Route.extend({
  setupController(controller, model) {
    const { record, sessionId } = model;
    this._super(...arguments);

    controller.set('session', record);
    controller.set('sessionId', sessionId);
  },

  async model(params) {
    const record = await this.store.findRecord('lesson', params.id)
      .catch(e => {
        return this.store
          .createRecord('lesson', {id:params.id, date:new Date()})
          .save();
      });

    return {
      record,
      sessionId: params.id
    }
  },

  actions: {
    onAudioCreated(model, blob) {
      const app = firebase.app();
      var storageRef = app.storage().ref();
      const id = uuid();

      const path = `audio/${id}.wav`;
      var audioRef = storageRef.child(path);

      audioRef.put(blob).then(snapshot => {
        model.set("audioUrl", path);
        model.save();
      });
    },

    navigateHome() {
      this.transitionTo("index");
    },

    saveModel(model) {
      model.save();
    },

    async createFlashCard(lesson) {
      await this.store
        .createRecord('flash-card', { lesson, ts:moment().valueOf() })
        .save();

      await lesson.save();
    }
  }
});
