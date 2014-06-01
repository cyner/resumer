export default Ember.Test.registerAsyncHelper('authenticate',
  function(app, name, context) {
    visit('/');
    fillIn('input#identification', 'foo@bar.com');
    fillIn('input#password', 'password');
    click('button[type="submit"]');
  }
);
