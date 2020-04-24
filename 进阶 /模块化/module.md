# 模块化
原则：高内聚，低耦合

## 模块化写法探索
### 原始写法
将功能实现类函数方法单独文件夹内

缺点： 易发生变量命名冲突，容易污染全局变量，模块成员间无太多必然联系

### 添加命名空间
使用单全局变量模块
```js
var my_module = {
    _index: 0,
    a1: function() {
      
    },
    a2: function() {
      
    }
    ...
}
```
缺点：私有属性还是向外暴露了

### 立即执行函数
```js
var my_module = (function() {
    var index = 0;
    var a1 = function() {
      // 调用 _a2
    };
    var _a2 = function() {
      
    };
    return {
        a: a1;
    }
})()

my_module.index;    // undefined
my_module.a();  // 3   
```

优点：既避免了命名冲突，又能不让私有变量被外部访问

## 模块化规范
### CommonJS
#### 实现代表
实现代表： Node.js

#### 特点
1. 所有模块都有单独作用域，不会污染全局变量
2. 重复加载模块只加载第一次，后面都从缓存读取
3. 模块加载的顺序按照代码中出现的顺序
4. 模块加载是同步的（因此适合服务端而不适合浏览器）

#### `exports` 与 `module.exports` 关系

- `exports` 是 `module.exports`的引用
- 不能给 `exports` 赋值

### AMD
AMD支持异步加载模块，规范中定义了一个全局变量 define 函数
- !依赖提前声明好
```js
define(id?, dependencies?, factory)
```

eg:
```js
define('alpha', ['require', 'exports', 'beta'], function(require, exports, beta) {
    export.verb = function() {
        return beta.verb();
    }
})
```

#### 实现代表
实现代表：RequireJS

RequireJS 库能把 AMD 规范应用到实际浏览器 Web 端的开发中。

#### RequireJS优点
1. 实现 JavaScript 文件的异步加载，避免网页失去响应
2. 管理模块之间的依赖性，便于代码的编写与维护

此外，RequireJs 支持费 AMD 规范的模块，支持使用 require.config 方法来定义一些特例。

### CMD
common module definition
- !支持动态引入依赖文件

#### 实现 CMD 的关键函数
- define
- require 
- exports (还可以通过 return 直接提供接口)

#### 实现代表
实现代表： [Seajs](https://github.com/seajs/seajs)

## ES6 模块支持
ECMAScript 原生模块化支持

优点：
1. 语法较 CommonJS 更简洁
2. 支持编译时加载（静态加载）
3. 更优秀的循环处理

两个命令： reuire 与 export/export default


## UMD
兼容 AMD， CommonJS的模块化语法

