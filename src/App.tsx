import { useState, useReducer } from "react"
import { useImmer } from "use-immer"

const initData = [
    { name: '小满(只)', price: 100, count: 1, id: 1, isEdit: false },
    { name: '中满(只)', price: 200, count: 1, id: 2, isEdit: false },
    { name: '大满(只)', price: 300, count: 1, id: 3, isEdit: false }
]
type Data = typeof initData

const reducer = (state: Data, action: {type: 'add' | 'sub' | 'delete' | 'edit' | 'update_name' | 'blur', id: number, newName?: string}) => {
    const item = state.find(item => item.id === action.id)!
    switch (action.type) {
        case 'add':
            item.count++
            return [...state]
        case 'sub':
            item.count--
            if(item.count < 0) item.count = 0
            return [...state]
        case 'delete':
            return state.filter((item) => item.id != action.id)
        case 'edit':
            item.isEdit = !item.isEdit
            return [...state]
        case 'update_name':
            item.name = action.newName!
            return [...state]
        case 'blur':
            item.isEdit = false
            return [...state]
        default:
            return state
    }
    
    return state
}
function App() {

    const [data, dispatch] = useReducer(reducer, initData)

    const [person, setPerson] = useImmer([
        {
            name: "fenghao",
            age: 21
        },
        {
            name: "fenghao1",
            age: 212
        },
        {
            name: "fenghao2",
            age: 213
        }
    ])
    
    return(
        <>
            <h1>购物车</h1>
            <table border={1} width={800} cellPadding={0} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>商品</th>
                        <th>单价</th>
                        <th>数量</th>
                        <th>总价</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item) => {
                            return <tr key={item.id}>
                                <td align="center">
                                    {item.isEdit ? <input type="text" value={item.name} onBlur={() => dispatch({type: 'blur', id: item.id})} onChange={(e) => dispatch({type: 'update_name', id:item.id, newName: e.target.value})}/> : item.name}
                                </td>
                                <td align="center">{item.price}</td>
                                <td align="center">
                                    <button onClick={() => dispatch({type: 'add', id: item.id})}>+</button>
                                    {item.count}
                                    <button onClick={() => dispatch({type: 'sub', id: item.id})}>-</button>
                                </td>
                                <td align="center">{item.price * item.count}</td>
                                <td align="center">
                                    <button onClick={() => dispatch({type: 'edit', id: item.id})}>修改</button>
                                    <button onClick={() => dispatch({type: 'delete', id: item.id})}>删除</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={4}></td>
                        <td align="right">总价：{data.reduce((a, b) => a + b.price * b.count, 0)}</td>
                    </tr>
                </tfoot>
            </table>

            <hr />

            <div>
                {
                    person.map(item => {
                        return (
                            <>
                                <span>{item.name}</span> - <span>{item.age}</span> <br />
                            </>
                        )
                        
                    })
                }

                <button onClick={() => {
                    setPerson(draft => {
                        // draft.hobby.name = "游泳"
                    })
                }}>
                    修改玩
                </button>
            </div>
        </>
    )
}

export default App
