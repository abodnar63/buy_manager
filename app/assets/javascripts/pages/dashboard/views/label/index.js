Dashboard.views.LabelsIndex = Marionette.View.extend({
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
    this.createModal = new Dashboard.views.CreateLabel({collection: this.collection});
    this.showChildView('create', this.createModal);
    this.showChildView('items', new Dashboard.views.LabelsCollection({collection: this.collection}));
  },

  showCreateModal: function() {
    this.createModal.toggle();
  }
});

Dashboard.views.LabelsCollectionItem = Marionette.View.extend({
  template: "#js-label-item",
  tagName: "button",
  className: "list-group-item",

  behaviors: [Dashboard.behaviors.Destroy],

  itemRemoved: function() {
    $(document).trigger("document-alert", {message: "Вы удалили лейбл", type: "alert-success"})
  },
});

Dashboard.views.LabelsCollection = Marionette.CollectionView.extend({
  childView: Dashboard.views.LabelsCollectionItem,
  className: "list-group"
});
