define([
  'backbone',
  'models/video'
], function (
  Backbone,
  Video
) {
  
  return Backbone.Collection.extend({
    model: Video,
    url: "https://localhost:8000/data/watch_later.json",

    parse: function(response) {
      return response[0].result.items;
    }
  });
  
});
