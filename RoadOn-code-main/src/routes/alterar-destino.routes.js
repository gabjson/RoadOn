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

router.get('/alterar-destino', ensureLogin.ensureLoggedIn('/login?logged=false'), destinoController.findDestinoById)

router.post('/alterar-destino', destinoController.updateDestinoById)

router.get('/excluir-destino', ensureLogin.ensureLoggedIn('/login?logged=false'), destinoController.deleteDestinoById)

module.exports = router
