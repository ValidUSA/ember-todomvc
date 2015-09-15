import Ember from "ember";

export default Ember.Component.extend({
  tagName: "li",
  classNameBindings: ["model.isCompleted:completed", "isEditing:editing"],
  isEditing: false,

  actions: {
    editTodo() {
      this.set("isEditing", true);
    },
    acceptChanges() {
      this.set("isEditing", false);

      if (Ember.isEmpty(this.get("model.title"))) {
        this.send("removeTodo");
      } else {
        this.send("save");
      }
    },
    removeTodo() {
      this.get("model").deleteRecord();
      this.send("save");
    },
    save(checked) {
      if (typeof checked !== "undefined") {
        this.set("model.isCompleted", checked);
      }
      this.get("model").save();
    }
  }
});
