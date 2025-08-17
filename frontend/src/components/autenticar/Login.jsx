import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/autenticarServices';

function Login({ setIsLoggedIn }) {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(usuario, senha);
            setIsLoggedIn(true)
            navigate('/home') // PROCURAR TELA INICIAL, n sei qual é
        } catch (err) {
            setError(err.response?.data?.error || 'Usuario ou senha incorretos');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Usuário"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
                <button type="submit">Entrar</button>
            </form>

    
            <button onClick={() => navigate('/register')}>Criar conta</button>
        </div>
    );
}

export default Login;