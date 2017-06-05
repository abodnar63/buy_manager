Dashboard.views.LabelShow = Marionette.View.extend({
  template: "#js-label-show",
  className: "container--small",

  modelEvents: {
    "change" : "render"
  },

  regions: {
    "update": "#js-update-region"
  },

  onRender: function() {
    this.showChildView('update', new Dashboard.views.LabelUpdate({model: this.model}));
  }
});
