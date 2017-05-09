Dashboard.RouterController = Marionette.Object.extend({
  lists: function() {
    this.contentRegion().show(new Dashboard.views.ListIndex());
    console.log("render lists view");
  },

  list: function(id) {
    this.contentRegion().empty();
    console.log("render list view #" + id);
  },

  stats: function() {
    this.contentRegion().empty();
    console.log("render stats");
  },

  products: function() {
    this.contentRegion().empty();
    console.log("render products");
  },

  contentRegion: function() {
    return region = Dashboard.views.dashboard.getRegion("content");
  }

});

Dashboard.Router = Marionette.AppRouter.extend({
  controller : new Dashboard.RouterController(),
  appRoutes: {
    "":          "lists",
    "lists":     "lists",
    "list/:id":  "list",
    "stats":     "stats",
    "products":  "products"
  },

  initialize: function() {
    this.channel = Backbone.Radio.channel('router');
  },

  onRoute: function(name, path, args) {
    this.channel.trigger('onRoute', name, path, args);
  }
});
