define([
  'marionette',
  'views/nav',
  'views/videos'
], function (
  Marionette,
  NavView,
  VideosView
  ) {
  
  return Marionette.Layout.extend({
    template: '#watch-later',
    regions: {
      content: '.content',
      nav: '.nav'
    },

    onRender: function() {
      var navView    = new NavView();
      var videosView = new VideosView({
        collection: this.collection
      });

      this.content.show(videosView);
      this.nav.show(navView);
    }

  });

});
