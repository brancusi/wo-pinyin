import Ember from 'ember';

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
