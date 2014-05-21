export default Ember.ObjectController.extend({
  actions: {
    save: function() {
      var job = this.get("model"), self = this;

      job.validate().then(function() {
        if (job.get("isValid")) {
          job.save().then(function() {
            self.transitionToRoute("job.show", self);
          });
        }
      });
    }
  }
});
