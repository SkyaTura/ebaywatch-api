module.exports = api => {
  api.cache(true)
  return {
    plugins: [
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-object-rest-spread',
    ],
    presets: ['@babel/preset-env'],
  }
}
