### 选择排序

```js
function selectSort(arr) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    // 寻找 [i, len) 里的最小值
    let minIdx = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j
      }
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
  }
}
```

### 快速排序 

[资料](https://segmentfault.com/a/1190000009426421)

- 先从数列中取出一个数作为“基准”。
- 分区过程：将比这个“基准”大的数全放到“基准”的右边，小于或等于“基准”的数全放到“基准”的左边。
- 再对左右区间重复第二步，直到各区间只有一个数

```js
var quickSort = function(arr) {
  // debugger
  const len = arr.length
  if (len <= 1) {
    return arr
  }
  const mIdx = Math.floor(len / 2)
  // 取中间值，splice 改变原数组，length 减少1
  const mid = arr.splice(mIdx, 1)[0]
  const left = []
  const right = []
  for (let i = 0; i < len - 1; i++) {
    if (arr[i] < mid) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([mid], quickSort(right))
}
```

### 找出数组中重复元素

new Set 方法、obj key唯一性方法、arr.indexOf方法

算法思维（不使用原生数组方法）

给定数组arr中，有且仅有一个重复元素

```js
// input [2, 32, 22, 23, 32, 122]
// output 32
function findRepeat(arr) {
  // 
}
```
set 添加、取元素