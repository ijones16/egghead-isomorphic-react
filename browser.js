var React = require('react');
var Component = React.createFactory(require('./Component'));

window.renderApp = function(msg){
  React.render(Component({msg:msg}), document.getElementById('root'));
}
