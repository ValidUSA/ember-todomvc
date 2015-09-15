import Ember from "ember";

export default Ember.TextField.extend({
  tagName: "input",
  classNames: ["edit"],
  value: "",

  didInsertElement() {
    this.$().focus();
  },

  actions: {
    acceptChanges() {
      this.set("action", "acceptChanges");
      this.sendAction("action");
    }
  }
});
