define([
  'marionette'
], function (
  Marionette
) {
  
  return Marionette.Layout.extend({
    template: '#search',
    regions: {
      content: '.content'
    },
    ui: {
      searchInput: '.search-input' 
    },

    onRender: function() {
      // console.log(this.ui.searchInput);
    }

  });

});
