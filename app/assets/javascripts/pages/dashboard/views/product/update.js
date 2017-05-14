Dashboard.views.ProductUpdate = Marionette.View.extend({
  template: "#js-product-update",

  ui: {
    name: "#js-name"
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
            $(document).trigger("document-alert", {message: "Вы изменили продукт", type: "alert-success"})
          }
        }
      );
    }
  }
});
