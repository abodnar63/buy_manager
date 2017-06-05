Dashboard.collections.Labels = Backbone.Collection.extend({
  model: Dashboard.models.Label,

  initialize: function(product_id) {
    if (product_id) {
      this.url = "product/" + product_id + "/labels"
    } else {
      this.url = "/labels";
    }

  }
});
