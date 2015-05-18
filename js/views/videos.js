define([
  'marionette',
  'views/video'
], function (
  Marionette,
  VideoView
) {
  
  return Marionette.CollectionView.extend({
     childView: VideoView
  });

});
