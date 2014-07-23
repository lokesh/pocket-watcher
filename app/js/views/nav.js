define([
  'marionette',
  'modules/vent'
], function (
  Marionette,
  vent
) {
  
  return Marionette.LayoutView.extend({
    template: '#nav',
    events: {
      'click .nav-link': 'onNavLinkClick',
      'touchstart .nav-link': 'onNavLinkClick'
    },

    onNavLinkClick: function(event) {
      event.preventDefault();
      var $target = $(event.target);

      if ($target.hasClass('off')) {
        this.$el.find('.nav-link')
          .removeClass('on')
          .addClass('off');
        $target
          .removeClass('off')
          .addClass('on');

        switch ($target.data('name')) {
          case 'search':
            vent.trigger('search:show');
            break;
          case 'subscriptions':
            vent.trigger('subscriptions:show');
            break;
          case 'watch-later':
            vent.trigger('watch-later:show');
            break;
        }
      }
      
    },
  });

});
