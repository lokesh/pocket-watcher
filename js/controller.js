define([
  'marionette',
  'models/playlist',
  'views/search',
  'views/subscriptions',  
  'views/watch_later'
], function (
  Marionette,
  Playlist,
  SearchView,
  SubscriptionsView,
  WatchLaterView
) {
 
  return Marionette.Controller.extend({

    initialize: function(options) {
      this.content = options.contentRegion;
      this.nav     = options.navRegion;
    },

    showSearch: function(query) {
      var searchView = new SearchView({
        query: query
      });
      
      this.content.show(searchView);
    },
  
    showSubscriptions: function() {
      var playlist       = new Playlist();
      var subscriptionsView = new SubscriptionsView({
        collection: playlist
      });
      
      this.content.show(subscriptionsView);
      playlist.fetch();
    },

    showWatchLater: function() {
      var playlist       = new Playlist();
      var watchLaterView = new WatchLaterView({
        collection: playlist
      });
      
      this.content.show(watchLaterView);
      playlist.fetch();
    },

    showVideo: function(video) {
      // var tapeView = new TapeView({
      //   model: tape
      // });

      // this.content.show(tapeView);
      
      // $(window).scrollTop(0);
    },

    isUserLoggedIn: function() {
      // if(!userSession.authenticated()){
      //   App.Router.navigate('login', {trigger: true});
      // }

      return true;
    }

  });

});
