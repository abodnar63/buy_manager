Dashboard.behaviors.Create = Marionette.Behavior.extend({
  ui: {
    create: "#js-create",
    name: "#js-name"
  },

  events: {
    "click @ui.create" : "create"
  },

  generateData: function() {
    var data = {};
    var self = this;
    _.each(this.$("input[name], select[name], textarea[name]"), function(input) {
      var $input = $(input);
      var name = $input.attr("name");
      var value = $input.val();
      data[name] = value;
    }, this);

    return data;
  },

  create: function() {
    var self = this;
    this.view.collection.create(
      this.generateData(),
      {
        wait: true,
        success: function() {
          self.view.success();
        },
        error: function() {
          self.view.toggle();
          $(document).trigger("document-alert", {message: "Ошибка", type: "alert-danger"})
        }
      }
    );
  }
});
