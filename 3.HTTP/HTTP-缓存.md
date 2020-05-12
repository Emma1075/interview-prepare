# HTTP 强缓存和协商缓存

强缓存和协商缓存

强缓存不过服务器，协商缓存需要过服务器，协商缓存返回的状态码是304。两类缓存机制可以同时存在，强缓存的优先级高于协商缓存。当执行强缓存时，如若缓存命中，则直接使用缓存数据库中的数据，不再进行缓存协商。

强缓存：Expires(HTTP1.0)， Cache-Control(HTTP1.1)
协商缓存：Last-Modified， Etag

HTTP 为我们提供了很好几种缓存的解决方案，不妨总结一下：

## 1. expires
`expires: Thu, 16 May 2019 03:05:59 GMT`
在 http 头中设置一个过期时间，在这个过期时间之前，浏览器的请求都不会发出，而是自动从缓存中读取文件，除非缓存被清空，或者强制刷新。缺陷在于，服务器时间和用户端时间可能存在不一致，所以 HTTP/1.1 加入了 cache-control 头来改进这个问题。

## 2. cache-control
cache-control: max-age=31536000
设置过期的时间长度（秒），在这个时间范围内，浏览器请求都会直接读缓存。当 expires 和 cache-control 都存在时，cache-control 的优先级更高。

## 3. last-modified / if-modified-since
这是一组请求/相应头
响应头：
`last-modified: Wed, 16 May 2018 02:57:16 GMT`

请求头：
if-modified-since: Wed, 16 May 2018 05:55:38 GMT
服务器端返回资源时，如果头部带上了 last-modified，那么资源下次请求时就会把值加入到请求头 if-modified-since 中，服务器可以对比这个值，确定资源是否发生变化，如果没有发生变化，则返回 304。

## 4. etag / if-none-match
这也是一组请求/相应头

响应头：
`etag: "D5FC8B85A045FF720547BC36FC872550"`

请求头：
`if-none-match: "D5FC8B85A045FF720547BC36FC872550"`
原理类似，服务器端返回资源时，如果头部带上了 etag，那么资源下次请求时就会把值加入到请求头 `if-none-match` 中，服务器可以对比这个值，确定资源是否发生变化，如果没有发生变化，则返回 304。

上面四种缓存的优先级：`cache-control > expires > etag > last-modified`

---


### 缓存场景

对于大部分的场景都可以使用强缓存配合协商缓存解决，但是在一些特殊的地方可能需要选择特殊的缓存策略

- 对于某些不需要缓存的资源，可以使用 Cache-control: no-store ，表示该资源不需要缓存
- 对于频繁变动的资源，可以使用 Cache-Control: no-cache 并配合 ETag 使用，表示该资源已被缓存，但是每次都会发送请求询问资源是否更新
- 对于代码文件来说，通常使用 Cache-Control: max-age=31536000 并配合策略缓存使用，然后对文件进行指纹处理，一旦文件名变动就会立刻下载新的文件
