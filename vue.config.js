module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    open: true,
    proxy: {
      '/': {
        target: 'http://192.168.0.109:9090/',
        changeOrigin: true
      }
    }
  },
  lintOnSave: false
}
