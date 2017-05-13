Dashboard.views.ListShow = Marionette.View.extend({
  template: "#js-list-show",
  className: "container--small",

  modelEvents: {
    "change" : "render"
  },

  regions: {
    "update": "#js-update-region"
  },

  onRender: function() {
    this.showChildView('update', new Dashboard.views.ListUpdate({model: this.model}));
  }
});
