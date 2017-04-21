import Ember from 'ember';
import firebase from 'firebase';
import { v4 as uuid } from 'uuid';
import moment from 'moment';

export default Ember.Route.extend({
  setupController(controller, model) {
    const { record, sessionId, twilioData } = model;

    controller.set('session', record);
    controller.set('twilioData', twilioData);
    controller.set('sessionId', sessionId);

    this._super(...arguments);
  },

  async model(params) {
    const twilioDataRes = await fetch("https://wt-brancusi-gmail_com-0.run.webtask.io/create-twilio-token");
    const twilioData = await twilioDataRes.json();

    const record = await this.store.findRecord('lesson', params.id)
      .catch(() => {
        return this.store
          .createRecord('lesson', {id:params.id, date:new Date()})
          .save();
      });

    return {
      record,
      twilioData,
      sessionId: params.id
    }
  },

  actions: {
    onAudioCreated(model, blob) {
      const app = firebase.app();
      var storageRef = app.storage().ref();

      const path = `audio/${uuid()}.wav`;
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
