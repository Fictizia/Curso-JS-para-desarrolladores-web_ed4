/*global requirejs*/
requirejs.config({
  paths: {
    templates: 'app/templates',
    models: 'app/models',
    views: 'app/views',
    collections: 'app/collections',
    text: 'vendor/text',
    jquery: 'vendor/jquery.min',
    underscore: 'vendor/underscore.min',
    firebase: 'vendor/firebase.min',
    backbone: 'vendor/backbone.min',
    backfire: 'vendor/backbone-firebase.min',
  },
  shim: {
        'firebase': {
            exports: 'Firebase'
        },

        'underscore': {
            exports: '_'
        },

        'backbone': {
            deps: [ 'underscore', 'jquery' ],
            exports: 'Backbone'
        },

        'backfire': {
            deps: [ 'backbone', 'firebase', 'underscore' ]
        }
    }
});

require(['text', 'views/AppView']);