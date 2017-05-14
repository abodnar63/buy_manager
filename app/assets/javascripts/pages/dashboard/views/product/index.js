Dashboard.views.ProductIndex = Marionette.View.extend({
  template: "#js-product-index",
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
    this.createModal = new Dashboard.views.CreateProduct({collection: this.collection});
    this.showChildView('create', this.createModal);
    this.showChildView('items', new Dashboard.views.ProductsCollection({collection: this.collection}));
  },

  showCreateModal: function() {
    this.createModal.toggle();
  }
});

Dashboard.views.ProductsCollectionItem = Marionette.View.extend({
  template: "#js-product-item",
  tagName: "button",
  className: "list-group-item",

  behaviors: [Dashboard.behaviors.Destroy],

  itemRemoved: function() {
    $(document).trigger("document-alert", {message: "Вы удалили продукт", type: "alert-success"})
  },
});

Dashboard.views.ProductsCollection = Marionette.CollectionView.extend({
  childView: Dashboard.views.ProductsCollectionItem,
  className: "list-group"
});
