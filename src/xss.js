(function() {
  const xss = {};

  let root = typeof self === 'object' && self.self === self && self ||
    typeof global === 'object' && global.global === global && global ||
    this || {};
  if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = xss;
    }
    exports.xss = xss;
  } else {
    root.xss = xss;
  }

  const xssMap = {
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

  const invert = (map) => {
    const result = {};
    for (const key in map) {
      if (map.hasOwnProperty(key)) {
        result[map[key]] = key;
      }
    }
    return result;
  };

  const unescapeMap = invert(xssMap);
  const createEscaper = (map) => {
    const escaper = (match) => {
      return map[match];
    };
    const keys = [];
    for(const key in map) {
      if (map.hasOwnProperty(key)) {
        keys.push(key);
      }
    };
    let regexp = keys.join('|');
    // for (,)
    regexp = regexp.replace(/\(/g, '\\(');
    regexp = regexp.replace(/\)/g, '\\)');
    regexp = `(?:${regexp})`;
    const testRegexp = RegExp(regexp);
    const replaceRegexp = RegExp(regexp, 'g');
    return (string) => {
      string = !string ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };

  xss.escape = createEscaper(xssMap);
  xss.unescape = createEscaper(unescapeMap);
  xss.map = xssMap;

  if (typeof define === 'function' && define.amd) {
    define('xss', [], () => {
      return xss;
    });
  }
}());