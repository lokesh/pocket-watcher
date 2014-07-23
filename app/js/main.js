require.config({
  paths: {
    // 'text' : '../bower_components/requirejs-text/text',
    'jquery': '../bower_components/jquery/dist/jquery',
    'underscore': '../bower_components/underscore/underscore',
    'backbone': '../bower_components/backbone/backbone',
    'marionette' : '../bower_components/marionette/lib/backbone.marionette'
    // 'localstorage' : '../bower_components/backbone.localStorage/backbone.localStorage'
  }
});

require([
  'app',
  'backbone',
], function(
  app,
  Backbone
) {

  app.start();

  Backbone.history.start({
    pushState: false
  });

});
