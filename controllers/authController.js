const db = require("../database");
const jwt = require("jsonwebtoken");

module.exports = {
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ error: "Email e senha são obrigatórios" });
      }

      const result = await db.query(
        "SELECT * FROM usuarios WHERE email = $1",
        [email]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ error: "Usuário não encontrado" });
      }

      const user = result.rows[0];

      if (user.senha !== senha) {
        return res.status(401).json({ error: "Senha incorreta" });
      }

      const token = jwt.sign(
        {
          id: user.id,
          nome: user.nome,
          tipo: user.tipo,
          email: user.email,
        },
        "segredo123",
        { expiresIn: "8h" }
      );

      res.json({
        message: "Login realizado com sucesso",
        token,
        user,
      });
    } catch (error) {
      console.error("Erro no login:", error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  },
};
