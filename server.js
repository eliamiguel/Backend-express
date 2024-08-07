require("dotenv").config();
require("./src/database/index");
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const { PORT } = process.env;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
