const path = require('path')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-vue-components/webpack')({ dirs: ['src'] }),
      Components({
        resolvers: [ElementPlusResolver()],
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        components: '@/components'
      }
    },
    module: {
      rules: [{ test: /\.less$/, use: 'less-loader' }],
    },
    devServer: {
      proxy: {
        '/api': {
          target: 'http://62u8ga.natappfree.cc',
          pathRewrite: { '^/api': '' },
          changeOrigin: true
        },
      },
    },
  }
}