var glslifyBundle = require('glslify-bundle')
var glslifyDeps = require('glslify-deps')
var path = require('path')
var through = require('through2')

function transform(filename, options) {
  if (path.extname(filename) !== '.glsl') return through()

  var deps = glslifyDeps()
  var transforms = options.transform || []

  for (var i = 0; i < transforms.length; i++) {
    var transform = transforms[i]
    if (typeof transform === 'string') {
      deps.transform(transform)
    } else {
      deps.transform(transform[0], transform[1])
    }
  }

  var chunks = []
  function transform(chunk, encoding, callback) {
    chunks.push(chunk)
    callback()
  }

  function flush(callback) {
    var stream = this
    var source = Buffer.concat(chunks).toString()
    deps.inline(source, path.dirname(filename), function(error, tree) {
      if (!error) {
        stream.push('module.exports = ')
        stream.push(JSON.stringify(glslifyBundle(tree)))
      }
      callback(error)
    })
  }

  return through(transform, flush)
}

module.exports = transform
