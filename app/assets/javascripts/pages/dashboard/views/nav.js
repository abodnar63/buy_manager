Dashboard.views.Navigation = Marionette.View.extend({
  template: "#js-dashboard-nav",

  ui: {
    item: "li.js-nav-item"
  },

  onRender: function() {
    var routerChannel = Backbone.Radio.channel('router');
    this.listenTo(routerChannel, "onRoute", this.setActiveItem);
  },

  setActiveItem: function(name, path, args) {
    this.ui.item.removeClass('active');
    this.ui.item.filter("[data-name='" + name + "']").addClass('active');
  }
});
