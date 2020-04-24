let arr = [1, 33, 23, 45, 234, 452]

/** 冒泡排序
* 挨个对比，若比右边数字大，则交换位置，遍历一次，最大的在右边，重复步骤
* !复杂度 O(n^2) 
* !稳定性: 稳定
*/
function bubleSort(arr) {
  // let k = 0
  let i, j
  let len = arr.length
  for (i = 0; i <= len; i++) {
    for (j = i + 1; j < len; j++) {
      // 提前退出
      if (arr[i] === arr[j]) {
        return
      }
      if (arr[i] > arr[j]) {
        [ arr[i], arr[j] ] = [ arr[j], arr[i] ]
      }
      // k++
    }
  }
  // console.log(k)
  return arr
}

bubleSort(arr)


/** 插入排序
* 类似于冒泡，并非挨个交换，而是在一个有序数组里，插入一个元素后，使之依然有序
* !复杂度 O(n^2) 
* !稳定性: 稳定
*/
function insertSort(arr) {
  // let k = 0
  let i, j
  let len = arr.length
  for (i = 1; i <= len; i++) {
    for (j = i; j >= 0; j--) {
      if (arr[i] > arr[j]) {
        [ arr[i], arr[j] ] = [ arr[j], arr[i] ]
      } else {
        break
      }
      // k++
    }
  }
  // console.log(k)
  return arr
}

/** 快速排序 （有二分思想）
* 找一个标志位，先遍历一遍，所有小于ta的，放在左边；所有大于ta的，放在右边
* 遍历一次，就把数组分为两部分。然后遍历两边的数组，递归执行相同逻辑
* !复杂度 O(nlogn) 
* !稳定性: 稳定
*/
function quickSort(arr) {
  // let k = 0
  if (arr.length <= 1) {
    return arr
  }

  let left = []
  let right = []
  let current = arr.shift() // 取出第一位后，数组长度-1
  let len = arr.length
  let i
  for (i = 0; i < len; i++) {
    if (arr[i] < current) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  // console.log(k)
  return quickSort(left).concat(current, quickSort(right))
}

/** 快速排序优化 （原地快排, 不占用额外空间）
* 找两个指针，两个往中间遍历, 如果 l > r, 则 l 与 r 互换位置
* 直到 l === r
* !复杂度 O(nlogn) 
* !稳定性: 稳定
*/
function quickSort2(arr, leftFlag = 0, rightFlag = arr.length - 1) {
  if (leftFlag >= rightFlag) {
    return arr
  }
  let l = leftFlag
  let r = rightFlag
  let current = arr[l]
  while (l < r) {
    // 从右边找比 current 小的
    if (current <= arr[r]) {
      r--
    }
    arr[l] = arr[r]

    // 从左边找比 current 大的
    if (arr[l] <= current) {
      l++
    }
    arr[r] = arr[l]
  }
  return arr
}

// 