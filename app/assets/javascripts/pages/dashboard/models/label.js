Dashboard.models.Label = Backbone.Model.extend({
  urlRoot: "/labels",
  
  initialize: function() {
    if (this.collection) {
      this.urlRoot = null;
    }
  }
})
