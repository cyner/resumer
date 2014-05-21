export default Ember.ArrayController.extend({
  sortProperties: ['name'],

  actions: {
    deleteJob: function(job) {
      job.destroyRecord();
    }
  }
});
