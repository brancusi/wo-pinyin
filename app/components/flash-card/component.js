import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['card-2', 'stretch'],

  actions: {
    handleUpdate(model, str) {
      model.set('text', str);
      this.get("saveModel")(model);
    }
  }
});
