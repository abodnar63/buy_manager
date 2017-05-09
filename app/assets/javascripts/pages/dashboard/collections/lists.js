Dashboard.collections.Lists = Backbone.Collection.extend({
  model: Dashboard.models.List,

  url: function() {
    return "/lists";
  }
});
