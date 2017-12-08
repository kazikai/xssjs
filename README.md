# xssjs
xss escape/unescape

# build
npm run build

# development
npm run dev

# test
npm test | npm run test

# How to use
Browser
<script src="dist/xss.js"></script>
- let cleanString = xss.excape('dirty string');
- let originString = xss.unescape(cleanString);

Node.js
- const xss = require('xssjs');
- let cleanString = xss.excape('dirty string');
- let originString = xss.unescape(cleanString);


