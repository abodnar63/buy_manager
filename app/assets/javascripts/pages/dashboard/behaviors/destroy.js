Dashboard.behaviors.Destroy = Marionette.Behavior.extend({
  ui: {
    removeBtn: ".js-remove"
  },

  events: {
    "click @ui.removeBtn" : "removeItem"
  },

  removeItem: function() {
    var self = this;
    var r = confirm("Элемент будет удален");
    if (r == true) {
      this.view.model.destroy({
        wait: true,
        success: function() {
          self.view.itemRemoved();
        }
      });
    }
  },
});
