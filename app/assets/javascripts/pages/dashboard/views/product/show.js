Dashboard.views.ProductShow = Marionette.View.extend({
  template: "#js-product-show",
  className: "container--small",

  modelEvents: {
    "change" : "render"
  },

  regions: {
    "update": "#js-update-region"
  },

  onRender: function() {
    this.showChildView('update', new Dashboard.views.ProductUpdate({model: this.model}));
  }
});
