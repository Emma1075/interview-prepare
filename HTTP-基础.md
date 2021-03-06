# HTTP

! 加强http的学习

## 详细介绍下TCP三次握手机制？为什么是3次？
1. tcp有可靠性


## HTTP 协议的主要特点
简单快速；灵活；无连接；无状态

### 哪些协议
UTD

## HTTP 报文的组成部分
1. 请求报文
    - 请求行：http 方法；页面地址；http 协议 及版本
    - 请求头：一些 key-value值，告诉服务端需要的东西
    - 空行
    - 请求体

2. 响应报文
    - 状态行： http协议及版本； 状态码
    - 响应头
    - 空行
    - 响应体

## HTTP 方法
- GET       获取资源
- POST      传输资源
- PUT       更新资源
- DELETE    删除资源
- HEAD      获得报文首部

## POST 和 GET 的区别
* 1. GET 在浏览器回退时无害， POST 会再次提交请求
  2. GET 产生的 URL 地址可以被收藏， POST 不行
* 3. GET 请求会被浏览器储存缓存， POST 不会，除非手动设置
  4. GET 只能 url 编码， POST 支持多种编码方式
* 5. GET 请求参数会被完整保存在浏览器历史记录里，POST 不会
* 6. GET 请求在 URL 传送的参数有长度限制
* 7. GET 参数通过 URL 传递， POST 放在 Request body 中


### 在以下情况下 用 POST
1. 更新服务器上的文件或数据库
2. 向服务器发送大量数据
3. 发送包含未知字符的用户输入， post 更稳定可靠 


## HTTP 状态码
- 1xx: 指示信息         - 表示请求已接收，继续处理
- 2xx: 成功            - 表示请求已成功接受
- 3xx: 重定向           - 要完成请求必须进行更进一步的操作
    - 301 moved permanently 请求的页面已经转移至新的 url
    - 302 请求的页面已经临时转移至新的 url
    - 304 not modified 客户端有缓冲的文档并发出了一个条件性的请求，服务器告诉客户，原来缓冲的文档还能用

- 4xx: 客户端错误        - 请求有语法错误或请求无法实现
    - 400 Bad Request 客户端请求有语法错误，不能被服务器所理解
    - 401 请求未经授权
    - 403 Forbidden 被请求页面的访问被禁止（资源禁止被访问）
    - 404 请求资源不存在

- 5xx: 服务器错误        - 服务器未能实现合法的请求
    - 500 Internal Server Error 服务器发生不可预期的错误，原来缓冲的文档还可以继续使用
    - 503 请求未完成，服务器临时过载或当机


## 持久连接
HTTP 协议采用"请求-应答" 模式，当使用普通模式，即非 Keep-Alive 模式时， 每个请求/应答客户和服务器都要新建一个连接，完成之后断开；

当使用 Keep-Alive 模式（持久连接，连接重用）时， Keep-Alive 功能使客户端到服务器端的连接持续有效，当出现对服务器的后继请求时， Keep-Alive 功能避免了建立或重新建立连接

版本支持条件： 1.1版本才支持持久连接

## 管线化
工作原理：将请求响应打包回来

特点：
1. 管线化机制通过持久连接完成，仅 HTTP/1.1 支持此技术
2. 只有 GET 和 HEAD 请求可以进行管线化， POST 有限制
3. 初次创建连接时不应启动管线机制，因为对方（服务器） 不一定支持 HTTP/1.1 版本协议

## http2



