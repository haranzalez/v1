module.exports = {
  lintOnSave: false,
  //baseUrl: '/sub-path/',
  configureWebpack: {
    //entry: ["babel-polyfill", "./src/main.js"]
  },
  devServer: {
    proxy:{
      '/api': {
        target: 'http://localhost:3333',
      },
    } 
  },
}
