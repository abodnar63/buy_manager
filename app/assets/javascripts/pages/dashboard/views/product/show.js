Dashboard.views.ProductShow = Marionette.View.extend({
  template: "#js-product-show",
  className: "container--small",

  modelEvents: {
    "change" : "render"
  },

  regions: {
    "update": "#js-update-region",
    "labels": "#js-labels-region"
  },

  onRender: function() {
    this.showChildView('update', new Dashboard.views.ProductUpdate({model: this.model}));
    if (!this.labels) {
      this.labels = new Dashboard.collections.Labels(this.model.id);
      this.labels.fetch();
    }

    this.showChildView('labels', new Dashboard.views.product.LabelsIndex({collection: this.labels, model: this.model}));
  }
});
