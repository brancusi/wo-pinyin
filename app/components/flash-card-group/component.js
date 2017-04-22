import Ember from 'ember';
import computed from 'ember-computed-decorators';

const { isPresent, computed: { alias, sort, gt } } = Ember;

export default Ember.Component.extend({
  classNames: ['card-1'],
  
  sortAsc: ["position:asc"],
  sortedFlashCards:  sort('model.activeFlashCards', 'sortAsc'),
  flashCardCount:    alias("sortedFlashCards.length"),
  hasFlashCards:     gt("flashCardCount", 0),

  actions: {
    handleUpdate(key, str) {
      this.get("model").set(key, str);
      this.get("saveModel")(this.get("model"));
    }
  }
});
