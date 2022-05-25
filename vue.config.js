module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    open: true,
    proxy: {
      '/': {
        target: 'http://127.0.0.1:9090/',
        changeOrigin: true
      }
    }
  },
  lintOnSave: false
}
