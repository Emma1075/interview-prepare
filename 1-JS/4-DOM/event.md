JS 事件

## 阻止默认事件
return false 

keydown 事件 return false 后无法输入 => 可以用来做表单验证（不过现在可以用 html5 实现了）


## 拖拽
三个距离

### IE 方式
 attachEvent
 detachEvent
 
```js
btn.attachEvent('onclick', function() {
})

```


### DOM 方式
addEventListener
removeEventlistener

```js
btn.addEventListener('click', function(){
    
}, false)
```
默认第三个参数为 false， 表示该元素在事件的"冒泡阶段"（由内向外传递时） 响应事件

如果为 true， 则表示元素在"捕获阶段"（外向内传递） 响应事件

