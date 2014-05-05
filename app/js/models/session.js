// Session model is a singleton.
define([
  'jquery',
  'backbone'
  // 'cookie'
],
function(
  $,
  Backbone
){

  var Session = Backbone.Model.extend({
    defaults: {
        'accessToken': null,
        'userId': null
    },

    initialize: function(){
      this.load();
    },

    authenticated: function(){
      return Boolean(this.get('accessToken'));
    },

    save: function(authHash){
      // $.cookie('userId', authHash.id);
      // $.cookie('accessToken', authHash.accessToken);
    },

    load: function(){
      // console.log('load');
      // this.userId = $.cookie('userId');
      // this.accessToken = $.cookie('accessToken');
    }
  });

  return new Session();

});
