Dashboard.RouterController = Marionette.Object.extend({
  lists: function() {
    var collection = new Dashboard.collections.Lists();
    collection.fetch();
    this.showContent(new Dashboard.views.ListIndex({collection: collection}));
  },

  list: function(id) {
    var model = new Dashboard.models.List({id: id, name: "Loading..."});
    model.fetch();
    this.showContent(new Dashboard.views.ListShow({model: model}));
  },

  stats: function() {
    this.contentRegion().empty();
    console.log("render stats");
  },

  products: function() {
    var collection = new Dashboard.collections.Products();
    collection.fetch();
    this.showContent(new Dashboard.views.ProductIndex({collection: collection}));
  },

  product: function(id) {
    var model = new Dashboard.models.Product({id: id, name: "Loading..."});
    model.fetch();
    this.showContent(new Dashboard.views.ProductShow({model: model}));
  },

  showContent: function(view) {
    this.contentRegion().show(view)
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
    "products":  "products",
    "product/:id":  "product",
  },

  initialize: function() {
    this.channel = Backbone.Radio.channel('router');
  },

  onRoute: function(name, path, args) {
    this.channel.trigger('onRoute', name, path, args);
  }
});
