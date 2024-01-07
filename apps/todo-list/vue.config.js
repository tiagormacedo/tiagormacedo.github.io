module.exports = {
    devServer: {
        proxy: 'http://tmacedo.pythonanywhere.com',
    },
    transpileDependencies: true,
    publicPath: '/apps/todo-list/',
}
