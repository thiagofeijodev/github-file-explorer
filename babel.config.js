module.exports = {
  presets: ['@babel/preset-env', 'babel-preset-poi'],
  plugins: ['babel-plugin-styled-components'],
  env: {
    test: {
      presets: [['@babel/preset-env']],
    },
  },
}
