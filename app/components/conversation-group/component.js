import Ember from 'ember';

const { computed: { alias, sort, gt } } = Ember;

export default Ember.Component.extend({
  sortAsc: ["position:asc"],
  sortedConversations:  sort('model', 'sortAsc'),
  conversationCount:    alias("sortedConversations.length"),
  hasConversations:     gt("conversationCount", 0)
});
