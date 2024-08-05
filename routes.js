const express = require("express");
const routas = express.Router();

const { upload } = require("./src/config/multer");
const shemaValidator = require("./src/apps/middlewares/shemaValidator");

const AuthenticationMiddleware = require("./src/apps/middlewares/authentication");

const AuthenticationController = require("./src/apps/controllers/AuthenticationController");
const authSchema = require("./src/schema/auth.schema.json");

const userControler = require("./src/apps/controllers/UserControler");
const userSchema = require("./src/schema/create.user.schema.json");
const FileController = require("./src/apps/middlewares/FileController");
const PostController = require("./src/apps/controllers/PostController");
const postSchema = require("./src/schema/post.schema.json");
routas.post("/user", shemaValidator(userSchema), userControler.create);

routas.post(
  "/auth",
  shemaValidator(authSchema),
  AuthenticationController.authenticate
);
routas.use(AuthenticationMiddleware);

routas.get("/", (req, res) => {
  return res.send({ message: "Connecteda com sucesso" });
});

routas.put("/user", userControler.update);
routas.delete("/user", userControler.delete);
routas.get("/user-profile", userControler.userProfile);
routas.post("/upload", upload.single("image"), FileController.upload);

routas.post("/posts", shemaValidator(postSchema), PostController.create);
routas.delete("/posts/:id", PostController.delete);
routas.put("/posts/:id", PostController.update);

routas.put("/add-like/:id", PostController.addLike);

module.exports = routas;
