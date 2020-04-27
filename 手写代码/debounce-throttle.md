### 防抖

动作发生一定时间后触发事件。这段时间内，若该动作又触发，则重新等待一定时间
（防抖函数只要一直被触发，则回调方法一直不会被执行）
e.g: 排队等车，如果5分钟内没人上车就开。第4分钟上来人了，则重新计时5分钟

> 若干函数调用合成为1次（只执行1次）

```js
function debounce(fn, time) {
  let timer = null
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, time)
  }
}
```

适用场景： 用户输入校验，点击按钮发送请求；搜索时自动联想；自动保存

### 节流
动作发生一段时间后触发事件。 这段时间内，若动作又发生，则无视该动作，直到事件执行完后，才重新触发

（每隔一段时间执行一次）

```js
function throttle(fn, time) {
  let activeTime = 0
  return () => {
    const current = Date.now()
    if (current - activeTime > time) {
      fn.apply(this, arguments)
      activeTime = Date.now()
    }
  }
}
```

总结：
高频触发的事件， 指定单位事件内，节流只响应第一次，防抖只响应最后一次。若果在指定时间再次触发，防抖会重新计算时间

## 优化