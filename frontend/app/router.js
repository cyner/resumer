var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
  this.route('login');
  this.route('registration');

  this.resource('jobs', function() {
    this.route('new');
  });

  this.resource('job', { path: '/job/:job_id' }, function() {
    this.route('show');
    this.route('edit');

    this.resource('resume', { path: '/resume/:resume_id' }, function() {
      this.route('show');
      this.route('edit');
    });
  });
});

export default Router;
