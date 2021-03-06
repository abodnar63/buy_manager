Dashboard.views.CreateList = Marionette.View.extend({
  template: "#js-list-create",
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
    $(document).trigger("document-alert", {message: "Вы создали список", type: "alert-success"})
  }
});
