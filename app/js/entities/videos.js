define([
  'underscore',
  'backbone',
  'entities/video'
], function (
  _,
  Backbone,
  Video
) {
  
  return Backbone.Collection.extend({
    model: Video,
    // url: "https://localhost:8000/data/later.json",

    // parse: function(response) {
    //   return response[0].result.items;
    // }
  });
  
});
