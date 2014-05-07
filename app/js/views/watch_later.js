define([
  'marionette',
  'views/videos',
  'models/session'
], function (
  Marionette,
  VideosView,
  session
  ) {
  
  return Marionette.Layout.extend({
    template: '#watch-later',
    regions: {
      content: '.content',
    },

    onRender: function() {
      // session.set('email', 'new email');
      // 
      var videosView = new VideosView({
        collection: this.collection
      });

      this.content.show(videosView);
    }

  });

});
