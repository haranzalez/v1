module.exports = {
  lintOnSave: false,
  //baseUrl: '/sub-path/',
  configureWebpack: {
    //entry: ["babel-polyfill", "./src/main.js"]
  },
  devServer: {
    proxy:{
      '/api': {
        target: 'http://192.168.2.102:3333',
      },
    } 
  },
}
