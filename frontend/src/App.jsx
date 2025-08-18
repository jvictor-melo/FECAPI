import { BrowserRouter as Router } from 'react-router-dom';
import Autenticacao from './pages/auth/Autenticacao';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Autenticacao isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </Router>
  );
}

export default App;