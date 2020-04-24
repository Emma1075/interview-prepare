## DOM 事件类

### 事件级别
1. DOM0 `element.onclick = function(){}`
2. DOM2 `element.addEventListener('click', function(){}, false)`
3. DOM3 `element.addEventListener('keyup', function(){}, false)` 增加多种事件

### 事件模型
- 捕获： 从上往下
- 冒泡： 从目标元素往上

#### 事件捕获 capture phase
一个事件发生后，从 window 发出， 不断经过子节点直到目标节点。在事件到达目标节点之前的过程，就是捕获阶段。而所有经过的节点，都会触发对应事件

#### 事件冒泡 bubbling phase
当事件到达目标节点后，会沿着捕获阶段的路线返回。通过冒泡的事件机制，所有子节点的事件都能被父级节点所捕获。

### 事件流
概念： DOM 结构是一个树形结构， 当一个 HTML 元素产生一个事件时， 该事件会在元素节点与根节点之间的路径传播。路径所经过的节点都会收到该事件，这个传播过程被称为 DOM 事件流

过程： 捕获 -> 目标阶段 -> 冒泡

### 描述 DOM 事件捕获的具体流程

window -> document -> html(document.documentElement获取) -> body -> ... -> 目标元素

## Event 对象
- `event.preventDefault()`                  阻止默认行为
- `event.stopPropagation()`                 阻止冒泡行为
- `event.stopImmediatePropagation()`        阻止调用相同事件的其他侦听器
- `event.currentTarget`                     指向事件所绑定的元素（返回其事件监听器触发该事件的元素 ul）
- `event.target`                            指向事件发生时的元素 （返回事件的目标节点 li）

## 自定义事件
```js
var myEvent = new Event('custome');

ev.addEventListener('custome', function() {
    console.log('it is my event.');
})

ev.dispatchEvent(myEvent);      // 触发自定义事件

```

## 事件委托
优点：
1. 提高性能。只需要添加一个事件处理程序，所占用的内存空间更少
2. 动态监听。使用委托可以监听"未来"的元素。

--- 

## 移动端事件
### 1.触摸事件
`touchstart`
`touchmove`
`touchend`
`touchcancel`

### 2.手势事件
`gesturestart`
`gesturechange`
`gestureend`
`scale`
`rotation`

### 3.传感器事件
`deviceorientation` 提供设备物理方向信息
`devicemotion`  提供设备加速信息
`orientationchange` 提供设备旋转方向信息