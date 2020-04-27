
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

## promise.all



## promise.race




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