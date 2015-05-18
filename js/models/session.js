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

    initialize: function() {
      this.loadGoogleClient();
    },

    loadGoogleClient: function() {
      // require(['https://apis.google.com/js/client.js?onload=define'], function() {
      //   // Poll until gapi is ready
      //   function checkGAPI() {
      //     if (gapi && gapi.client) {
      //       self.init();
      //     } else {
      //       setTimeout(checkGAPI, 100);
      //     }
      //   }
        
      //   checkGAPI();
      // });
    },

    isAuthenticated: function() {
      return Boolean(this.get('accessToken'));
    },

    save: function(authHash) {
      // $.cookie('userId', authHash.id);
      // $.cookie('accessToken', authHash.accessToken);
    },

    load: function() {
      // console.log('load');
      // this.userId = $.cookie('userId');
      // this.accessToken = $.cookie('accessToken');
    }
  });

  return new Session();

});
