/**
 * @jsx React.DOM
 */

var FooComponent = React.createClass({displayName: 'FooComponent',
  render : function() {
    return React.DOM.div(null, "foo");
  }
});
 
var BarComponent = React.createClass({displayName: 'BarComponent',
  render : function() {
    return React.DOM.div(null, "bar");
  }
});
 