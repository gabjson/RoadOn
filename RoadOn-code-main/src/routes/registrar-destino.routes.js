// @ts-nocheck
/**
 * Arquivo: src/routes/destino.routes.js
 * Descrição: arquivo responsável pelas rotas da api relacionado a classe 'Destino'.
 * Data: 30/09/2021
 * Author: Fabio Santos
 */
 const router = require('express-promise-router')()

 const ensureLogin = require("connect-ensure-login")

 const destinoController = require('../controllers/destino.controller')

 router.get('/registrar-destino', ensureLogin.ensureLoggedIn('/login?logged=false'), (req, res) => {
    if (req.query.exists)
        res.render('registrar-destino.ejs', { exists: true, error: false, title: 'RoadOn - Cadastro de Destino' })
    else if (req.query.error) 
        res.render('registrar-destino.ejs', { exists: false, error: true, title: 'RoadOn - Cadastro de Destino' })
    else
        res.render('registrar-destino.ejs', { exists: false, error: false, title: 'RoadOn - Cadastro de Destino' })
  
 })

 router.post('/registrar-destino', destinoController.createDestino)

 module.exports = router