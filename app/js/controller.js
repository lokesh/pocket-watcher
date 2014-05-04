define([
  'marionette',
  'entities/playlist',
  'views/watch_later'
], function (
  Marionette,
  Playlist,
  WatchLaterView
) {
 
  return Marionette.Controller.extend({

    initialize: function(options) {
      // this.header  = options.headerRegion;
      this.content = options.contentRegion;
      // this.nav     = options.navRegion;
    },

    showSearch: function() {
      // var trendingTapes = new TrendingTapes();
      // var homeView      = new HomeView({
      //   collection: trendingTapes
      // });

      // this.content.show(homeView);
      // trendingTapes.fetch();
    },
  
    showSubscriptions: function() {
      // var userTapes = new UserTapes();
      // var homeView  = new HomeView({
      //   collection: userTapes
      // });
      
      // this.content.show(homeView);
      // userTapes.fetch();
    },


    showVideo: function(video) {
      // var tapeView = new TapeView({
      //   model: tape
      // });

      // this.content.show(tapeView);
      
      // $(window).scrollTop(0);
    },

    showWatchLater: function() {
      var playlist       = new Playlist();
      var watchLaterView = new WatchLaterView({
        collection: playlist
      });
      
      this.content.show(watchLaterView);
      playlist.fetch();
    },

    showNewTapeForm: function () {
      // var tapeNewView = new TapeNewView();
      // this.content.show(tapeNewView);
    },

    isUserLoggedIn: function() {
      // if(!userSession.authenticated()){
      //   App.Router.navigate('login', {trigger: true});
      // }

      return true;
    }

  });

});
