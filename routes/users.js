const express = require('express')
const routes = express.Router()
const Users = require('../model/user.model')
const bcrypt = require('bcrypt')

routes.get('/', async(req, resp) => {
    try{
        const users = await Users.find({})
        return resp.send(users)
    }
    catch(erro) {
        resp.send({error: `Não foi possível capturar os usuários`})
    }
})

routes.get('/', (req, resp) => {
    Users.find({}, (erro, data) => {
        if(erro){
            return resp.send({erro: `Não foi possivel capturar os usuários`})
        }
        return resp.send(data)
    })

})

routes.post('/create', async(req, resp) => {
    const {email, password} = req.body

    if(!email || !password) return resp.send({erro: `dados insulficientes!`})

    try{
        if(await Users.findOne({email})) return resp.send({erro: `Usuario ${email} já cadastrado`}) 

        const user = await Users.create(req.body)
        user.password = undefined
        return resp.send(user)        
    }
    catch(erro){
        resp.send({erro: `Não foi possível criar o usuário ${email}`})
    }
})

routes.post('/auth', async(req, resp) => {
    const {email, password} = req.body
    if(!email || !password) return resp.send({erro: `Dados insulficientes`})

    try{
        const user = await Users.findOne({email}).select('+password')
        if(!user) return resp.send({erro: `Usuário não cadastrado`})

        const senhaOk = await bcrypt.compare(password, user.password)
        if(!senhaOk) return resp.send({erro: `Senha incorreta`})
        user.password = undefined
        return resp.send(user)
    }
    catch(erro){
        resp.send({erro: `Não foi possível autenticar`})
    }
})

module.exports = routes