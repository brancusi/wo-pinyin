import Ember from 'ember';
import firebase from 'firebase';
import { v4 as uuid } from 'uuid';
import moment from 'moment';

export default Ember.Route.extend({
  setupController(controller, model) {
    const { record, sessionId } = model;

    controller.set('session', record);
    controller.set('sessionId', sessionId);

    this._super(...arguments);
  },

  async model(params) {
    const record = await this.store.findRecord('lesson', params.id)
      .catch(() => {
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

      audioRef.put(blob).then(() => {
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

    // @TODO: Not sure why this is failing.
    async destroyModel(flashCard, lesson) {
      await flashCard
        .destroyRecord()
        .catch(() => {});

      await lesson.save();
    },

    async createFlashCard(lesson) {
      await this.store
        .createRecord('flash-card', { lesson, ts:moment().valueOf() })
        .save();

      await lesson.save();
    }
  }
});
