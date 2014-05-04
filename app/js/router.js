define([
  'marionette'
], function (
  Marionette
) {

  return Marionette.AppRouter.extend({
   
    // Methods for handling routing are in controller.js
    appRoutes: {
      'tape/new': 'showNewTapeForm',
      'tape/:tape': 'showTape',
      'trending/show': 'showTrending',
      'faves': 'showFavorites',
      'your-tapes': 'showUserTapes',
      '*action': 'showTrending'
    }
  });
    
});