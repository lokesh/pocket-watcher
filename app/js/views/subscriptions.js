define([
  'marionette',
  'views/nav',
  'views/videos'
], function (
  Marionette,
  NavView,
  VideosView
  ) {
  
  return Marionette.Layout.extend({
    template: '#subscriptions',
    regions: {
      content: '.content',
      nav: '.nav'
    },

    onRender: function() {
      var navView    = new NavView();
      this.nav.show(navView);
    }

  });

});
