import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  @computed('lessonId')
  shareLink(lessonId) {
    return `https://pin.else.run/lesson/${lessonId}`;
  }
});
