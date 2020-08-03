# node

## node 支持高并发
1. node 单线程架构模型。（I/O线程） js代码运行在 V8 上，是单线程

  - 单线程优势：省去线程切换开销；线程同步，无线程冲突
  - 单线程劣势：无法充分利用 cpu 资源；崩溃就挂了；cpu 被占用，后续将无响应（PM2管理进程）


2. 事件循环机制（重点是 node 事件循环的差异）
nodejs 异步非阻塞，故能抗住高并发

- 阻塞： 等待调用结果时，线程挂起，不往下执行
- 非阻塞： 与之相反，线程继续往下执行

### node 的事件循环机制
细分为6个阶段

1. timers   定时器回调
2. pending  系统回调
3. idle, prepare
4. poll     (IO回调)
5. check    setImmediate() 回调
6. close    socket 的 close 事件回调


*process.nextTick*
事件优先级高于其他微队列时间


深度欠缺

服务端渲染



