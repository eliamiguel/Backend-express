const express = require("express");
const routas = express.Router();
const userControler = require("./src/apps/controllers/UserControler");
const shemaValidator = require("./src/apps/middlewares/shemaValidator");

const userSchema = require("./src/schema/create.user.schema.json");
routas.get("/", (req, res) => {
  return res.send({ message: "Connecteda com sucesso" });
});
routas.post("/user", shemaValidator(userSchema), userControler.create);

module.exports = routas;
