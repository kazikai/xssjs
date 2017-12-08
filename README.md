# xssjs
xss escape/unescape javascript library

# How to build your own xssjs
Clone a copy of the main xssjs git repo by running:
```bash
git clone git://github.com/kazikai/xssjs.git
```
Install rollup npm global
```bash
cs xssjs
npm i -g rollup
npm i
```

Enter the xssjs directory and run the build script:
```bash
npm run build
```

# build
```bash
npm run build
```

# development
```bash
npm run dev
```

# test
```bash
npm test or npm run test
```

# How to use
Bower
```bash
bower install xssjs
```

Browser
```html
<script src="dist/xss.js"></script>
```

```js
let cleanString = xss.excape('dirty string');
let originString = xss.unescape(cleanString);
```

Node.js
```
npm i --save xssjs
```
```js
const xss = require('xssjs');
let cleanString = xss.excape('dirty string');
let originString = xss.unescape(cleanString);
```

