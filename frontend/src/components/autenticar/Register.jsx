import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/AutenticarServices';

function Register() {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (senha !== confirmarSenha) {
            setError('As senhas ão concidem!');
            return;
        }

        try {
            await register(usuario, senha, confirmarSenha);
            navigate('/login')
        } catch (err) {
            setError(err.response?.data?.error || 'Erro ao cadastrar');
        }
    };

    return (
        <div>
            <h1>Registrar</h1>
            
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
                <input
                    type="password"
                    placeholder="Confirmar Senha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    required
                />
                <button type="submit">Cadastrar</button>
            </form>
            <button onClick={() => navigate('/login')}>Já tem conta? Faça Login</button>
        </div>
    );
}

export default Register;