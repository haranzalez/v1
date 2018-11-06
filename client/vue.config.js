module.exports = {
  lintOnSave: false,
  //baseUrl: '/sub-path/',
  configureWebpack: {
    //entry: ["babel-polyfill", "./src/main.js"]
  },
  devServer: {
    proxy:{
      '/api': {
        target: 'http://172.30.10.18:3333',
      },
    } 
  },
}
