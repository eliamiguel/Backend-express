const { decryptedToken } = require("../../utils/token");
const { decrypt } = require("../../utils/crypt");

const verifyJwt = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não foi injetado" });
  }

  try {
    const decoded = await decryptedToken(authHeader);
    const newId = decoded.newId; // Assumindo que decoded.newId está correto

    if (!newId) {
      throw new Error("ID do usuário não encontrado no token");
    }

    const userId = decrypt({
      iv: newId.split(":")[0],
      content: newId.split(":")[1],
    });

    req.userId = parseInt(userId);

    return next();
  } catch (error) {
    console.error("Erro ao verificar o token:", error);
    return res.status(401).json({ message: "Não autorizado" });
  }
};

module.exports = verifyJwt;
