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