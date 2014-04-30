app.models.video = Backbone.Model.extend({
  defaults: {
    description: null,
    position: null,
    publishedAt: null,
    thumbnail: null,
    title: null,
    videoId: null
  }
});

app.models.playlist = Backbone.Collection.extend({
  model: app.models.video
});