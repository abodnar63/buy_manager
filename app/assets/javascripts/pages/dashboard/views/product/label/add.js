Dashboard.views.product.AddLabels = Marionette.View.extend({
  template: "#js-product-add-labels",
  className: "gap--small",

  ui: {
    createModal: "#js-add-label-modal",
    save: "#js-save"
  },

  events: {
    "click @ui.save" : "saveLabels"
  },

  regions: {
    items: "#js-add-items-region"
  },

  initialize: function() {
    this.otherLabelsCollection = new Dashboard.collections.Labels(null, "product/" + this.model.id + "/other_labels");
  },

  toggle: function() {
    this.otherLabelsCollection.fetch();
    this.ui.createModal.modal("toggle");
    this.showChildView('items', new Dashboard.views.product.AddLabelsCollection({collection: this.otherLabelsCollection}));
  },

  saveLabels: function() {
    var selectedLabels = this.getSelectedLabels();
    var self = this;

    if (selectedLabels.length == 0) {
      return;
    }
    var selectedData = _.map(selectedLabels, function(label) {
      return label.id;
    });

    $.ajax({
      url: "/product/" + this.model.id + "/add_labels",
      method: "post",
      data: {labels: JSON.stringify(selectedData)},
      success: function() {
        self.collection.add(selectedLabels);
        self.success();
      }
    });
  },

  getSelectedLabels: function() {
    return this.otherLabelsCollection.filter(function(label) {
      return label.get("selected");
    }, []);
  },

  success: function() {
    this.toggle();
    $(document).trigger("document-alert", {message: "Вы добавили лейблы", type: "alert-success"})
  }
});

Dashboard.views.product.AddLabelsCollectionItem = Marionette.View.extend({
  template: "#js-product-add-labels-item",
  tagName: "button",
  className: "list-group-item",

  ui: {
    checkbox: ".js-checkbox"
  },

  events: {
    "change @ui.checkbox" : "itemSelected"
  },

  itemSelected: function(event) {
    this.model.set("selected", $(event.target).is(':checked'));
  }
});

Dashboard.views.product.AddLabelsCollection = Marionette.CollectionView.extend({
  childView: Dashboard.views.product.AddLabelsCollectionItem,
  className: "list-group"
});
