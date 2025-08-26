import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/AutenticarServices';
import './styles.css'; // Importando o CSS

function Register() {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (senha !== confirmarSenha) {
            setError('As senhas não coincidem!');
            return;
        }

        try {
            await register(usuario, senha, confirmarSenha);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Erro ao cadastrar');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h1 className="auth-title">Registrar no FECAPI</h1>
                
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
                    
                    <div className="input-group">
                        <span className="input-label">Confirmar Senha</span>
                        <input
                            type="password"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    
                    <button type="submit" className="primary-button">Cadastrar</button>
                </form>

                <div className="auth-link">
                    <span>Já tem conta? </span>
                    <button 
                        onClick={() => navigate('/login')} 
                        className="secondary-button"
                    >
                        Faça Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;