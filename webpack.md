# webpack

## 什么是前端工程化
1. 协作上
  - 开发规范、语法检查工具
  - 版本管理、提交规范

2. 项目架构上
  - 模块化、组件化
  - 脚手架统一

3. 构建
  - 资源压缩、混淆
  - 图片处理

4. 持续集成、部署
  - jenkins CI
  - 静态资源分离， cdn

5. 质量跟踪
  - 单元测试
  - 监控

6. 用户体验
  

## webpack打包优化的方法

### 优化构建速度

1. 生产环境

- cache-loader
  - 在一些性能开销较大的 loader 之前添加 cache-loader，将结果缓存中磁盘中
- babel-loader
- noParse
  - 如果一些第三方模块没有AMD/CommonJS规范版本，可以使用 noParse 来标识这个模块，这样 Webpack 会引入这些模块，但是不进行转化和解析，从而提升 Webpack 的构建性能
- ignorePlugin
  - webpack 的内置插件，作用是忽略第三方包指定目录
- happypack
  - 在使用 Webpack 对项目进行构建时，会对大量文件进行解析和处理。当文件数量变多之后，Webpack 构件速度就会变慢。由于运行在 Node.js 之上的 Webpack 是单线程模型的，所以 Webpack 需要处理的任务要一个一个进行操作。
  - 而 Happypack 的作用就是将文件解析任务分解成多个子进程并发执行。子进程处理完任务后再将结果发送给主进程。所以可以大大提升 Webpack 的项目构建速度
- paralleUglifyPlugin


```js
// happypack 配置
const HappyPack = require('happypack')
const os = require('os')
// 开辟一个线程池
// 拿到系统CPU的最大核数，happypack 将编译工作灌满所有线程
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=js',
      },
    ],
  },
  plugins: [
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'babel-loader',
        },
      ],
    }),
  ],
}

// 注意：MiniCssExtractPlugin 无法与 happypack 共存
```


2. 开发环境

- 自动刷新
- 热更新
- dllplugin
  - 有些时候，如果所有的JS文件都打成一个JS文件，会导致最终生成的JS文件很大，这个时候，我们就要考虑拆分 bundles。
  - DllPlugin 和 DLLReferencePlugin 可以实现拆分 bundles，并且可以大大提升构建速度，DllPlugin 和 DLLReferencePlugin 都是 webpack 的内置模块
  - 将静态资源文件（运行依赖包）与源文件分开打包，先使用DllPlugin给静态资源打包，再使用DllReferencePlugin让源文件引用资源文件

#### 热更新原理

Server端使用webpack-dev-server去启动本地服务，内部实现主要使用了webpack、express、websocket

1. 使用express启动本地服务，当浏览器访问资源时对此做响应。
2. 服务端和客户端使用websocket实现长连接
3. webpack监听源文件的变化，即当开发者保存文件时触发webpack的重新编译。
  - 每次编译都会生成hash值、已改动模块的json文件、已改动模块代码的js文件
  - 编译完成后通过socket向客户端推送当前编译的hash戳
4. 客户端的websocket监听到有文件改动推送过来的hash戳，会和上一次对比
  - 一致则走缓存
  - 不一致则通过ajax和jsonp向服务端获取最新资源
5. 使用内存文件系统去替换有修改的内容实现局部刷新


### 优化产出代码

- 提取公用代码
  - optimization.splitChunks
- bundle + hash
- 小图片 base64 编码 （url-loader）
- scop hosting
  - 变量提升，可以减少一些变量声明。在生产环境下，默认开启
- Tree shaking
  - 如果使用ES6的import 语法，那么在生产环境下，会自动移除没有使用到的代码
- cdn加速
- 懒加载
- ignorePlugin


#### tree shaking 原理：
1. 前提：前提是模块必须采用ES6Module语法，因为treeShaking依赖ES6的静态语法：import 和 export。
ES6 module 特点：ES6模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析(这就是tree-shaking的基础)
2. webpack对模块打标记 && 压缩工具uglifyjs-webpack-plugin
  - 1）压缩工具的作用：混淆，压缩，最小化，删除不可达代码等；
  - 2）treeShaking依赖于对模块导出和被导入的分析;
  - 3）webpack对代码进行标记，把import & export标记为3类：

- 开启ScopeHoisting：所有代码打包到一个作用域内，然后使用压缩工具根据变量是否被引用进行处理，删除未被引用的代码；

- 未开启ScopeHoisting：每个模块保持自己的作用域，由webpack的treeShaking对export打标记，未被使用的导出不会被webpack链接到exports（即被引用数为0），然后使用压缩工具将被引用数为0的变量清除。

## 抽离压缩 css 文件

```js
{
  plugins: [
    new MiniCssExtractPlugin({
      filename: '',
    })
  ],
  optimization: {
    // 压缩 css
    minimizer: [
      new TerserJSPlugin({})， new OptimizeCSSAssetsPlugin({})
    ]
  }
}

```

## 抽离公共代码

```js

optimization: {
    // 分割代码块
    splitChunks: {
      cacheGroups: {
        vendor: {

        },

        common: {

        }
      },

    }
  }

```

## 懒加载

## loader 与 plugin

## externals
防止将外部引用的包打包到 bundle 中

## 热更新原理

使用express启动本地服务，当浏览器访问资源时对此做响应。
服务端和客户端使用websocket实现长连接
webpack监听源文件的变化，即当开发者保存文件时触发webpack的重新编译。

每次编译都会生成hash值、已改动模块的json文件、已改动模块代码的js文件
编译完成后通过socket向客户端推送当前编译的hash戳
客户端的websocket监听到有文件改动推送过来的hash戳，会和上一次对比

一致则走缓存
不一致则通过ajax和jsonp向服务端获取最新资源
使用内存文件系统去替换有修改的内容实现局部刷新