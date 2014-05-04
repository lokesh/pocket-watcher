define([
  'marionette'
], function (
  Marionette
) {

  return Marionette.AppRouter.extend({
   
    // Methods for handling routing are in controller.js
    appRoutes: {
      'search': 'showSearch',
      'subscriptions': 'showSubscriptions',
      'video/:video': 'showVideo',
      'watch-later': 'showWatchLater',
      '*action': 'showWatchLater'
    }
  });
    
});