const { defineConfig } = require('@vue/cli-service')


module.exports = defineConfig({
    devServer: {
        proxy: 'http://tmacedo.pythonanywhere.com',
    },

    transpileDependencies: true,
    
    publicPath: '/apps/gastos-vocy/',
})
