export default Ember.ArrayController.extend({
  sortProperties: ['rating'],
  sortAscending: false,

  actions: {
    deleteResume: function(resume) {
      resume.destroyRecord();
    }
  }
});
