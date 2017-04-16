import Ember from "ember";

const { notEmpty, alias } = Ember.computed;

export default Ember.Component.extend({
  classNames: ["row", "btn"],

  hasLabel: notEmpty("label"),
  hasLeftIcon:  notEmpty("leftIcon"),
  hasRightIcon:  notEmpty("rightIcon")
});
