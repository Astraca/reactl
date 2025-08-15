import { useHistory } from "./hooks/useHistory";

const App = () => {

    const [url, push, replace] = useHistory()
    
    return(
        <>
            <h1>url: {url}</h1>
            <button onClick={() => push('/A')}>push</button>
            <button onClick={() => replace('/B')}>replace</button>
        </>
    )
}

export default App