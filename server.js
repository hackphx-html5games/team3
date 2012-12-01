var http = require('http')
  , path = require('path')
  , ecstatic = require('ecstatic')

var port = 8080

http.createServer(
  ecstatic(path.join(__dirname, 'src'))
).listen(port)

console.log('Listening on ' + port)

