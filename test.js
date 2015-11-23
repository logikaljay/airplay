var mdns = require('mdns');
var express = require('express');
var app = express();

app.get('*', function (req, res) {
	console.log('GET request!');
	console.log(req.headers);
	res.end();
});

app.put('*', function(req, res) {
	console.log('PUT request');
	console.log(req.headers);
	res.end();
});

app.post('*', function(req, res) {
	console.log('POST request');
	console.log(req.headers);
	res.end();
});

var server = app.listen(44472, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

var ad = mdns.createAdvertisement(
  mdns.tcp('raop'),
  44472,
	{
		name: '06:5e:60:e0:9e:a7@fooserv',
    txtRecord: {
			txtvers: '1',     // txt record version?
	    ch: '2',          // # channels
	    cn: '0,1',          // codec; 0=pcm, 1=alac, 2=aac, 3=aac elc; fwiw Sonos supports aac; pcm required for iPad+Spotify; OS X works with pcm
	    et: '0,1',        // encryption; 0=none, 1=rsa, 3=fairplay, 4=mfisap, 5=fairplay2.5; need rsa for os x
	    md: '0',          // metadata; 0=text, 1=artwork, 2=progress
	    pw: 'false',    // password enabled
	    sr: '44100',      // sampling rate (e.g. 44.1KHz)
	    ss: '16',         // sample size (e.g. 16 bit?)
	    tp: 'TCP,UDP',    // transport protocol
	    vs: '105.1',     // server version?
	    am: 'AirPort4,107',   // device model
	    ek: '1',          // ? from ApEx; setting to 1 enables iTunes; seems to use ALAC regardless of 'cn' setting
	    sv: 'false',    // ? from ApEx
	    da: 'true',     // ? from ApEx
	    vn: '65537',    // ? from ApEx; maybe rsa key modulus? happens to be the same value
	    fv: '76400.10', // ? from ApEx; maybe AirPort software version (7.6.4)
	    sf: '0x5'       // ? from ApEx
	  }
	},
  function () {
    console.log(arguments);
  }
).start();

var ad = mdns.createAdvertisement(
  mdns.tcp('airplay'),
  54472,
	{
	  name: 'fooserv',
	  txtRecord:
	   { deviceid: 'A4:5E:60:E0:9E:A8',
	     features: '0x4A7FFFF7,0xE',
	     flags: '0x4',
	     model: 'AppleTV3,2',
	     pk: '0418f973e15ab2b539513b9af313ef6b816d5f1121e46181ec02231b20474b5a',
	     pi: 'b11e8acd-9bd6-46e4-b954-032c9ae20ff5',
	     srcvers: '220.68',
	     vv: '2' },
	  addresses: [ '192.168.1.104' ]
	},
  function () {
    console.log(arguments);
  }
).start();
/*
service up:  { interfaceIndex: 12,
  type:
   ServiceType {
     name: 'airplay',
     protocol: 'tcp',
     subtypes: [],
     fullyQualified: true },
  replyDomain: 'local.',
  flags: 3,
  name: 'Jay’s MacBook Pro',
  networkInterface: 'vboxnet0',
  fullname: 'Jay’s\\032MacBook\\032Pro._airplay._tcp.local.',
  host: 'Jays-MacBook-Pro.local.',
  port: 52326,
  rawTxtRecord: <Buffer 1a 64 65 76 69 63 65 69 64 3d 41 34 3a 35 45 3a 36 30 3a 45 30 3a 39 45 3a 41 38 17 66 65 61 74 75 72 65 73 3d 30 78 34 41 37 46 46 46 46 37 2c 30 78 ... >,
  txtRecord:
   { deviceid: 'A4:5E:60:E0:9E:A8',
     features: '0x4A7FFFF7,0xE',
     flags: '0x4',
     model: 'AppleTV3,2',
     pk: '0418f973e15ab2b539513b9af313ef6b816d5f1121e46181ec02231b20474b5a',
     pi: 'b11e8acd-9bd6-46e4-b954-032c9ae20ff5',
     srcvers: '220.68',
     vv: '2' },
  addresses: [ '192.168.99.1' ] }
service up:  { interfaceIndex: 4,
  type:
   ServiceType {
     name: 'airplay',
     protocol: 'tcp',
     subtypes: [],
     fullyQualified: true },
  replyDomain: 'local.',
  flags: 2,
  name: 'Jay’s MacBook Pro',
  networkInterface: 'en0',
  fullname: 'Jay’s\\032MacBook\\032Pro._airplay._tcp.local.',
  host: 'Jays-MacBook-Pro.local.',
  port: 52326,
  rawTxtRecord: <Buffer 1a 64 65 76 69 63 65 69 64 3d 41 34 3a 35 45 3a 36 30 3a 45 30 3a 39 45 3a 41 38 17 66 65 61 74 75 72 65 73 3d 30 78 34 41 37 46 46 46 46 37 2c 30 78 ... >,
  txtRecord:
   { deviceid: 'A4:5E:60:E0:9E:A8',
     features: '0x4A7FFFF7,0xE',
     flags: '0x4',
     model: 'AppleTV3,2',
     pk: '0418f973e15ab2b539513b9af313ef6b816d5f1121e46181ec02231b20474b5a',
     pi: 'b11e8acd-9bd6-46e4-b954-032c9ae20ff5',
     srcvers: '220.68',
     vv: '2' },
  addresses: [ 'fe80::a65e:60ff:fee0:9ea7', '192.168.1.103' ] }

var browser = mdns.createBrowser(mdns.tcp('airplay'));
browser.on('serviceUp', function(service) {
  console.log("service up: ", service);
});
browser.on('serviceDown', function(service) {
  console.log("service down: ", service);
});
browser.start();
*/

// discover all available service types
// var all_the_types = mdns.browseThemAll();
