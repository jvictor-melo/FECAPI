import db from '../config/db.js';
import bcrypt from 'bcryptjs';

export const login = async (req, res) => {
    const { usuario, senha } = req.body;

    /*
    if (!usuario || !senha) {
        return res.status(400).json({ error: 'Usuário e senha são obrigatórios!' });
    }*/

    db.get('SELECT * FROM usuarios WHERE usuario = ?', [usuario], async (err, user) => {
        try {
            // Tratamento de erros do banco
            if (err) {
                console.error('Erro no banco de dados:', err);
                return res.status(500).json({ error: 'Erro interno no servidor' });
            }

            // Verificação do usuário
            if (!user) {
                return res.status(401).json({ error: 'Credenciais inválidas!' }); // 401 é mais apropriado
            }

            // user.senha em vez de usuario.senha
            const senhaValida = await bcrypt.compare(senha, user.senha);
            
            if (!senhaValida) {
                return res.status(401).json({ error: 'Credenciais inválidas!' });
            }

            // Resposta de sucesso (remova a senha do retorno)
            const { senha: _, ...userSemSenha } = user;
            res.json({ 
                message: 'Login bem-sucedido!',
                user: userSemSenha
            });

        } catch (error) {
            console.error('Erro no processo de login:', error);
            res.status(500).json({ error: 'Erro interno no servidor' });
        }
    });
};


export const register = async (req, res) => {
    const { usuario, senha, confirmarSenha } = req.body;

    if(senha !== confirmarSenha) {
        return res.status(500).json({ error: 'As senhas não coincidem!' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    db.run(`
        INSERT INTO usuarios (usuario, senha) VALUES (?, ?)`, [usuario, senhaCriptografada],
        function (err) {
            if (err) return res.status(500).json({ error: 'Usuário já existe!' });
            res.json({ message: 'Usuário criado com sucesso!', userId: this.lastID });
        }
    );
};