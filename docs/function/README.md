---
sidebar: auto
---

# 常用的 JavaScript 片段


## 数据脱敏
### 身份证脱敏
```js
export const dataMask_IdentityCard = (value) => {
    if (!value) return ''
    return `${value.substr(0, 6)}********${value.substr(14, 4)}`
}
```

### 手机号脱敏
```js
export const dataMask_Mobile = (value) => {
  if (!value) return ''
  return `${value.substr(0, 3)}****${value.substr(8, 4)}`
}
```

### 姓名脱敏
```js
export const dataMask_Name = (value) => {
  if (!value) return ''
  return `${value.substr(0, 1)}*`
}
```

## 数据格式化
### 时间格式化
```js
/*
 *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
export function format(time, fmt = 'YYYY-MM-DD') {
  if (!time) return ''
  var _this = new Date(time)
  var o = {
    'M+': _this.getMonth() + 1, // 月份
    'D+': _this.getDate(), // 日
    'h+': _this.getHours(), // 小时
    'm+': _this.getMinutes(), // 分
    's+': _this.getSeconds(), // 秒
    'q+': Math.floor((_this.getMonth() + 3) / 3), // 季度
    'S': _this.getMilliseconds() // 毫秒
  }
  if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (_this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
```

### 金额格式化
1639545.43 ->  1,639,545.43
```js
export const formatAmount = (value) => {
  if (!value && value !== '0' && value !== 0 || value === ' ') {
      return value
  }
  if (!isNaN(Number(value))) {
      const num = parseFloat(value)
      return num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  } else {
      return value
  }
}
```

## 数据合法性校验
###  验证手机号
```js
export const isMobile = (value) => {
  const reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/
  return reg.test(value)
}
```

### 验证密码
```js
export const isPassword = (value) => {
  const reg = /^[a-zA-Z0-9]{6,18}$/
  return reg.test(value)
}
```

### 验证支付密码
```js
export const isPayPwd = (value) => {
  const reg = /^[0-9]{6}$/;
  return reg.test(value)
}
```

### 验证邮箱
```js
export const isEmail = (value) => {
  const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*(;\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*$/
  return reg.test(value)
}
```

### 合法url
```js
export const isURL = (value) => {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(value)
}
```



## 文件下载
### 以url方式下载
```js
import { saveAs } from 'file-saver'

/**
 * 以URL地址形式下载文件
 * @param url
 */
export function downloadFileByURL(url, fileName = 'dowmload') {
  getBlob(url).then(blob => {
    saveAs(blob, fileName)
    // 另一种下载文件流方法
    // const a = document.createElement('a')
    // a.href = window.URL.createObjectURL(blob)
    // a.download = fileName
    // a.click()
  })
  return false
}
function getBlob(url) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response)
      }
    }
    xhr.send()
  })
}
```

### iframe标签方法下载
```js
  let downloadFileUrl = "http://localhost:3000"
  let elemIF = document.createElement("iframe");
  elemIF.src = downloadFileUrl;
  elemIF.style.display = "none";
  document.body.appendChild(elemIF);
```

### 以二进制流方式下载
```js
/**
 * 以文件流的形式下载文件
 * @param data        文件流对象
 * @param type        application 参数
 * @param fileName    文件名 不传自动获取
 */

export function downloadFileByBlob(data, type="application/vnd.ms-excel", fileName) {
    let blob = new Blob([data], {type: `application/${type};charset=utf-8`});
    // 获取heads中的filename文件名
    let downloadElement = document.createElement('a');
    // 创建下载的链接
    let href = window.URL.createObjectURL(blob);
    downloadElement.href = href;
    // 获取文件名
    const content = req.getResponseHeader('Content-Disposition');
    const reqFileName = content && content.split(';')[1].split('filename=')[1];
    // 下载后文件名
    downloadElement.download = fileName || reqFileName;
    document.body.appendChild(downloadElement);
    // 点击下载
    downloadElement.click();
    // 下载完成移除元素
    document.body.removeChild(downloadElement);
    // 释放掉blob对象
    window.URL.revokeObjectURL(href);
}
  
```

## 环境判断
### 是否是pc浏览器
```js
export function isPc() {
  let userAgentInfo = navigator.userAgent;
  let Agents = ["Android", "iPhone", "iPad", "iPod"];
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag
}
```

### 是否Android
```js
export function isAndroid() {
  let u = navigator.userAgent;
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;  // android终端
}
```

## 其他常用
### 复制文本
```js
export const copyText = (text) => {
  var element = $("<textarea>" + text + "</textarea>");
  $("body").append(element);
  element[0].select();
  document.execCommand("Copy");
  element.remove();
}
```

### 获取url query中指定name的value
```js
/**
 * 获取url query中指定name的value
 * @param {String} url
 * @param {String} name
 */
export function getUrlQuery(name, url) {
  //   name = name.toLowerCase()
    url = url || window.location.href
  //   url = url.toLowerCase()
    const reg = new RegExp(`(&|\\?)${name}=([^&]*)(&|$)`)
    const r = url.match(reg)
    if (r != null) {
      return r[2]
    }
    return null
  }
```
## 函数防抖和节流
### 防抖
#### 短时间内多次触发同一事件，只执行最后一次，或者只执行最开始的一次，中间的不执行。
```js
  export function debounce(func, wait) {
    let timer;
    return function() {
      let context = this; // 注意 this 指向
      let args = arguments; // arguments中存着e
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args)
      }, wait)
    }
  }
```
### 节流
#### 连续触发事件但是在 n 秒中只执行一次函数。即 2n 秒内执行 2 次... 。节流如字面意思，会稀释函数的执行频率。
```js
  export function throttle(func, wait) {
      let previous = 0;
      return function() {
        let now = Date.now();
        let context = this;
        let args = arguments;
        if (now - previous > wait) {
          func.apply(context, args);
          previous = now;
        }
      }
  }
```
## 去重
### 数组去重
#### 移除数组中重复的元素
```
const filterNonUnique = arr => [ …new Set(arr)];
```
### 数组对象去重
#### 移除数组中重复的元素
```
let person = [
     {id: 0, name: "小明"},
     {id: 1, name: "小张"},
     {id: 2, name: "小李"},
     {id: 3, name: "小孙"},
     {id: 1, name: "小周"},
     {id: 2, name: "小陈"},  
];

let obj = {};
person = person.reduce((cur,next) => {
    obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
    return cur;
},[])
```
## 扁平化数组
### 扁平化多维数组
```js
  let flattened = [[0, 1], [2, 3], [4, 5]].reduce(function(a, b) {
      return a.concat(b);
  }, []);
  // [0,1,2,3,4,5]
```


