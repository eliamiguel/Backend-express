const Users = require("../models/Users");

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
}
module.exports = new UserControler();
