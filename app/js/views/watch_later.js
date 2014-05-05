define([
  'marionette',
  'views/nav',
  'views/videos',
  'models/session'
], function (
  Marionette,
  NavView,
  VideosView,
  session
  ) {
  
  return Marionette.Layout.extend({
    template: '#watch-later',
    regions: {
      content: '.content',
      nav: '.nav'
    },

    onRender: function() {
      // session.set('email', 'new email');
      // 
      var navView    = new NavView();
      var videosView = new VideosView({
        collection: this.collection
      });

      this.content.show(videosView);
      this.nav.show(navView);
    }

  });

});
