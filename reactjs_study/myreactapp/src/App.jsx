import { useState, useEffect } from 'react'
import { useRef } from 'react'
import useTitle from './useTitle'
import AuthContext from './AuthContext'
import MyComponent from './MyComponent'
import MyForm from './MyForm'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const increment = () => {
    setCount1(count1 + 11); // now, no render
    setCount2(count2 + 22);
    // all state updated, component will render
  }

  useEffect(() => {
    console.log('Heello from useEffect');
  })

  const inputRef = useRef(null);
  useTitle(`You clicked ${count} times`);

  const userName = 'Chance.chih';
  
  return (
    <>
      <AuthContext.Provider value={userName}>
        <MyComponent />
      </AuthContext.Provider>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>hi, Vite + React</h1>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus input</button>
      
      {/*<MyForm />*/}
      
      <div className="card">
        {/*<button onClick={() => setCount((count) => count + 1)}> */}
        <button onClick={()=>setCount(preCount=>preCount+6)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <p>Counters: {count1} - {count2}</p>
        <button onClick={increment}>Increment</button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
