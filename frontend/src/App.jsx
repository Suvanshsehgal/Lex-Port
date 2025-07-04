import { useState } from 'react'
import NavbarLanding from './compoents/NavbarLanding'
import LandingPage from './pages/LandingPage'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavbarLanding />
    <LandingPage/>
   </>
  )
}

export default App
