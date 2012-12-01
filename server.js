var http = require('http')
  , path = require('path')
  , ecstatic = require('ecstatic')

http.createServer(
  ecstatic(path.join(__dirname, 'src'))
).listen('8080')

