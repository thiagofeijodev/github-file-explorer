const path = require('path')

module.exports = {
  entry: 'src/index',
  chainWebpack: config => {
    config.resolve.modules.add(path.join(__dirname, 'src'))
  }
}