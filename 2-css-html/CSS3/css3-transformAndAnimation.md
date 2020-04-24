# css3 动效 
## 转换  transform 
### 移动 translate
- translate(x,y): 定义 2D 位移转换。
    - x: 表示相对于原位置的 X 轴偏移距离
    - y: 可选参数。默认值为0
- transtate3d(x,y,z): 3D 位移转换。
    - z: 表示沿Z轴位移向量长度。值越大表示里观看者远近，元素就越大
- translateX(x): => translate(x,0)  
- translateY(y): => translate(0,y)
- translateZ(z): => translate3d(0,0,z)  

### 缩放 scale
- scale(x,y): 2d 缩放。默认值为1，大于1 时放大，小于 1 时缩小
- scale3d(x,y,z): 3d 缩放。单独使用 scale3d 看不出效果，需要配合其他变形函数一起使用
- scaleX(x) => scale3d(x,1)
- scaleY(y) => scale2d(1,y)
- scaleZ(z) => scale3d(1,1,z)

### 旋转 rotate
- rotate(angle) : 2d 旋转。angle 单位有角度、梯度、弧度和圈。参数为正数表示顺时针旋转
- rotate3d(x,y,z,angle) : 3d 旋转。 x,y,z 表示元素旋转的是两只，取值为0-1的浮点数
- rotateX(angle) => rotate3d(1,0,0,angle) 沿 X 轴旋转
- rotateY(angle) => rotate3d(0,1,0,angle) 沿 Y 轴旋转
- rotateZ(angle) => rotate3d(0,0,1,angle) 沿 Z 轴旋转


### 倾斜 skew
- skew(x-angle,y-angle): 2d 倾斜转换（扭曲）
- skewX(x-angle) => skew(x-angle, 0deg);
- skewY(y-angle) => skew(0deg,y-angle)


### 其他

- matrix
- marix3d
- perspective(n)

## 过渡 transition



## 动画 animation









