var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');

/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  name: require('./package.json').name,

  minifyCSS: {
    enabled: true,
    options: {}
  },

  getEnvJSON: require('./config/environment')
});

// Use this to add additional libraries to the generated output files.
app.import('vendor/ember-data/ember-data.js');

// If the library that you are including contains AMD or ES6 modules that
// you would like to import into your application please specify an
// object with the list of modules as keys along with the exports of each
// module as its value.
app.import('vendor/ic-ajax/dist/named-amd/main.js', {
  'ic-ajax': [
    'default',
    'defineFixture',
    'lookupFixture',
    'raw',
    'request',
  ]
});

app.import({development:'vendor/route-recognizer/dist/route-recognizer.js'});
app.import({development:'vendor/FakeXMLHttpRequest/fake_xml_http_request.js'});
app.import({development:'vendor/pretender/pretender.js'});

app.import('vendor/ember-validations/ember-validations.js');

app.import('vendor/ember-simple-auth/ember-simple-auth-0.4.0.js');
app.import('vendor/ember-simple-auth/ember-simple-auth-devise-0.4.0.js');

app.import('vendor/markdown/lib/markdown.js');

// Import fontawesome fonts
var fontawesome = pickFiles('vendor/fontawesome/fonts', {
    srcDir: '/',
    files: [
        'fontawesome-webfont.ttf',
        'fontawesome-webfont.woff',
        'fontawesome-webfont.eot',
        'FontAwesome.otf',
        'fontawesome-webfont.svg'
    ],
    destDir: 'fonts'
});

module.exports = mergeTrees([
    app.toTree(),
    fontawesome
]);
