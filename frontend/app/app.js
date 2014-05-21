import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: 'resumer', // TODO: loaded via config
  Resolver: Resolver
});

loadInitializers(App, 'resumer');

export default App;
