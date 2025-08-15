# reactl
learn log for react

## useReducer

useReducer(reducer,  initVale, initFunc)

没有`initFunc`的话，默认值就是`initValue`，否则初始值就是经过`initFunc`处理完成的函数。

```tsx
import { useReducer } from "react";

interface State {
    count: number;
    name: string;
}

interface Action {
    type: string;
}

export default function App() {
    const reducer = (state: State, action: Action) => {
        switch (action.type) {
            case "add":
                return {...state, count: state.count + 1}
            case "sub":
                return {...state, count: state.count - 1}
            default:
                return state;	
        }
    }
    
    const [state, dispatch] = useReducer(reducer, {count: 0, name: "Astraca"});
    
    return(
        <div>
        	<h3>当前数字：{state.count}</h3>
            <h3>当前名字：{state.name}</h3>
            <button onClick={() => dispatch({type: "add"})}>+ 1</button>
            <button onClick={() => dispatch({type: "sub"})}>- 1</button>
        </div>
    )
}
```

 



## useImmer

是社区维护的。

1. 安装：`npm install immer use-immer`。
2. 引用：`import { useImmer } from "use-immer"`
3. 使用:
    > 1. 用在对象和数组这种复杂类型，可以直接修改数据，可以使用内置API，比如数组的push、pop等。
    > 1. 用在简单数据类型，和`useState`使用方式一样。

### useImmerReducer

1. 引用：`import { useImmerReducer } from "use-immer";`

2. ~~~tsx
   import { useImmerReducer } from "use-immer";
   
   interface State {
       count: number;
       name: string;
   }
   
   interface Action {
       type: string;
   }
   
   export default function App() {
       const reducer = (state: State, action: Action) => {
           // 修改switch, 不需要返回state。
           // 需要加 break
           switch (action.type) {
               case "add":
                   state.count += 1
                   break
               case "sub":
                   state.count -= 1
                   break
               case "update_name":
                   state.name = "晴川"
                   break
               default:
                   return state;	
           }
       }
       
       const [state, dispatch] = useImmerReducer(reducer, {count: 0, name: "Astraca"});
       
       return(
           <div>
           	<h3>当前数字：{state.count}</h3>
               <h3>当前名字：{state.name}</h3>
               <button onClick={() => dispatch({type: "add"})}>+ 1</button>
               <button onClick={() => dispatch({type: "sub"})}>- 1</button>
               <button onClick={() => dispatch({type: "update_name"})}>Update_name</button>
           </div>
       )
   }
   ~~~

3. 