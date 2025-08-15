import { useStorage } from "./hooks/useStorage.ts"

function App() {
    const [count, setCount] = useStorage('count', 1)
    
    return (
        <>
            <h1>Value: {count}</h1>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <button onClick={() => setCount(count - 1)}>-1</button>
        </>
    )
}

export default App