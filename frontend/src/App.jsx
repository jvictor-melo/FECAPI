import './App.css'
import { useState } from 'react'
import LayoutHome from './layouts/homeLayout/LayoutHome.jsx'
import Home from './pages/home/Home.jsx'
import Autenticacao from './pages/auth/autenticacao.jsx'

function App() {
  const [isLoggedIn] = useState(false);

  return (
    
    <>
      {isLoggedIn ? <Home /> : <Autenticacao />}
    </>
  )
}

export default App
