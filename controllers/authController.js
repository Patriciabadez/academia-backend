const db = require('../database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    login(req, res) {
        const { email, senha } = req.body;

        db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
            if (err) {
                console.error("ERRO NO MYSQL:", err);
                return res.status(500).json({ error: 'Erro no servidor', details: err });
            }
            if (results.length === 0) return res.status(401).json({ error: 'Usuário não encontrado' });

            const user = results[0];

            const senhaCorreta = senha === results[0].senha;
            if (!senhaCorreta) return res.status(401).json({ error: 'Senha incorreta' });

            const token = jwt.sign(
                { id: user.id, nome: user.nome, tipo: user.tipo },
                'segredo123',
                { expiresIn: '8h' }
            );

            res.json({ message: 'Login realizado', token, user });
        });
    }
};
