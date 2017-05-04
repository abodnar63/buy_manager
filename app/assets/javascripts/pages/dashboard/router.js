Dashboard.RouterController = Marionette.Object.extend({
  lists: function() {
    console.log("render lists view");
  },

  list: function(id) {
    console.log("render list view #" + id);
  },

  stats: function() {
    console.log("render stats");
  },

  products: function() {
    console.log("render products");
  }

});

Dashboard.Router = Marionette.AppRouter.extend({
  controller : new Dashboard.RouterController(),
  appRoutes: {
    "lists":     "lists",
    "list/:id": "list",
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
