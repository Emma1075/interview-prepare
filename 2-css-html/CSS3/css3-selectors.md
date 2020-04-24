
## 常见选择器
基本选择器和选择器分组

css3 新增
- `E[attr^=val]`    以 val 开头
- `E[attr$=val]`    以 val 结尾
- `E[attr*=val]`    包含 val
- `E ~ F`   所有紧跟在 E 元素之后的 F 元素

## 伪类和伪元素
### 伪类
仅1非 CSS3，2，3，4，5均是CSS3新增
1. 动态伪类    `:link`  `:visited`  `:hover`    `:active`   `:focus`
2. 目标伪类     `:target`
3. 语言伪类     `:lang(val)`
4. UI元素状态伪类     `:enabled`  `:disabled`   `:checked`
5. 结构性伪类
    - `:root`
    - `:nth-child(n)`
    - `:nth-last-child(n)`
    - `:nth-of-type(n)`
    - `:nth-last-of-type(n)`
    - `:first-child`
    - `:last-child`
    - `:first-of-type`
    - `:last-of-type`
    - `:only-child`
    - `:only-pf-type`
    - `:emply`
6. 否定伪类     `:not(s)`
注意区别 `:nth-child(n)` 与 `:nth-of-type(n)`

```html
<ul>
    <span>标题</span>
    <li>项目1</li>
    <li>项目2</li>
    <li>项目3</li>
</ul>
```
```css
li:nth-child(2) {
    background-color: red;
}

li:nth-of-type(2) {
    background-color: orange;
}
```

项目1 背景色：red
项目2 背景色： orange

### 伪元素
这三个都不是 css3 新增
- `::first-line`
- `::first-letter`
- `::before`        content不能为空
- `::after`         content不能为空
    
## 优先级和权重

### 权重4级别
- 内联样式              1，0，0，0
- ID 选择器            0，1，0，0
- Class、伪类、属性选择器           0，0，1，0
- 元素、伪元素                    0，0，0，0

但注意：不会发生进位。11个 class 选择器不会超过一个 id选择器权重