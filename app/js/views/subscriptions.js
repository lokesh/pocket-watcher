define([
  'marionette',
  'views/videos'
], function (
  Marionette,
  VideosView
) {
  
  return Marionette.Layout.extend({
    template: '#subscriptions',
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
