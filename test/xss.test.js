var assert = require('assert');
var xss = require('../dist/xss.js')
describe('Escape/Unescape', function() {
  let map = xss.map;

  for(const code in map) {
    describe(`${code} is Escape/Unescape`, function() {
      let output = xss.escape(`${code}`);
      it(`should return ${map[code]}`, function() {
        assert.equal(`${map[code]}`, output);
      });
      it(`should return ${code}`, function() {
        assert.equal(`${code}`, xss.unescape(output));
      });
    });
  }
  describe(`<script> is Escape/Unescape`, function() {
    let string = '<script>'
    let outpuString = '&lt;script&gt;'
    let output = xss.escape(string);
    it(`should return ${outpuString}`, function() {
      assert.equal(`${outpuString}`, output);
    });
    it(`should return ${string}`, function() {
      assert.equal(`${string}`, xss.unescape(output));
    });
  });
  describe(`alert(document.cookie) is Escape/Unescape`, function() {
    let string = 'alert(document.cookie)'
    let outpuString = 'alert&#40;document.cookie&#41;'
    let output = xss.escape(string);
    it(`should return ${outpuString}`, function() {
      assert.equal(`${outpuString}`, output);
    });
    it(`should return ${string}`, function() {
      assert.equal(`${string}`, xss.unescape(output));
    });
  });
});
