import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Autenticacao from './pages/auth/Autenticacao';
import Home from './pages/home/Home';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Rota de autenticação */}
        <Route path="/login/*" element={
          isLoggedIn ? <Navigate to="/home" replace /> : 
          <Autenticacao isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        } />
        
        {/* ✅ Rota principal com layout fixo (menu + conteúdo dinâmico) */}
        <Route path="/home/*" element={
          isLoggedIn ? <Home /> : <Navigate to="/login" replace />
        } />
        
        {/* Rota raiz - redireciona */}
        <Route path="/" element={
          <Navigate to={isLoggedIn ? "/home" : "/login"} replace />
        } />
      </Routes>
    </Router>
  );
}

export default App;