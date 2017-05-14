Dashboard.views.CreateList = Marionette.View.extend({
  template: "#js-list-create",
  className: "gap--small",

  ui: {
    createModal: "#js-create-list-modal",
    createList: "#js-create-list",
    listName: "#js-list-name"
  },

  events: {
    "click @ui.createList" : "createList"
  },

  toggle: function() {
    this.ui.createModal.modal("toggle");
  },

  createList: function() {
    var self = this;
    this.collection.create(
      {
        name: this.ui.listName.val()
      },
      {
        wait: true,
        success: function() {
          self.ui.listName.val();
          self.toggle();
          $(document).trigger("document-alert", {message: "Вы создали список", type: "alert-success"})
        }
      }
    );
  }
});
