var Job = DS.Model.extend(Ember.Validations.Mixin, {
  name: DS.attr('string'),
  resumes: DS.hasMany('resume'),

  isNameValid: function() {
    return Ember.isEmpty(this.get("errors.name"));
  }.property('errors.name')
});

Job.reopen({
  validations: {
    name: {
      presence: true
    }
  }
});

export default Job;
