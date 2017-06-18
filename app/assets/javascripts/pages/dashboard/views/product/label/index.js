Dashboard.views.product.LabelsIndex = Marionette.View.extend({
  template: "#js-product-label-index",

  ui: {
    createModal: ".js-show-create-modal",
    addModal: ".js-show-add-modal",
  },

  regions: {
    create: "#js-create-region",
    add: "#js-add-region",
    items: "#js-items-region"
  },

  events: {
    "click @ui.createModal" : "showCreateModal",
    "click @ui.addModal" : "showAddModal"
  },

  onRender: function() {
    this.createModal = new Dashboard.views.product.CreateLabel({collection: this.collection});
    this.addModal = new Dashboard.views.product.AddLabels({model: this.model, collection: this.collection});

    this.showChildView('create', this.createModal);
    this.showChildView('add', this.addModal);
    this.showChildView('items', new Dashboard.views.product.LabelsCollection({collection: this.collection}));
  },

  showAddModal: function() {
    this.addModal.toggle();
  },

  showCreateModal: function() {
    this.createModal.toggle();
  }
});

Dashboard.views.product.LabelsCollectionItem = Marionette.View.extend({
  template: "#js-product-label-item",
  tagName: "button",
  className: "list-group-item",

  behaviors: [Dashboard.behaviors.Destroy],

  itemRemoved: function() {
    $(document).trigger("document-alert", {message: "Вы удалили лейбл", type: "alert-success"})
  },
});

Dashboard.views.product.LabelsCollection = Marionette.CollectionView.extend({
  childView: Dashboard.views.product.LabelsCollectionItem,
  className: "list-group"
});
