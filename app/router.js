import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('lesson', {path:'/lesson/:id'});
  this.route('study');
});

export default Router;
