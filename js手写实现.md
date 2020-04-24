## 手写apply、手写call、手写bind

call 实现思路

- 首先 context 为可选参数，如果不传的话默认上下文为 window
- 接下来给 context 创建一个 fn 属性，并将值设置为需要调用的函数
- 因为 call 可以传入多个参数作为调用函数的参数，所以需要将参数剥离出来
然后调用函数并将对象上的函数删除

```js
// 实现 call。调用eg: fn.myCall(this, a, b, c)
Function.prototype.mycall = function(context, ...args) {
  const ctx = context || window
  console.log('mycall args>>', args)
  // 将当前被调用的方法定义在 ctx.func 上
  ctx.func = this
  const result = ctx.func(...args)
  // 最后要删除该方法，避免对 ctx 对象造成污染
  delete ctx.func
  return result
}

Function.prototype.myapply = function(context, args) {
  // if (typeof this !== 'function') {
  //   throw new TypeError('Error')
  // }
  const ctx = context || window
  console.log('myapply args>>', args)
  // 将当前被调用的方法定义在 ctx.func 上
  ctx.func = this
  const result = ctx.func(...args)
  // 最后要删除该方法，避免对 ctx 对象造成污染
  delete ctx.func
  return result
}

Function.prototype.mybind = function(context, ...args) {
  // 返回一个函数
  return () => {
    this.apply(context, args)
  }
}


```

## 手写new

在调用 new 的过程中会发生以上四件事情：

1. 新生成了一个对象
2. 链接到原型
3. 绑定 this
4. 返回新对象

```js
// @param constructor 构造函数
// @param params 构造函数参数
function _new(constructor, params) {
  // 将 arguments 对象转为数组
  var args = [].slice.call(arguments);
  // 取出构造函数
  var constructor = args.shift();
  // 创建一个空对象，继承构造函数的 prototype 属性
  var context = Object.create(constructor.prototype);
  // 执行构造函数
  var result = constructor.apply(context, args);
  // 如果返回结果是对象，就直接返回，否则返回 context 对象
  return (typeof result === 'object' && result != null) ? result : context;
}

// 实例
var actor = _new(Person, '张三', 28);
```

## 手写instance
instanceof 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的 prototype。


- 首先获取类型的原型
- 然后获得对象的原型
- 然后一直循环判断对象的原型是否等于类型的原型，直到对象原型为 null，因为原型链最终为 null

```js
function _instanceof(left, right) {
  let prototype = right.prototype
  left = left.__proto__
  while (true) {
    if (left === null || left === undefined)
      return false
    if (prototype === left)
      return true
    left = left.__proto__
  }
}

// person _instanceof Person
function _instanceof(L, R) {   // L 表示instanceof左边，R 表示instanceof右边
  let O = R.prototype;         // 取 R 的显示原型
  L = L.__proto__;             // 取 L 的隐式原型
  while (true) {               // 循环执行，直到 O 严格等于 L
    if (L === null) return false;
    if (O === L) return true;
    L = L.__proto__;
  }
}

```

## 手写promise

```js

class Promise{
  // 构造器
  constructor(executor){
    this.state = 'pending';   // 初始化state为等待态 fulfilled/rejected/pending
    this.value = undefined;   // 成功的值
    this.reason = undefined;  // 失败的原因
   
    this.onResolvedCallbacks = [];   // 成功存放的数组
    this.onRejectedCallbacks = [];  // 失败存放法数组
    
    // 成功
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value
        // 一旦resolve执行，调用成功数组的函数
        this.onResolvedCallbacks.forEach(fn=>fn());
      }
    }; 
     // 失败  
    let reject = reason=> {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
        // 一旦reject执行，调用失败数组的函数
        this.onRejectedCallbacks.forEach(fn=>fn());
      }
    };   
    // 如果executor执行报错，直接执行reject
    try{
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled,onRejected) {
    // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    // onRejected如果不是函数，就忽略onRejected，直接扔出错误
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        // 异步
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };
      if (this.state === 'rejected') {
        // 异步
        setTimeout(() => {
          // 如果报错
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          // 异步
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          // 异步
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0)
        });
      };
    });
    // 返回promise，完成链式
    return promise2;
  }
}

```


## 手写jsonp

```js
function jsonp(url, jsonpCallback, success) {
  let script = document.createElement('script')
  script.src = url
  script.async = true
  script.type = 'text/javascript'
  window[jsonpCallback] = function(data) {
    success && success(data)
  }
  document.body.appendChild(script)
}
jsonp('http://xxx', 'callback', function(value) {
  console.log(value)
})

```

## 原生ajax

```js
ajax({
    url: 'your request url',
    method: 'get',
    async: true,
    timeout: 1000,
    data: {
        test: 1,
        aaa: 2
    }
}).then(
    res => console.log('请求成功: ' + res),
    err => console.log('请求失败: ' + err)
)


function ajax (options) {
  let url = options.url
  const method = options.method.toLocaleLowerCase() || 'get'
  const async = options.async != false // default is true
  const data = options.data
  const xhr = new XMLHttpRequest()

  if (options.timeout && options.timeout > 0) {
    xhr.timeout = options.timeout
  }

  return new Promise ( (resolve, reject) => {
    xhr.ontimeout = () => reject && reject('请求超时')
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
          resolve && resolve(xhr.responseText)
        } else {
          reject && reject()
        }
      }
    }
    xhr.onerror = err => reject && reject(err)

    let paramArr = []
      let encodeData
      if (data instanceof Object) {
        for (let key in data) {
          // 参数拼接需要通过 encodeURIComponent 进行编码
          paramArr.push( encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) )
        }
        encodeData = paramArr.join('&')
      }

      if (method === 'get') {
        // 检测 url 中是否已存在 ? 及其位置
        const index = url.indexOf('?')
        if (index === -1) url += '?'
        else if (index !== url.length -1) url += '&'
        // 拼接 url
        url += encodeData
      }

      xhr.open(method, url, async)
      if (method === 'get') xhr.send(null)
      else {
        // post 方式需要设置请求头
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=UTF-8')
        xhr.send(encodeData)
      }
  } )
}
```

## 手写 Promise.all / Promise.race 
