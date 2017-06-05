Dashboard.views.LabelUpdate = Marionette.View.extend({
  template: "#js-label-update",

  ui: {
    name: "#js-label-name"
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
            $(document).trigger("document-alert", {message: "Вы изменили лейбл", type: "alert-success"})
          }
        }
      );
    }
  }
});
