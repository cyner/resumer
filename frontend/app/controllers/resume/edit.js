export default Ember.ObjectController.extend({
  actions: {
    save: function() {
      var resume = this.get("model"), self = this;

      resume.validate().then(function() {
        if (resume.get("isValid")) {
          resume.save().then(function() {
            self.transitionToRoute("resume.show", resume);
          });
        }
      });
    }
  }
});
