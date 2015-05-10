# jAjax

jQuery.ajax with Promise in ES6 (Polyfill included).

## Usage

```javascript
jAjax('data.json', { /* options */}).then(function (data) {
  // ES6 Promise onFulfilled
}, function (reason) {
  // ES6 Promise onRejected
})

// Ajax helpers are all available
jAjax.get('data.json')
jAjax.post('data.json')
jAjax.getScript('app.js')
jAjax.getJSON('data.json')
```

## Build your own

```shell
$ git clone git://github.com/gerhut/jAjax.git
$ cd jAjax
$ npm install
$ git submodule init
$ git submodule update
$ cd jquery
$ npm install
$ cd ..
$ npm start
```

### Tips

- Use jQuery `master` or `compat` branch only, `1.x-stable` & `2.x-stable` has bugs in grunt file and won't be fixed.

# License

[Apache-2.0](https://raw.githubusercontent.com/Gerhut/jAjax/master/LICENSE)