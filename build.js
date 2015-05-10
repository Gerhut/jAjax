const spawnSync = require('child_process').spawnSync
const writeFileSync = require('fs').writeFileSync
const join = require('path').join
const gzipSync = require('zlib').gzipSync

// Build jQuery.ajax
const cwd = join(__dirname, 'jquery')
const grunt = join(cwd, 'node_modules/grunt-cli/bin/grunt')
const task = ['build', '*',
  '+ajax', '+ajax/xhr', '+ajax/script', '+ajax/jsonp',
  '-sizzle','-core/init','-traversing','-selector-native',
  '-exports/global', '-exports/amd'].join(':')
spawnSync('node', [grunt, task], { cwd: cwd, stdio: 'inherit' })

// Bundle them all
const browserify = require('browserify')
const bundle = browserify('./src/jAjax.js', {
  standalone: 'jAjax',
  detectGlobals: false
}).bundle(function (err, bundleCode) {
  writeFileSync(join(__dirname, 'dist/jAjax.js'), bundleCode)
  console.log('Bundle: ' + bundleCode.length + ' bytes')
  
  // Compress to min.js
  console.log('Compressing...')
  const UglifyJS = require('uglify-js')
  const bannerCode = ['/*!',
    ' * jAjax v0.0.1 - jQuery.ajax adapter.',
    ' * https://github.com/Gerhut/jAjax',
    ' *',
    ' * Includes jQuery',
    ' * http://jquery.com/',
    ' *',
    ' * Includes ES6-Promise',
    ' * https://github.com/jakearchibald/es6-promise',
    ' *',
    ' * Copyright 2015 George Chung <Gerhut@GMail.com>',
    ' * License under Apache-2.0',
    '*/', ''].join('\n')
  const minifyCode = bannerCode + UglifyJS.minify('./dist/jAjax.js').code
  writeFileSync('./dist/jAjax.min.js', minifyCode)
  console.log('Compressed: ' + minifyCode.length + ' bytes')

  // Gzip code to min.js.gzip
  const gzipCode = gzipSync(minifyCode)
  writeFileSync('./dist/jAjax.min.js.gzip', gzipCode)
  console.log('Gziped: ' + gzipCode.length + ' bytes')
  console.log('All complete.')
})
console.log('Bundling...')
