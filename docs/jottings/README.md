# react hooks
---
## useState

1. 基本使用
```
import { useState } from "react";
function App() {
  // 数组里的第一项是sate里的变量，第二项是修改state的函数
  // useState里的值就是count的初始值
  const [count, setCount] = useState(0);
  const add = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <div>{count}</div>
      <div>
        <button onClick={add}>+1</button>
      </div>
    </div>
  );
}
ReactDOM.render(<App />, document.querySelector("#root"));
```
等价于
```
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0
    };
  }
  setCount = () => {
    this.setState({
      count: this.state.count + 1
    });
  };
  render() {
    return (
      <div>
        <div>{this.state.count}</div>
        <button onClick={this.setCount}>+1</button>
      </div>
    );
  }
}
```
2. 复杂的state
```
import React,{useState} from 'react';

function Home(){
    const [user, setUser] = useState({
        name: "lifa",
        age: 18,
        habits: ["123", "明星"]
    });

    const addHabit = () => {
        // user 不能直接写，必须要结构出来，重新引用
        setUser({
            ...user,
            name:'121',
            age:12321,
            habits:[...user.habits,'歌手']
        })
    }

    return(
        <div>
            <p>姓名:{user.name}</p>
            <p>年龄:{user.age}</p>
            <div className="">
                爱好:
                    {
                        user.habits && user.habits.map((item,index)=>{
                            return(
                                <span key={index} className="mar-15">{item}</span>
                            )
                        })
                    }
            </div>
            <button onClick={addHabit}>添加爱好</button>
        </div>
    )
}
export default Home;
```
3.使用状态
```
const [n,setN] = React.useState(0)
const [user, setUser] = React.useState({name: 'F'})
```
3. 注意事项
1). 如果state是一个对象，我们不能对对象里的部分属性setState，需要我们每次都把之前的属性全部重新结构一遍，然后下面再写你要修改的属性
```
// 错误代码
const [user,setUser] = useState({name:'lifa', age: 18})
const onClick = ()=>{
    setUser({
      name: 'Jack'
    })
  }

//正确代码
setUser({
   ...user,
   name: 'Jack'
 })
```
2). 地址要变
setState(obj)如果obj地址不变，那么React就认为数据没有变化
```
// 错误代码
const [user,setUser] = useState({name:'lifa', age: 18})
const onClick = () => {
  // 在原来的引用地址上修改name属性，不会起作用
  user.name = 'jack'
  setUser(user)
}

// 正确代码
const [user,setUser] = useState({name:'lifa', age: 18})
const onClick = () => {
  // 重新生成一个引用地址
  setUser({
    ...user,
    name: 'jack'
  })
}
```
3). useState只能放在函数组件内部，不能单独拿出来
4. useState可以接受函数
```
const [state, setState] = useState(()=>{
  return initialState
})
```
该函数返回初始state, 且只执行一次

5. setState可以接受函数
我们如果要多次对useState进行操作的话推荐使用函数
以两次修改useState对其进行加一操作为例
```
const [n,setN] = useState(1)
const onClick = () => {
  setN(n+1)
  setN(n+1)
}
```
上面我们在点击事件里执行了两次修改n，每次让他加一，可实际上他只会变一次，因为n本身是不会变的，而是每次生成一个新的n，所以上面结果是2而不是3，如果想要它加2的话就要用函数
```
setN(i=>i+1)
setN(i=>i+1)
```
上面的i是一个占位符，随便什么都可以，就是我们传一个值给setN，每次返回当前的值+1，所以最后会加2，得到的结果是3
