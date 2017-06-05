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

  labels: function() {
    this.showContent(new Dashboard.views.LabelsIndex({collection: Dashboard.collections.labels}));
  },

  label: function(id) {
    var self = this;

    if (Dashboard.collections.labels.isFetched) {
      this.renderLabel(id);
    } else {
      Dashboard.collections.labels.once("fetched", function() {
        self.renderLabel(id);
      })
    }
  },

  renderLabel: function(id) {
    var model = Dashboard.collections.labels.get(id);
    if (!model) {
      this.renderError();
      return
    }
    this.showContent(new Dashboard.views.LabelShow({model: model}));
  },

  showContent: function(view) {
    this.contentRegion().show(view)
  },

  contentRegion: function() {
    return region = Dashboard.views.dashboard.getRegion("content");
  },

  renderError() {
    this.contentRegion().empty();
    console.log("Error: item doesn't exist");
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
    "labels":     "labels",
    "label/:id": "label"
  },

  initialize: function() {
    this.channel = Backbone.Radio.channel('router');

    Dashboard.collections.labels = new Dashboard.collections.Labels();
    Dashboard.collections.labels.fetch({
      success: function(collection){
        Dashboard.collections.labels.isFetched = true;
        Dashboard.collections.labels.trigger('fetched');
      }
    });
  },

  onRoute: function(name, path, args) {
    this.channel.trigger('onRoute', name, path, args);
  }
});
