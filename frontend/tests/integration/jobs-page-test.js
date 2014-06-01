/* global require */

var authenticate = require('resumer/tests/helpers/authenticate')['default'];

import startApp from 'resumer/tests/helpers/start-app';

var App, server;

module('Integration - Jobs Page', {
  setup: function() {
    App = startApp();

    var jobs = [
      { id: 1, name: "First testing job" },
      { id: 2, name: "Second testing job" },
      { id: 3, name: "Best job ever" },
      { id: 4, name: "Wassup?" }
    ];

    server = new Pretender(function() {
      this.get('/api/jobs', function(request) {
        return [200, {"Content-Type": "application/json"}, JSON.stringify({jobs: jobs})];
      });

      this.post('/users/sign_in', function(request) {
        return [200, {"Content-Type": "application/json"}, JSON.stringify({user_token:"Tp7nVz6exkTMkWz1DEYk",user_email:"foo@bar.com"})];
      });
    });
  },

  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('Should show the Job name after loging in', function() {
  authenticate();
  visit('/job/1');

  andThen(function() {
    equal(find("h2:contains('First testing job')").length, 1);
  });
});
