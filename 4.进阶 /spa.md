## 单页应用依赖技术
1. JS 框架提供的渲染和页面切换能力
2. Ajax 提供前端页面和服务器数据交互能力

## SPA优缺点
优点：

1. 前后端分离，相互依赖性弱
2. 后端维护一套接口即可多端适配

缺点：

1. 不利于 SEO（搜索引擎优化）
2. 大型单页应用时，JS 文件体积过大。 => 路由拆包，按需加载，减少首屏加载时间


## 路由的实现
两种技术模式实现路由
1. 基于 hash
2. 基于 History API（只有新型浏览器支持 popstate 事件，且需要后端路由配合）

### 实现需要的三部分
1. 存储路径
2. 对应的回调方法
3. 监听器的相关事件

```js
function find(arr){
    var tempObj = {};

    arr.forEach((ele, i) => {
        if(!tempObj[ele]){
            tempObj[ele] = 1;
        } else {
            tempObj[ele] = tempObj[ele]+1;
        }
    })

    var max = 0;
    var output = {};
    for (var j in tempObj) {
        if( max < tempObj[j] ) {
            max = tempObj[j];
            output[max] = j;
        }
    }
    return output ;
}


function Parent() {
    this.a = 1;
    this.b = [1, 2, this.a];
    this.c = { demo: 5 };
    this.show = function() {
        console.log(this.a, this.b, this.c.demo);
    }
}

function Child() {
    this.a = 2;
    this.change = function() {
        this.b.push(this.a);
        this.a = this.b.length;
        this.c.demo = this.a++;
    }
}
Child.prototype = new Parent();
var parent = new Parent();
var child1 = new Child();
var child2 = new Child();

```