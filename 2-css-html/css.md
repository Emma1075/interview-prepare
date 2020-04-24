## 定位

### position
6个 position 的属性值
- static 默认。正常文档流。
- relative     相对定位。相对于之前正常文档流位置发生偏移， 原先的位置仍被占据。
- absolute  绝对定位。不再占据文档流。相对于包含块进行偏移（包含块：最近一级外层元素 position != static 的元素）
- fixed     不再占据文档流。相对于视窗定位
- sticky    粘性定位（css3新增）。相当于 relative + fixed
- inherit   继承

### 尺寸
- 百分比
- rem   html 的 font-size
- em: 相对于父元素的 font-size （不常用，计算麻烦）

### 盒子模型
每个元素都会形成一个矩形块，主要包括四部分
margin + border + pading + content

有两种不同的盒子模型（width 不同）
1. 标准盒子模型（w3c）
    - width = content 宽
    - `box-sizing:content-box`

2. IE 盒子
    - width = border + padding + content
    - `box-sizing:border-box`

### 根据盒模型解释边距重叠/BFC原理(BFC 渲染规则)
1. BFC 垂直方向的边距会重叠
2. BFC 区域不与浮动元素的box重叠  （用于清除浮动）
3. BFC 是一个独立的容器，里面和外面的元素互不影响
4. 计算 BFC 高度时，浮动元素也会计算在内

如何创建 BFC
1. float 值不为 null；（只要创建了浮动 ，就有 BFC 了）
2. position 的值不为 static/relative 时
3. display table相关
4. overflow: 不为invisible


### 清除浮动
为什么要清除浮动？
> 浮动元素脱离了文档流，会造成父元素高度塌陷

清除浮动原理
> BFC 清除浮动： BFC 块级排版上下文，默认情况下只有根元素（body）一个块级上下文，但如果一个块级元素设置了 `float:left || overflow: hidden/auto || position: absolute` 样式， 就会为这个块级上下文生成一个独立的块级上下文。
>
> 独立的块级上下文可以包裹浮动流，全部浮动子元素也不会引起容器高度塌陷。包含块会把浮动元素的高度也计算在内。
>
>可以简单理解为：只要触发了 BFC， 就能清除浮动。 

#### BFC 触发方式：

1. `float`；
2. `overflow` 不为` visible`；
3. `display: table-cell/table-caption/inline-block`
4. `position: fixed/absolute`

#### 清除浮动方式
1. 在浮动元素后面新增一个空div标签，设置 `clear: both`. 不推荐，增加额外标签，语义化差
2. 在父容器元素上设置 `overflow: auto`
3. 利用伪元素

```css
    .clearfix:before,
    .clearfix:after {
        content: '.';
        display: block;
        height: 0;
        visibility: hidden;
        clear: both;
    }

    /* 改进 */
    .clearfix:before,
    .clearfix:after {
        content: ' ';
        display: table;
    }
    .clearfix:after {
        clear: both;
    }
```

---

###  JS如何设置获取盒模型对应的宽高

- `dom.style.width/height`;                     => 只能获取内联样式的属性
- `dom.currentStyle.width/height`;              => 浏览器渲染后的宽高；但只有IE支持
- `window.getComputedStyle(dom).width/height`;  => 通用性更好，与 2 相比
- `dom.getBoundingClientRect()/width/height`    => 常用与计算元素的绝对位置


## layout
### 两栏布局
1. 左侧定宽， 右侧自适应

- 左侧： float: left
- 右侧： margin-left

2. position：absolute
```css
.wraper {
    position: relative;
}

.side {
    position: absolute;
    left: 0;
    width: 200px;
}

.main {
    position: absolute;
    left: 210px;
    width: 100%;
}
```

### 三栏布局
两边定宽，中间自适应
1. flex
```css
.wraper {
    display: flex;
}

.left,.right {
    width: 200px;
    background-color: powderblue;
}

.center {
    flex: 1;
}
```

2. float 与 margin
但 main 要写在最后

```html
<div class="wraper">
    <div class="left"></div>
    <div class="right"></div>
    <div class="main"></div>
</div>
```

```css
.left {
    float: left;
    width: 200px;
}
.right {
    float: right;
    width: 300px;
}
.main {
    width: 100%;
    margin-left: 210px;
    margin-right: 310px;
}
```

3. position: absolute(左右) + margin（中间）

```css
.wraper {
    position: relative;
}

.right {
    position: absolute;
    width: 300px;
    top: 0;
    right: 0;
}

.left {
    position: absolute;
    width: 200px;
    top: 0;
    left: 0
}

.main {
    width: 100%;
    margin-left: 210px;
    margin-right: 310px;
}
```

优势： 可以优先渲染 main 内容

4. float + BFC 圣杯布局

- 三者都设置向左浮动。
- 设置main宽度为100%。
- 设置 负边距，sub设置负左边距为100%，extra设置负左边距为负的自身宽度。
- 设置 wrapper 的 padding 值给左右两个子面板留出空间。
- 设置两个子面板为相对定位，sub的left值为负的sub宽度，extra的right值为负的extra宽度。

```html
<div class="wrapper">
    <div class="main"></div>
    <div class="sub"></div>
    <div class="extra"></div>
</div>
```
圣杯布局有个问题，当面板的main部分比两边的子面板宽度小的时候，布局就会乱掉

5. 双飞翼布局
- 三者都设置左浮动
- 设置 main 宽度为 100%
- 设置 负边距，sub 设置左负边距 100%， extra 设置左负边距为负的自身宽度
- 设置 main-content 的 margin 值 给左右两个子面板流出空间

比较双飞翼布局与圣杯布局
- 圣杯布局没有多余的标签
- 圣杯布局通过先给父元素设置 padding，再分别给 sub 和 extra 设置相对定位
- 双飞翼布局多一个 main-container 标签
- 双飞翼布局无需给 sub 和 extra 设置相对定位，只要给 main-container 设置 margin 即可






