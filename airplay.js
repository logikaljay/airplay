var mdns = require('airplay-mdns-server')

var opts = {
  name: 'My AirPlay Server',
  version: '1.0.0',
  port: 5000
}

mdns(opts, function (err) {
  if (err) throw err
  console.log('AirPlay server is being advertised')
})
