Dashboard.views.CreateList = Marionette.View.extend({
  template: "#js-list-create",

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
        success: function() {
          self.ui.listName.val();
          self.toggle();
          alert("saved");
        }
      }
    );
  }
});
