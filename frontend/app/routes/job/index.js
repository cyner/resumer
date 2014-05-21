export default Ember.Route.extend({
  redirect: function() {
    this.transitionTo('job.show');
  }
});
