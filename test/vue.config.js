module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/test/" : "/",
};

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
