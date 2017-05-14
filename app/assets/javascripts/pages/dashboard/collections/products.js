Dashboard.collections.Products = Backbone.Collection.extend({
  model: Dashboard.models.Product,

  url: function() {
    return "/products";
  }
});
