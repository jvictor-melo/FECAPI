import axios from 'axios';

const API_URL = "http://localhost:3030/autenticar";

export const login = async (usuario, senha) => {
    const response = await axios.post(`${API_URL}/login`, {
        usuario,
        senha
    });
    return response.data;
};

export const register = async (usuario, senha, confirmarSenha) => {
    const response = await axios.post(`${API_URL}/register`, {
        usuario,
        senha,
        confirmarSenha
    });
    return response.data;
};

