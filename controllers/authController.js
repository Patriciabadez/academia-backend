// controllers/authController.js
const db = require('../database');
const jwt = require('jsonwebtoken');

module.exports = {
    login(req, res) {
        const { email, senha } = req.body;

        db.query('SELECT * FROM usuarios WHERE email = $1', [email])
            .then(result => {
                if (result.rows.length === 0) {
                    return res.status(401).json({ error: 'Usuário não encontrado' });
                }

                const user = result.rows[0];

                if (senha !== user.senha) {
                    return res.status(401).json({ error: 'Senha incorreta' });
                }

                const token = jwt.sign(
                    { id: user.id, nome: user.nome, tipo: user.tipo },
                    'segredo123',
                    { expiresIn: '8h' }
                );

                res.json({ message: 'Login realizado', token, user });
            })
            .catch(err => {
                console.error('Erro no banco:', err);
                res.status(500).json({ error: 'Erro no servidor' });
            });
    }
};
