const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const Users = require("../models/Users");
const { encrypt } = require("../../utils/crypt");

class AuthenticationController {
  async authenticate(req, res) {
    const { email, user_name, password } = req.body;

    let whereClause = {};
    if (email) {
      whereClause.email = email;
    } else if (user_name) {
      whereClause.user_name = user_name;
    } else {
      return res
        .status(400)
        .json({ error: "Email ou username é obrigatório!" });
    }

    try {
      const user = await Users.findOne({
        where: whereClause,
      });

      if (!user) {
        return res.status(401).json({ error: "Usuário não encontrado" });
      }

      const isPasswordValid = await user.checkPassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Senha não corresponde!" });
      }

      const { id, user_name: userName } = user;

      const { iv, content } = encrypt(id);
      const newId = `${iv}:${content}`;

      const token = jwt.sign({ newId }, process.env.HASH_BCRYPT, {
        expiresIn: process.env.EXPIRE_IN,
      });

      return res.status(200).json({ user: { user_name: userName }, token });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

module.exports = new AuthenticationController();
