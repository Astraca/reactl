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