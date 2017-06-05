Dashboard.views.product.LabelsIndex = Marionette.View.extend({
  template: "#js-label-index",

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
    this.createModal = new Dashboard.views.product.CreateLabel({collection: this.collection});
    this.showChildView('create', this.createModal);
    this.showChildView('items', new Dashboard.views.product.LabelsCollection({collection: this.collection}));
  },

  showCreateModal: function() {
    this.createModal.toggle();
  }
});

Dashboard.views.product.LabelsCollectionItem = Marionette.View.extend({
  template: "#js-label-item",
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
