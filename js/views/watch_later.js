define([
  'marionette',
  'views/videos',
  'models/session'
], function (
  Marionette,
  VideosView,
  session
  ) {
  
  return Marionette.LayoutView.extend({
    regions: {
      content: '.content',
    },

    getTemplate: function() {
      if (!session.isAuthenticated()){
        return "#watch-later";
      } else {
        return "#watch-later-logged-out";
      }
    },

    onRender: function() {
      if (!session.isAuthenticated()){
        var videosView = new VideosView({
          collection: this.collection
        });
        this.content.show(videosView);
      }
    }

  });

});
