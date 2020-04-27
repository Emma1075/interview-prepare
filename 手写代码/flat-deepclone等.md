## 手写 flat

```js
function flat(arr) {
  const isDeep = arr.some(item => item instanceof Array)
  if (!isDeep) {
    return arr
  }
  const res = Array.prototype.concat.apply([], arr)
  return flat(res)
}

flat([1, [3,4], [5, [6, 7]]]) // [1,2,3,4,5,6,7]
```

## 手写深拷贝

```js
// ！解决环问题
// WeakMap: 弱引用对象
function deepClone(obj = {}, hash = new WeakMap()) {
  // 需要拷贝时，先去存储空间找，有没有拷贝过这个对象，如果有直接返回，没有再继续拷贝 => 化解循环引用问题
  if (hash.has(obj)) {
    return hash.get(obj)
  }
  
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  // 对象 or 数组
  let result = Array.isArray(obj) ? [] : {}
  hash.set(obj, result)

  const isObj = (obj) => {
    return (typeof obj === 'object' &|| typeof obj === 'function') && obj !== null
  }

  for (let key in obj) {
    result[key] = isObj(obj[key]) ? deepClone(obj[key]) : obj[key]
  }
  return result
}

```