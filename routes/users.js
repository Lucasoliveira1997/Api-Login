const express = require('express')
const routes = express.Router()
const Users = require('../model/user.model')

routes.get('/', (req, resp) => {
    Users.find({}, (erro, data) => {
        if(erro){
            return resp.send({erro: `Não foi possivel capturar os usuários`})
        }
        return resp.send(data)
    })
    return resp.send({message: "Tudo okay com a rota GET de usuários"})
})

routes.post('/create', (req, resp) => {
    const {email, password} = req.body

    if(!email || !password){
        return resp.send({erro: `dados insufucientes`})
    }
    
    Users.findOne({email}, (erro, data) => {
        if(erro){
            return resp.send({erro: `Não foi possivel localizar`})
        }
        if(data){
            return resp.send({erro: `Usuário já registrado `})
        }

        Users.create(req.body, (erro, data) => {
            if(erro){
                return resp.send({erro: `Erro ao criar o usuário`})
            }
            data.password = undefined
            return resp.send(data)
        })
    })

})

module.exports = routes