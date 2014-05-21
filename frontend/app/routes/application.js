export default Ember.Route.extend(Ember.SimpleAuth.ApplicationRouteMixin, {
  actions: {
    sessionAuthenticationFailed: function(error) {
      this.controllerFor('login').set('loginErrorMessage', error.error);
    }
  }
});
