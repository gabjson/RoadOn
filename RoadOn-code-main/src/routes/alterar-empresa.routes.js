// @ts-nocheck
/**
 * Arquivo: src/routes/empresa.routes.js
 * Descrição: arquivo responsável pelas rotas da api relacionado a classe 'Empresa'.
 * Data: 10/09/2021
 * Author: Fabio Santos / Gustavo Morais
 */
const router = require('express-promise-router')()

const ensureLogin = require("connect-ensure-login")

const empresaController = require('../controllers/empresa.controller')

router.get('/alterar-empresa', ensureLogin.ensureLoggedIn('/login?logged=false'), empresaController.findEmpresaById)

router.post('/alterar-empresa', empresaController.updateEmpresaById)

router.get('/remover-empresa', ensureLogin.ensureLoggedIn('/login?logged=false'), empresaController.deleteEmpresaById)

module.exports = router
