var path = require('path')
var webpack = require('webpack')
/*
 * 样式提取到单独的css文件里，
 */
var ExtractTextPlugin = require('extract-text-webpack-plugin');
/*
 * webpack中生成HTML的插件，
 */
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 配置入口文件，有几个写几个
  entry: {
    index: './src/js/page/index.js',
    vip: './src/js/page/vip.js',
    profile: './src/js/page/profile.js',
    roomcard: './src/js/page/roomcard.js',
    record: './src/js/page/record.js',
    share: './src/js/page/share.js',
    cardhistory: './src/js/page/cardhistory.js',
    entrance: './src/js/page/entrance.js',
    gameover: './src/js/page/gameover.js',
    detail: './src/js/page/detail.js',
    reg: './src/js/page/reg.js',
  },
  output: {
    path: path.join(__dirname, 'dist'), // 输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
    publicPath: '/',       // 模板、样式、脚本、图片等资源对应的server上的路径
    filename: 'js/[name].js',     // 每个页面对应的主js的生成配置
    chunkFilename: 'js/[id].chunk.js'   // chunk生成的配置
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }]
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "postcss-loader", "sass-loader"]
        })
      },
      // {
      //   test: /\.css$/,
      //   // 配置css的抽取器、加载器。'-loader'可以省去
      //   use: ExtractTextPlugin.extract({
      //     use: ['style-loader', 'css-loader']
      //   })
      // }, {
      //   test: /\.scss$/,
      //   // 配置less的抽取器、加载器。中间!有必要解释一下，
      //   // 根据从右到左的顺序依次调用less、css加载器，前一个的输出是后一个的输入
      //   // 你也可以开发自己的loader哟。有关loader的写法可自行谷歌之。
      //   use: ExtractTextPlugin.extract('css!scss')
      // }, 
      {
        // html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源
        // 比如你配置，attrs=img:src img:data-src就可以一并处理data-src引用的资源了，就像下面这样
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: [':data-src']
            }
          }
        ]
      }, 
      // {
      //   // 文件加载器，处理文件静态资源
      //   test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   use: 'file-loader?name=./fonts/[name].[ext]'
      // }, 
      {
        // 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
        // 如下配置，将小于8192byte的图片转成base64码
        test: /\.(png|jpg|gif)$/,
        use: ['url-loader?limit=8192&name=./img/[hash].[ext]']
        // use: ["file-loader?limit=10000&name=[path][name].[ext]?v=[hash]"]
      },
      {
        test: require.resolve('zepto'),  // 此loader配置项的目标是NPM中的jquery
        loader: 'exports-loader?window.Zepto!script-loader', // 先把jQuery对象声明成为全局变量`jQuery`，再通过管道进一步又声明成为全局变量`$`
      },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({ // 加载zepto
      $: 'zepto'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
      chunks: ['index', 'vip', 'entrance', 'profile', 'roomcard', 'cardhistory', 'share', 'gameover', 'detail'], // 提取哪些模块共有的部分
      minChunks: 3 // 提取至少3个模块共有的部分
    }),
    new ExtractTextPlugin('css/[name].css'), // 单独使用link标签加载css并设置路径，相对于output配置中的publickPath

    // HtmlWebpackPlugin，模板生成相关的配置，每个对于一个页面的配置，有几个写几个
    new HtmlWebpackPlugin({ // 根据模板插入css/js等生成最终HTML
      // favicon: './src/img/favicon.ico', // favicon路径，通过webpack引入同时可以生成hash值
      filename: './index.html', // 生成的html存放路径，相对于path
      template: './src/view/index.html', // html模板路径
      inject: 'body', // js插入的位置，true/'head'/'body'/false
      hash: true, // 为静态资源生成hash值
      chunks: ['vendors', 'index'], // 需要引入的chunk，不配置就会引入所有页面的资源
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: false // 删除空白符与换行符
      }
    }),
    new HtmlWebpackPlugin({
      // favicon: './src/img/favicon.ico', 
      filename: './vip.html',
      template: './src/view/vip.html',
      inject: true,
      hash: true,
      chunks: ['vendors', 'vip'], 
      minify: {
        removeComments: true, 
        collapseWhitespace: false
      }
    }),
    new HtmlWebpackPlugin({
      // favicon: './src/img/favicon.ico', 
      filename: './reg.html',
      template: './src/view/reg.html',
      inject: true,
      hash: true,
      chunks: ['vendors', 'reg'], 
      minify: {
        removeComments: true, 
        collapseWhitespace: false
      }
    }),
    new HtmlWebpackPlugin({
      // favicon: './src/img/favicon.ico', 
      filename: './vip.html',
      template: './src/view/vip.html',
      inject: true,
      hash: true,
      chunks: ['vendors', 'vip'], 
      minify: {
        removeComments: true, 
        collapseWhitespace: false
      }
    }),
    new HtmlWebpackPlugin({
      // favicon: './src/img/favicon.ico', 
      filename: './entrance.html', 
      template: './src/view/entrance.html', 
      inject: true,
      hash: true,
      chunks: ['vendors', 'entrance'], 
      minify: {
        removeComments: true, 
        collapseWhitespace: false
      }
    }),
    new HtmlWebpackPlugin({
      // favicon: './src/img/favicon.ico',
      filename: './profile.html',
      template: './src/view/profile.html',
      inject: true,
      hash: true,
      chunks: ['vendors', 'profile'], 
      minify: { 
        removeComments: true,
        collapseWhitespace: false 
      }
    }),
    new HtmlWebpackPlugin({
      // favicon: './src/img/favicon.ico',
      filename: './roomcard.html',
      template: './src/view/roomcard.html',
      inject: true, 
      hash: true,
      chunks: ['vendors', 'roomcard'],
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),
    new HtmlWebpackPlugin({ 
      // favicon: './src/img/favicon.ico', 
      filename: './record.html',
      template: './src/view/record.html', 
      inject: true,
      hash: true, 
      chunks: ['vendors', 'record'],
      minify: { 
        removeComments: true, 
        collapseWhitespace: false
      }
    }),
    new HtmlWebpackPlugin({
      // favicon: './src/img/favicon.ico',
      filename: './share.html',
      template: './src/view/share.html',
      inject: true,
      hash: true, 
      chunks: ['vendors', 'share'],
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),
    new HtmlWebpackPlugin({
      // favicon: './src/img/favicon.ico',
      filename: './cardhistory.html',
      template: './src/view/cardhistory.html',
      inject: true,
      hash: true,
      chunks: ['vendors', 'cardhistory'],
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),
    new HtmlWebpackPlugin({
      // favicon: './src/img/favicon.ico',
      filename: './gameover.html',
      template: './src/view/gameover.html',
      inject: true,
      hash: true,
      chunks: ['vendors', 'gameover'],
      minify: { 
        removeComments: true, 
        collapseWhitespace: false
      }
    }),
    new HtmlWebpackPlugin({
      // favicon: './src/img/favicon.ico',
      filename: './detail.html',
      template: './src/view/detail.html', 
      inject: true,
      hash: true,
      chunks: ['vendors', 'detail'],
      minify: { 
        removeComments: true,
        collapseWhitespace: false
      }
    }),
    new webpack.HotModuleReplacementPlugin() // 热加载
  ],
  devServer: {
    contentBase: './',
    host: 'localhost',
    port: 9900,
    inline: true,
    hot: true
  }
}
