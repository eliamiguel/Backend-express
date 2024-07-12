require('dotenv').config()

const express = require('express');
const app = express();
const routes = require('./routes')
const port = 7001


app.use(express.json())
app.use(routes)

app.listen(process.env.PORT, ()=>{console.log(`http://localhost:${port}`)})