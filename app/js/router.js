define([
  'marionette'
], function (
  Marionette
) {

  return Marionette.AppRouter.extend({
   
    // Methods for handling routing are in controller.js
    appRoutes: {
      'search': 'showSearch',
      'subs': 'showSubscriptions',
      'later': 'showWatchLater',
      'video?v=:video': 'showVideo',
      '*action': 'showWatchLater'
    }
  });
    
});