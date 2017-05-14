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
    this.createModal = new Dashboard.views.CreateList({collection: this.collection});
    this.showChildView('create', this.createModal);
    this.showChildView('items', new Dashboard.views.ListsCollection({collection: this.collection}));
  },

  showCreateModal: function() {
    this.createModal.toggle();
  }
});

Dashboard.views.ListsCollectionItem = Marionette.View.extend({
  template: "#js-list-item",
  tagName: "button",
  className: "list-group-item",

  behaviors: [Dashboard.behaviors.Destroy],

  itemRemoved: function() {
    $(document).trigger("document-alert", {message: "Вы удалили список", type: "alert-success"})
  },
});

Dashboard.views.ListsCollection = Marionette.CollectionView.extend({
  childView: Dashboard.views.ListsCollectionItem,
  className: "list-group"
});
