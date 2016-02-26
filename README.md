
glslify-bare
============

[browserify](https://github.com/substack/node-browserify) transform that compiles .glsl shaders using [glslify](https://github.com/stackgl/glslify).

This module differs from glslify in that it lets you `require('./shader.glsl')` calls directly instead of parsing every file in the browserify transform pipeline searching for calls to `glslify()`.

This makes this transform much more performant than the standard glslify transform but has the drawback of not letting you pass transform options on a per-file basis.

Usage
-----

Use

```javascript
var src = require('./shader.glsl')
```

Instead of

```javascript
var glslify = require('glslify')
var src = glslify(__dirname + '/shader.glsl')
```

Everything else is the same
