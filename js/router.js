var Router = Backbone.Router.extend({
  routes : {
    "foo" : "foo",
    "bar" : "bar"
  },
  foo : function() {
    React.renderComponent(
      FooComponent(null ),
      document.body
    );
  },
  bar : function() {
    React.renderComponent(
      BarComponent(null ),
      document.body
    );
  }
});
 
app.router = new Router();

Backbone.history.start();