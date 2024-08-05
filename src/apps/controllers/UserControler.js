const Users = require("../models/Users");
const bcryptjs = require("bcryptjs");

class UserControler {
  async create(req, res) {
    //verificar se usuario já existe
    const verifyUser = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (verifyUser) {
      return res.status(400).json({ message: "Usuário já existe" });
    }
    const user = await Users.create(req.body);
    return res.send({ messege: "Usuário criado!" });
  }

  async update(req, res) {
    console.log("req.userId:", req.userId); // Verificação do userId

    const {
      name,
      avatar,
      bio,
      gender,
      old_password,
      new_password,
      confirm_new_password,
    } = req.body;

    const user = await Users.findOne({
      where: {
        id: req.userId,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Usuario Não existe" });
    }

    let encryptedPassword = "";

    if (old_password) {
      if (!(await user.checkPassword(old_password))) {
        return res.status(401).json({ error: "A senha antiga não bate " });
      }

      if (!new_password || !confirm_new_password) {
        return res.status(401).json({
          error:
            "Precisamos de uma nova senha para confirmar os novos atributos",
        });
      }

      if (new_password !== confirm_new_password) {
        return res.status(401).json({
          error: "As senhas digitadas são diferentes",
        });
      }

      encryptedPassword = await bcryptjs.hash(new_password, 8);
    }

    await Users.update(
      {
        name: name || user.name,
        avatar: avatar || user.avatar,
        bio: bio || user.bio,
        gender: gender || user.gender,
        password_hash: encryptedPassword || user.password_hash,
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    return res.status(200).json({ message: "Usuario atualizado" });
  }
  async delete(req, res) {
    const userDelete = await Users.findOne({
      where: {
        id: req.userId,
      },
    });

    if (!userDelete) {
      return res.status(400).json({ message: "Usuario não existe " });
    }

    await Users.destroy({
      where: {
        id: req.userId,
      },
    });

    return res.status(200).json({ message: "Usuário deletado" });
  }
  async userProfile(req, res) {
    const user = await Users.findOne({
      attributes: [
        "id",
        "name",
        "user_name",
        "email",
        "avatar",
        "bio",
        "agender",
      ],
      where: {
        id: req.userId,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Usuario não existe" });
    }

    const { id, name, user_name, email, avatar, bio, agender } = user;
    return res.status(200).json({ user });
  }
}

module.exports = new UserControler();
