const express = require('express')
const routas = express.Router()

routas.get('/', (req, res)=>{
  return res.send({message: 'Connecteda com sucesso'})
} )


module.exports= routas