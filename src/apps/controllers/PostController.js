const Posts = require("../models/posts");

class PostController {
  //criar post
  async create(req, res) {
    const { image, description } = req.body;

    const newPost = await Posts.create({
      image,
      description,
      author_id: req.userId,
    });

    if (!newPost) {
      res.status(400).json({ message: "Falhou a criação do post" });
    }

    return res.status(200).json({ data: { image, description } });
  }
  // deletar post
  async delete(req, res) {
    const { id } = req.params;

    const verifyPost = await Posts.findOne({
      where: {
        id,
      },
    });

    if (!verifyPost) {
      return res.status(401).json({ message: "Post não exists" });
    }

    if (verifyPost.author_id !== parseInt(req.userId)) {
      return res
        .status(401)
        .json({ message: "Você não tem permisão para deletar post" });
    }

    const deletesPost = await Posts.destroy({
      where: {
        id,
      },
    });

    if (!deletesPost) {
      return res.status(400).json({ message: " Falha ao deletar o post" });
    }

    return res.status(200).json({ message: "Post deletado" });
  }
  // Atualizar post
  async update(req, res) {
    const { id } = req.params;
    const { image, description } = req.body;

    const verifyPost = await Posts.findOne({
      where: {
        id,
      },
    });

    if (!verifyPost) {
      return res.status(401).json({ message: "Post não exists" });
    }

    if (verifyPost.author_id !== parseInt(req.userId)) {
      return res
        .status(401)
        .json({ message: "Você não tem permisão para deletar post" });
    }

    const postUpdate = await Posts.update(req.body, { where: { id } });

    if (!postUpdate) {
      return res.status(400).json({ message: "Falha na atualização do post!" });
    }

    return res.status(200).json({ message: "Posts Atualizado" });
  }
  // likes

  async addLike(req, res) {
    const { id } = req.params;

    const verifyPost = await Posts.findOne({
      where: {
        id,
      },
    });

    if (!verifyPost) {
      return res.status(401).json({ message: "Post não existe!" });
    }

    const postUpdate = await Posts.update(
      { number_likes: verifyPost.number_likes + 1 },
      { where: { id } }
    );

    if (!postUpdate) {
      return res.status(400).json({ message: "Falha na atualização do post!" });
    }

    return res.status(200).json({
      message: "Like foi amarzenado ",
      number_likes: postUpdate.number_likes,
    });
  }
}

module.exports = new PostController();
