define([
  'marionette',
  'controller',
  'router',
  'modules/vent',
  'views/nav'
], function (
  Marionette,
  Controller,
  Router,
  vent,
  NavView
) {
 
  var app = new Marionette.Application();

  app.addRegions({
    content: '.app-content',
    nav: '.app-nav'
  });

  var controller = new Controller({
    contentRegion: app.content,
    navRegion: app.nav
  });

  var router = new Router({
    controller: controller
  });

  var navView = new NavView();
  app.nav.show(navView);

  vent.on('search:show', function() {
    controller.showSearch();
    router.navigate('search');
  });
  
  vent.on('subscriptions:show', function() {
    controller.showSubscriptions();
    router.navigate('subs');
  });

  vent.on('watch-later:show', function() {
    controller.showWatchLater();
    router.navigate('later');
  });

  vent.on('video:show', function(video) {
    // appController.showVideo(video);
    // appRouter.navigate('video/' + tape.get('video'));
  });

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
