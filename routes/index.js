const express = require('express')
const routes = express.Router()

routes.get('/', (req, resp) => {
    return resp.send({message: `tudo okay com o metodo get`})
})

routes.post('/', (req, resp) => {
    return resp.send({message: `tudo okay com o metodo post`})
})

module.exports = routes