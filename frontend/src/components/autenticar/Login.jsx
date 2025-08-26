import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/AutenticarServices';
import './styles.css';

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
            navigate('/home')
        } catch (err) {
            setError(err.response?.data?.error || 'Usuário ou senha incorretos');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h1 className="auth-title">Entrar no FECAPI</h1>
                
                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <span className="input-label">Usuário</span>
                        <input
                            type="text"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    
                    <div className="input-group">
                        <span className="input-label">Senha</span>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    
                    <button type="submit" className="primary-button">Entrar</button>
                </form>

                <div className="auth-link">
                    <span>Não tem conta? </span>
                    <button 
                        onClick={() => navigate('register')} 
                        className="secondary-button"
                    >
                        Crie uma
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;