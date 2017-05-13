$(function() {

  var AlertsLayout = Marionette.View.extend({
    template: "#js-alerts-layout",

    el: "#js-alerts",

    initialize: function() {
      $(document).on("document-alert", $.proxy(this.appendAlert, this));
    },

    appendAlert: function(event, data) {
      var alert = new AlertView({model: new Backbone.Model(data)});
      alert.render();
      this.$el.append(alert.$el);
    },

    onDestroy: function() {
      $(document).off("document-alert");
    }
  });

  var AlertView = Marionette.View.extend({
    template: "#js-alert-template",

    ui: {
      alert: ".js-alert"
    },

    onRender: function() {
      var self = this;
      this.ui.alert.on("closed.bs.alert", function() {
        self.remove();
      });

      setTimeout(function() {
        self.ui.alert.alert("close");
      }, 3000);
    },

    onDestroy: function() {
      this.ui.alert.off();
    }
  });

  new AlertsLayout();
});
