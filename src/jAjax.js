/*!
 * jAjax v0.0.1 - jQuery.ajax adapter.
 * Copyright 2015 George Chung <Gerhut@GMail.com>
 * License under Apache-2.0
*/

// Polyfill the Promise of global
require('../es6-promise/dist/es6-promise.js').polyfill()

var jQuery = require('../jquery/dist/jquery.js')

// Adapt jQuery.ajax
function jAjax() {
  return Promise.resolve(jQuery.ajax.apply(jQuery, arguments))
}

// Adapt jQuery ajax helpers
var helpers = ['getJSON', 'getScript', 'get', 'post']

for (var i = 0, l = helpers.length; i < l; i++) {
  var helper = helpers[i]
  jAjax[helper] = function () {
    return Promise.resolve(jQuery[helper].apply(jQuery, arguments))
  }
}
module.exports = jAjax
