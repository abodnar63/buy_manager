Dashboard.views.DashboardView = Marionette.View.extend({
  template: "#js-dashboard-view",

  regions: {
    nav: "#js-nav-region",
    content: "#js-content-region"
  },

  onRender: function() {
    this.showChildView('nav', new Dashboard.views.Navigation());
  }
})
