module.exports = {
  presets: ['@babel/preset-env', 'babel-preset-poi'],
  env: {
    test: {
      presets: [['@babel/preset-env']],
    },
  },
}
