
const path = require('path')

function  resolve( dir ) {
    return path.join( __dirname, dir )
}

module.exports = {
    // configureWebpack: {  //暂时不要配置
    //     output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
    //         filename: '[name].js',
    //         chunkFilename: '[name].js'
    //       },
    // },
    publicPath:"./",
    productionSourceMap:false,
    lintOnSave: false,
    assetsDir: 'assets', 
    outputDir: 'dist',
    devServer: {
        open: 'Chrome',
        port: 8069,
        hot: false,
        host: '0.0.0.0',
        // 配置
        disableHostCheck: false,
        proxy: {
            //配置跨域
            '/api': {
                target: "http://180.169.207.206:9501/ZD.ZFGWE.API",   //接口前面需加上/api/防止和路由冲突 fetch.js也需要加
                changOrigin:true,
                secure: false,
                pathRewrite:{
                    '^/api':'/'
                }
            }
        }
    },
    transpileDependencies: [
        'webpack-dev-server/client',
    ],
    chainWebpack: config => {
    	config.plugins.delete('prefetch')
        config.resolve.alias
            // 基础文件路径
            .set( 'Base', resolve( 'src/base/css' ) )
            // 组件路径
            .set( 'Com', resolve( 'src/components' ) )
            .set( 'Views', resolve( 'src/views' ) )
            //  models 逻辑实现路径
            .set( 'Mod', resolve( 'src/models' ) )
            //  until 路径
            .set( 'utils', resolve( 'src/utils' ) )
            //    views 路径
            .set( 'Views', resolve( 'src/views' ) )
            //  src 路径
            .set( '@', resolve( 'src' ) )
    },

}