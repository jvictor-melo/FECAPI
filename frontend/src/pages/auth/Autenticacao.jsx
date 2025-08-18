import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "../../components/autenticar/login";
import Register from "../../components/autenticar/register";
import Home from "../home/Home";
import { useEffect } from "react";

function Autenticacao({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  // Redireciona se já estiver logado
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn, navigate]);

  return (
    <Routes>
      <Route path="/login/" element={
        isLoggedIn ? (
          <Navigate to="/home/" replace />
        ) : (
          <Login setIsLoggedIn={setIsLoggedIn} />
        )
      } />
      
      <Route path="/register/" element={
        isLoggedIn ? (
          <Navigate to="/home/" replace />
        ) : (
          <Register />
        )
      } />
      
      <Route path="/home/" element={
        isLoggedIn ? (
          <Home />
        ) : (
          <Navigate to="/login/" replace state={{ from: '/home' }} />
        )
      } />
      
      <Route path="/" element={
        <Navigate to={isLoggedIn ? '/home/' : '/login/'} replace />
      } />
    </Routes>
  );
}

export default Autenticacao;