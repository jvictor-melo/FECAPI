import db from '../config/db.js';
import bcrypt from 'bcryptjs';

export const login = async(req, res) => {
    const { usuario, senha } = req.body;

    db.get('SELECT * FROM usuarios WHERE usuario = ?', [usuario], async (err, user) => {
        if (!user) return res.status(500).json({ error: 'Usuário não encontrado!'});

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) return res.status(500).json({ error: 'Senha incorreta!'});

        res.json({ message: 'Login feito com sucesso!'})
    });
}

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