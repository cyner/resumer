export default Ember.ObjectController.extend({
  needs: "login",

  actions: {
    register: function() {
      var model = this.get("model"),
          self = this,
          credentials = model.getProperties('email', 'password', 'password_confirmation');

      $.post("/api/registrations", { user: credentials }).then(function() {
        self.get('controllers.login').set('identification', model.get('email'));
        self.transitionToRoute('login');
        model.set('errors', null);

      }, function(xhr) {
        var response = JSON.parse(xhr.responseText);
        model.set('errors', response.errors);
      });
    }
  }
});
