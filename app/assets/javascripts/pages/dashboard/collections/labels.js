Dashboard.collections.Labels = Backbone.Collection.extend({
  model: Dashboard.models.Label,

  initialize: function(product_id) {
    this.url = "products/" + product_id + "/labels"
  }
});
