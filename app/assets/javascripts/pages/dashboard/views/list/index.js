Dashboard.views.ListIndex = Marionette.View.extend({
  template: "#js-list-index",
  className: "container--small",

  ui: {
    showModal: ".js-show-create-modal",
  },

  regions: {
    create: "#js-create-region",
    items: "#js-items-region"
  },

  events: {
    "click @ui.showModal" : "showCreateModal",
  },

  onRender: function() {
    this.collection = new Dashboard.collections.Lists();
    this.collection.fetch();
    this.createModal = new Dashboard.views.CreateList({collection: this.collection});
    this.showChildView('create', this.createModal);
    this.showChildView('items', new Dashboard.views.ListCollection({collection: this.collection}));
  },

  showCreateModal: function() {
    this.createModal.toggle();
  }
});

Dashboard.views.ListCollectionItem = Marionette.View.extend({
  template: "#js-list-item",
  tagName: "button",
  className: "list-group-item",

  ui: {
    removeBtn: ".js-remove-list"
  },

  events: {
    "click @ui.removeBtn" : "removeItem"
  },

  removeItem: function() {
    var r = confirm("Список будет удален");
    if (r == true) {
      this.model.destroy({
        wait: true,
        success: function() {
          $(document).trigger("document-alert", {message: "Вы удалили список", type: "alert-success"})
        }
      });
    }
  }
});

Dashboard.views.ListCollection = Marionette.CollectionView.extend({
  childView: Dashboard.views.ListCollectionItem,
  className: "list-group"
});
