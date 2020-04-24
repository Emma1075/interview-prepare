# 移动端常用布局
Media Query ; flex; rem

## 静态布局
又名：固定宽度布局。
- PC端： 960px
- 移动端：320px

### 静态布局在移动端的自适应
#### 整体缩放
适合：营销页面

1. 加载过程中要监听`resize`事件，开发者以 320px 作为基础宽度
2. 在缩放节点上添加 `transform-origin` 属性，保证缩放从原点开始



### 媒体查询
适合：展示型页面

1. 将不需要根据屏幕变化的属性放到媒体查询外
2. 设置好媒体查询断点

## 水平居中与垂直居中
### 水平居中
- 行内元素：`text-align: center`
- 块级元素（有固定宽度）,两种方式
```css
.block {
    width: 800px;
}
.block-center1 {
    margin: auto
}

.block-center2 {
    position: absolute;
    left: 50%;
    margin-left: -400px;
}
```

- 块级元素（无固定宽度）：利用 css3 变形属性 transform 完成
```html
<style>
/* 关键代码 */

.wrap {
    position: relative;
}

.content {
    position: absolute;
    left: 50%;
    transform: translateX(50%);
}

</style>

<body>
<div class="wrap">

    <div class="item">
        <i></i>
        <div class="content">内容1</div>
    </div>
    <div class="item">
        <i></i>
        <div class="content">我是内容2</div>
    </div>
</div>
</body>
```

### 垂直居中
#### 行内元素的垂直居中
- 单行文本：`height: 40px;line-heigh: 40px`
- 多行文本
    - 不固定高度：设置 padding 即可
    - 固定高度：通过 `display:table` 与 `vertical-align:middle` 实现

```html
<style>
/* 父容器固定高度，设置 display:table */
.wrap {
    display: table;
    height: 300px;
}

/* 子容器设置 display:table-cell 及 vertical-align:middle */
.content {
    display: table-cell;
    width: 400px;
    vertical-align: middle;
    border: 2px solid #ccc;
}

</style>

...

<div class="wrap">
<div class="content">
    asdfjsldfkjasdklfj
    sdfadfasdgfdgffdg
    dsfgsdfgsdfgsdfg
    fdgsdfgsdfgsdfg
    sdfgsdfgsdgfdgdfsg
    dfsgdsfgdsfgdsfgdfg
</div>
</div>

```

#### 块级元素的垂直居中
1. 固定高度
    - 利用 position:absolute + margin-top负值 即可
    
2. 自适应高度
    - 利用 css3 变形属性 transform 完成
    
```css

.content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%)
    
}
```

#### 基于视口
```css
.content {
    margin: 0 auto;
    margin-top: 50vh;
    transfrom: translateY(-50%);
    width: 200px;
    border: 2px solid lightcoral;
}
```

缺点：只适用于在视口居中的场景，不常用


#### 利用 flex
flex ：目前推荐的最佳解决方案。PC 端有兼容性问题，移动端完全可用。

```css
.wrap {
    display: flex;
    min-height: 100vh; 
    margin: 0;
}

.content {
    margin: auto;   /* 使用 flexbox 时， margin设置为 auto 不仅水平居中，垂直也居中 */
}
```

## 栅格系统实现响应列表



## 水平居中与垂直居中
### 水平居中
- 行内元素：`text-align: center`
- 块级元素（有固定宽度）,两种方式
```css
.block {
    width: 800px;
}
.block-center1 {
    margin: auto
}

.block-center2 {
    position: absolute;
    left: 50%;
    margin-left: -400px;
}
```

- 块级元素（无固定宽度）：利用 css3 变形属性 transform 完成
```html
<style>
/* 关键代码 */

.wrap {
    position: relative;
}

.content {
    position: absolute;
    left: 50%;
    transform: translateX(50%);
}

</style>

<body>
<div class="wrap">

    <div class="item">
        <i></i>
        <div class="content">内容1</div>
    </div>
    <div class="item">
        <i></i>
        <div class="content">我是内容2</div>
    </div>
</div>
</body>
```

### 垂直居中
#### 行内元素的垂直居中
- 单行文本：`height: 40px;line-heigh: 40px`
- 多行文本
    - 不固定高度：设置 padding 即可
    - 固定高度：通过 `display:table` 与 `vertical-align:middle` 实现

```html
<style>
/* 父容器固定高度，设置 display:table */
.wrap {
    display: table;
    height: 300px;
}

/* 子容器设置 display:table-cell 及 vertical-align:middle */
.content {
    display: table-cell;
    width: 400px;
    vertical-align: middle;
    border: 2px solid #ccc;
}

</style>

...

<div class="wrap">
<div class="content">
    asdfjsldfkjasdklfj
    sdfadfasdgfdgffdg
    dsfgsdfgsdfgsdfg
    fdgsdfgsdfgsdfg
    sdfgsdfgsdgfdgdfsg
    dfsgdsfgdsfgdsfgdfg
</div>
</div>

```

#### 块级元素的垂直居中
1. 固定高度
    - 利用 position:absolute + margin-top负值 即可
    
2. 自适应高度
    - 利用 css3 变形属性 transform 完成
    
```css

.content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%)
    
}
```

#### 基于视口
```css
.content {
    margin: 0 auto;
    margin-top: 50vh;
    transfrom: translateY(-50%);
    width: 200px;
    border: 2px solid lightcoral;
}
```

缺点：只适用于在视口居中的场景，不常用


#### 利用 flex
flex ：目前推荐的最佳解决方案。PC 端有兼容性问题，移动端完全可用。

```css
.wrap {
    display: flex;
    min-height: 100vh; 
    margin: 0;
}

.content {
    margin: auto;   /* 使用 flexbox 时， margin设置为 auto 不仅水平居中，垂直也居中 */
}
```