import Ember from "ember";

const { notEmpty } = Ember.computed;

export default Ember.Component.extend({
  classNames: ["btn"],

  hasLabel: notEmpty("label"),
  hasLeftIcon:  notEmpty("leftIcon"),
  hasRightIcon:  notEmpty("rightIcon")
});
