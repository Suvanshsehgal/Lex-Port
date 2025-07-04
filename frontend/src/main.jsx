import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import Startng from './Startng.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import LegalLandingPage from './pages/LandingPage.jsx'
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element :<Startng/>,
    children:[
      {
        path :"",
        element:<LegalLandingPage/>
      },
      {
        path:'login',
        element:<Login/>
      },
      {
        path:'signup',
        element:<Signup/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router ={router}/>
  </StrictMode>,
)
