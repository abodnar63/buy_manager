Dashboard.views.ListUpdate = Marionette.View.extend({
  template: "#js-list-update",

  ui: {
    name: "#js-list-name"
  },

  events: {
    "blur @ui.name" : "updateName"
  },

  updateName: function() {
    var name = this.ui.name.val();
    if (this.model.get("name") !== name) {
      this.model.save(
        {name: name},
        {
          wait: true,
          success: function() {
            $(document).trigger("document-alert", {message: "Вы изменили список", type: "alert-success"})
          }
        }
      );
    }
  }
});
