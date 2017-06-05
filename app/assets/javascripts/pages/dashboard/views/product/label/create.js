Dashboard.views.product.CreateLabel = Marionette.View.extend({
  template: "#js-label-create",
  className: "gap--small",

  ui: {
    createModal: "#js-create-modal"
  },

  behaviors: [Dashboard.behaviors.Create],

  toggle: function() {
    this.ui.createModal.modal("toggle");
  },

  success: function() {
    this.toggle();
    $(document).trigger("document-alert", {message: "Вы создали лейбл", type: "alert-success"})
  }
});
