import Ember from 'ember';
import { v4 as uuid} from 'uuid';

export default Ember.Route.extend({
  actions: {
    createSession() {
      this.transitionTo(`/session/${uuid()}`)
    }
  }
});
