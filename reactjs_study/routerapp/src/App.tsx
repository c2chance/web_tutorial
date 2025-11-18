import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import Contact from './Contact'
import './App.css'
import PageNotFound from './PageNotFound'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>{'  |  '}
          <Link to="/contact">Contact</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />}>
            <Route path="london" element={<ContactLondon />} />
            <Route path="paris" element={<ContactParis />} />
          </Route>
          <Route path="*" element={<PageNotFound />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
