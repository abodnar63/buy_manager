// global object for namespacing
var Dashboard = {
  views: {},
  models: {},
  collections: {}
}

$(function() {

  Dashboard.App = Marionette.Application.extend({
    region: "#js-dashboard",

    onStart: function() {
      this.showView(new Dashboard.views.DashboardView());

      Dashboard.router = new Dashboard.Router();

      Backbone.history.start({
        root: "/dashboard/"
      });
    }
  });

  Dashboard.app = new Dashboard.App().start();
});
