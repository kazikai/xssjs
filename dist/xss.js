(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

(function () {
  var xss = {};

  var root = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) === 'object' && self.self === self && self || (typeof global === 'undefined' ? 'undefined' : _typeof(global)) === 'object' && global.global === global && global || this || {};
  if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = xss;
    }
    exports.xss = xss;
  } else {
    root.xss = xss;
  }

  var xssMap = {
    '&': '&#38;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '#': '&#35;',
    "'": '&#39;',
    '`': '&#x60;',
    '(': '&#40;',
    ')': '&#41;'
  };

  var invert = function invert(map) {
    var result = {};
    for (var key in map) {
      if (map.hasOwnProperty(key)) {
        result[map[key]] = key;
      }
    }
    return result;
  };

  var unescapeMap = invert(xssMap);
  var createEscaper = function createEscaper(map) {
    var escaper = function escaper(match) {
      return map[match];
    };
    var keys = [];
    for (var key in map) {
      if (map.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    var regexp = keys.join('|');
    // for (,)
    regexp = regexp.replace(/\(/g, '\\(');
    regexp = regexp.replace(/\)/g, '\\)');
    regexp = '(?:' + regexp + ')';
    var testRegexp = RegExp(regexp);
    var replaceRegexp = RegExp(regexp, 'g');
    return function (string) {
      string = !string ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };

  xss.escape = createEscaper(xssMap);
  xss.unescape = createEscaper(unescapeMap);
  xss.map = xssMap;

  if (typeof define === 'function' && define.amd) {
    define('xss', [], function () {
      return xss;
    });
  }
})();

})));
