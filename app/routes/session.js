import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('lesson', params.id)
      .catch(e => {
        return this.store
          .createRecord('lesson', {id:params.id, date:new Date()})
          .save();
      });
  },

  actions: {
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
