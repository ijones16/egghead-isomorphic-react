var express = require('express');
var React = require('react');
var fs = require('fs');
var ReactDOMServer = require('react-dom/server');
var Component = React.createFactory(require('./Component'));

var BUNDLE = fs.readFileSync('./bundle.js', {encoding: 'utf8'});
var TEMPLATE = fs.readFileSync('./index.html', {encoding: 'utf8'});

var app = express();

function home(req, res){
  var msg = req.params.msg || 'Hello';
  var comp = Component({msg:msg});
  // React.renderToStaticMarkup is deprecated. 
  // Please use ReactDOMServer.renderToStaticMarkup from require('react-dom/server') instead.
  var page = TEMPLATE.replace('@@@', ReactDOMServer.renderToStaticMarkup(comp))
  page = page.replace('###', '<script>renderApp("'+msg+'")</script>')
  res.send(page);
}

app.get('', home);
app.get('/bundle.js', function(req, res){
  res.send(BUNDLE)
})
app.get('/:msg', home);

app.listen(4000);
