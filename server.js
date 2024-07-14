require("dotenv").config();
require("./src/database/index");
const express = require("express");
const app = express();
const routes = require("./routes");
const { PORT } = process.env;

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
