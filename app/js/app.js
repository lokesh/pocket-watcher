define([
  'marionette',
  'controller',
  'router',
  'modules/vent'
], function (
  Marionette,
  Controller,
  Router,
  vent
) {
 
  var app = new Marionette.Application();

  app.addRegions({
    // header: '.app-header',
    content: '.app-content'
    // nav: '.app-nav'
  });

  var controller = new Controller({
    // headerRegion: app.header,
    contentRegion: app.content
    // navRegion: app.nav
  });

  var router = new Router({
    controller: controller
  });

  // vent.on('trending:show', function() {
  //   appController.showTrending();
  //   appRouter.navigate('trending/show');
  // });
  
  // vent.on('user-tapes:show', function() {
  //   appRouter.navigate('your-tapes');
  //   appController.showUserTapes();
  // });

  // vent.on('favorites:show', function() {
  //   appController.showFavorites();
  //   appRouter.navigate('faves');
  // });

  // vent.on('tape:show', function(tape) {
  //   appController.showTape(tape);
  //   appRouter.navigate('tape/' + tape.get('name'));
  // });

  // vent.on('tape:new', function() {
  //   appController.showNewTapeForm();
  //   appRouter.navigate('tape/new');
  // });

  // Debugging
  vent.on('all', function (event, model) {
    console.log('EVENT: ' + event);
    if (model) {
        // console.dir(model);
    }
  });

  return app;

});
