var mdns = require('mdns');
var express = require('express');
var app = express();

var browser = mdns.createBrowser(mdns.tcp('airplay'));
browser.on('serviceUp', function(service) {
  console.log("service up: ", service);
});
browser.on('serviceDown', function(service) {
  console.log("service down: ", service);
});
browser.start();
