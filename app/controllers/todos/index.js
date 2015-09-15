import Ember from "ember";

export default Ember.Controller.extend({
  newTitle: "",
  remaining: Ember.computed.filterBy("model", "isCompleted", false),
  remainingCount: Ember.computed.oneWay("remaining.length"),
  inflection: Ember.computed("remainingCount", function () {
    return this.get("remainingCount") === 1 ? "todo" : "todos";
  }),
  completed: Ember.computed.filterBy("model", "isCompleted", true),
  completedCount: Ember.computed.oneWay("completed.length"),
  hasCompleted: Ember.computed("completedCount", function () {
    return this.get("completedCount") > 0;
  }),
  allAreDone: Ember.computed("model.length", "completed.length", {
    get (key) {
      return this.get("model").get("length") > 0 && this.get("model").get("length") === this.get("completed").get("length");
    },
    set (key, value) {
      this.get("model").map(function (v, i) {
        v.set("isCompleted", value);
      });
      return value;
    }
  }),

  actions: {
    createTodo() {
      // Get the todo title set by the "New Todo" text field
      var title = this.get("newTitle");
      if (!title.trim()) {
        return;
      }

      // Create the new Todo model
      var todo = this.store.createRecord("todo", {
        title: title,
        isCompleted: false
      });

      // Clear the "New Todo" text field
      this.set("newTitle", "");

      // Save the new model
      todo.save();
    },
    clearCompleted() {
      var completed = this.get("completed");
      completed.invoke("deleteRecord");
      completed.invoke("save");
    }
  }
});
