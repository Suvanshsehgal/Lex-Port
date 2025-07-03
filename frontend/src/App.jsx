import { useState } from 'react'
import NavbarLanding from './compoents/NavbarLanding'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavbarLanding />
   </>
  )
}

export default App
