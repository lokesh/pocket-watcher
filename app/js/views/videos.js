define([
  'marionette',
  'views/video'
], function (
  Marionette,
  VideoView
) {
  
  return Backbone.Marionette.CollectionView.extend({
     itemView: VideoView
  });

});
