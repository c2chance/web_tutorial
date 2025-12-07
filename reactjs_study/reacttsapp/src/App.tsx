import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  
  const [name, setName] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`Heello ${name}`);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type='text' value={name} onChange={handleChange} />
        <input type="submit" value="Submit"/>
      </form>
    </>
  )
}

export default App
