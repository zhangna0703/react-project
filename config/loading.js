const fs = require('fs')
const path = require('path')

// first-loading
const loading = {
  html: fs.readFileSync(path.resolve(__dirname, '../src/assets/loading/loading.html')),
  css: '<style >' + fs.readFileSync(path.resolve(__dirname, '../src/assets/loading/loading.css'))+'</style>',
}

module.exports = loading