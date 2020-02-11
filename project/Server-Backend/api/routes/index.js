'use strict'
const fs = require('fs');

// load all routers
// let test = fs.readdirSync(__dirname)
// console.warn(test)
fs.readdirSync(__dirname).forEach((file) => {
  if (file !== 'index.js') {
    let keyName = file.split('.')[0].split('-')[0]
    let moduleName = file.split('.')[0]
    exports[keyName] = require('./' + moduleName)
  }
})
