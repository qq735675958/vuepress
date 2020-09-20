---
sidebar: auto
---

# 常用的 CSS 片段
## 清除浮动

```css
//清除浮动
.clearfix:after{    
    content: "\00A0";    
    display: block;    
    visibility: hidden;           
    width: 0;    
    height: 0;    
    clear: both;    
    font-size: 0;    
    line-height: 0;    
    overflow: hidden;
}
.clearfix{
    zoom: 1;
}   
```
## 垂直水平居中
### 绝对定位方式且已知宽高
margin值是宽高的一半
```css
position: absolute;
top: 50%;
left: 50%;
margin-top: -3em;
margin-left: -7em;
width: 14em;
height: 6em;
```
### 绝对定位＋未知宽高＋ translate
```css
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%,-50%);
```
### flex 轻松搞定水平垂直居中(未知宽高)
```css
display: flex;
align-items: center;
justify-content: center;
```

## 文本末尾添加省略号
### 宽度固定，适合单行显示
```css
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```
### 宽度不固定，适合多行以及移动端显示

```css
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
```
## 制造文本的模糊效果
```css
color: transparent;
text-shadow: 0 0 2pxrgba(0, 0, 0, 0.5);
```
## 动画实现简洁 loading 效果
```css
.loading:after {  
    display: inline-block;  
    overflow: hidden;  
    vertical-align: bottom;  
    content: "\2026";  
    -webkit-animation: ellipsis 2s infinite;
}
/* 动画部分 */
@-webkit-keyframes ellipsis {
  from {
    width: 2px;
  }
  to {
    width: 15px;
  }
}
```

## 自定义文本选中样式
```css
element::selection {
  color: green;
  background-color: pink;
}
element::-moz-selection {
  color: green;
  background-color: pink;
}
```
## 顶角贴纸效果
有时候我们会有这样的需求，在一个列表展示页面，有一些列表项是新添加的、或者热度比较高的，就会要求在其上面添加一个贴纸效果的小条就像 hexo 默认博客的 fork me on github 那个效果一样

```
html
<div class="wrap">
  <div class="ribbon">
    <a href="#">Fork me on GitHub</a>
  </div>
</div>

```
## css适配iPhoneX底部
1. 第一步：设置网页在可视窗口的布局方式
  新增 viweport-fit 属性，使得页面内容完全覆盖整个窗口：
```html
<meta name="viewport" content="width=device-width, viewport-fit=cover">
```
2. 第二步：页面主体内容限定在安全区域内
  这一步根据实际页面场景选择，如果不设置这个值，可能存在小黑条遮挡页面最底部内容的情况。
```css
body {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
```
3. 第三步：fixed 元素的适配
类型一：fixed 完全吸底元素（bottom = 0），比如下图这两种情况:

![fixed图片](https://img-blog.csdnimg.cn/20200121204011317.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NodW54aWFxaXVkb25nNQ==,size_16,color_FFFFFF,t_70)


```css
{
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
```
或者通过计算函数 calc 覆盖原来高度：
```css
{
  height: calc(60px(假设值) + constant(safe-area-inset-bottom));
  height: calc(60px(假设值) + env(safe-area-inset-bottom));
}
```
::: warning
注意，这个方案需要吸底条必须是有背景色的，因为扩展的部分背景是跟随外容器的，否则出现镂空情况。
:::
还有一种方案就是，可以通过新增一个新的元素（空的颜色块，主要用于小黑条高度的占位），然后吸底元素可以不改变高度只需要调整位置，像这样：
```css
{
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
}
```
空的颜色块：
``` css
{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: constant(safe-area-inset-bottom);
  height: env(safe-area-inset-bottom);
  background-color: #fff;
}
```

类型二：fixed 非完全吸底元素（bottom ≠ 0），比如 “返回顶部”、“侧边广告” 等
像这种只是位置需要对应向上调整，可以仅通过外边距 margin 来处理：
```css
{
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
}
```
或者
```css
{
  bottom: calc(50px(假设值) + constant(safe-area-inset-bottom));
  bottom: calc(50px(假设值) + env(safe-area-inset-bottom));
}
```
### 使用 @supports 隔离兼容样式
#### 你也可以使用 @supports 隔离兼容样式
写到这里，我们常见的两种类型的 fixed 元素适配方案已经了解了吧。如果我们只希望 iPhoneX 才需要新增适配样式，我们可以配合 @supports 来隔离兼容样式，当然这个处理对页面展示实际不会有任何影响：
```css
@supports (bottom: constant(safe-area-inset-bottom)) or (bottom: env(safe-area-inset-bottom)) {
  div {
    margin-bottom: constant(safe-area-inset-bottom);
    margin-bottom: env(safe-area-inset-bottom);
  }
}
```