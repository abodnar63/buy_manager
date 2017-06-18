Dashboard.collections.Labels = Backbone.Collection.extend({
  model: Dashboard.models.Label,

  initialize: function(product_id, url) {
    if (url) {
      this.url = url;
      return;
    }
    
    if (product_id) {
      this.url = "product/" + product_id + "/labels"
    } else {
      this.url = "/labels";
    }
  }
});
