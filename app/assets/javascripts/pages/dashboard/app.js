// global object for namespacing
var Dashboard = {
  views: {
    product: {}
  },
  models: {},
  collections: {},
  behaviors: {}
}

$(function() {

  Dashboard.App = Marionette.Application.extend({
    region: "#js-dashboard",

    onStart: function() {
      Dashboard.views.dashboard = new Dashboard.views.DashboardView();
      this.showView(Dashboard.views.dashboard);

      Dashboard.router = new Dashboard.Router();
      Backbone.history.start({
        root: "/dashboard/"
      });
    }
  });

  Dashboard.app = new Dashboard.App();
  Dashboard.app.start();
});
