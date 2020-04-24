## 手写一个 promise
```js

function Promise(executor) {
  this.state = 'pending'; //状态
  this.value = undefined; //成功结果
  this.reason = undefined; //失败原因

  function resolve(value) {
      
  }

  function reject(reason) {

  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
}

```