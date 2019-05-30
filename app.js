const express = require('express')
const app = express()
const port = 3035

//BANCO DE DADOS
const mongoose = require('mongoose')
const url = `mongodb+srv://usuario_admin:lukinhas039@clusterapi-bamcd.mongodb.net/test?retryWrites=true`
const options = {reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true}

mongoose.connect(url, options)
mongoose.set('useCreateIndex', true)

mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada com o banco de dados')
    
})

mongoose.connection.on('error', error => {
    console.log(`Erro na conexão com o banco de dados com o erro: ${error}`)
    
})

mongoose.connection.on('disconnected', () => {
    console.log(`Aplicação desconectada do banco de dados`)
    
})

//BODY-PARSER
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


//IMPORTAÇÃO DE ROTAS
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

app.use('/', indexRouter)
app.use('/users', usersRouter)

app.listen(port, () => console.log(`server is running on port ${port}`))