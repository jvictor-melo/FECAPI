import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../../components/autenticar/Login';
import Register from '../../components/autenticar/Register';
//import './Autenticacao.css';

/*
 * COMPONENTE Autenticacao - Gerenciador de Fluxo de Autenticação
 * 
 * Este componente gerencia sub-rotas dentro de /login/*
 * 
 * Sub-rotas suportadas:
 * - /login/ → Login (rota padrão)
 * - /login/register → Registro
 * - /login/forgot-password → Recuperar senha (se implementado)
 */
function Autenticacao({ isLoggedIn, setIsLoggedIn }) {
  
  // Se já estiver logado, redireciona para home
  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="auth-container">
      {/*
        ✅ AGORA FUNCIONA: A rota pai /login/* permite estas rotas filhas
        As URLs serão:
        - /login/ → mostra Login (path vazio)
        - /login/register → mostra Register
      */}
      <Routes>
        
        {/* Sub-rota: /login/ (vazia) → Formulário de Login */}
        <Route 
          path="" 
          element={<Login setIsLoggedIn={setIsLoggedIn} />} 
        />
        
        {/* Sub-rota: /login/register → Formulário de Registro */}
        <Route 
          path="register" 
          element={<Register setIsLoggedIn={setIsLoggedIn} />} 
        />
        
        {/*
          Sub-rota padrão: redireciona para login se tentar acessar
          /login/qualquer-outra-coisa
        */}
        <Route 
          path="*" 
          element={<Navigate to="/login" replace />} 
        />
        
      </Routes>
    </div>
  );
}

export default Autenticacao;
