// @ts-nocheck
/**
 * Arquivo: src/routes/agendar.routes.js
 * Descrição: arquivo responsável pelas rotas da api relacionado a classe 'Agenda_Excursao'.
 * Data: 25/10/2021
 * Author: Fabio Santos
 */
const router = require('express-promise-router')()

const ensureLogin = require("connect-ensure-login")

const agendarController = require('../controllers/agendar.controller')

router.get('/agendados', ensureLogin.ensureLoggedIn('/login?logged=false'), agendarController.listAllAgendamentos)

router.get('/consulta-agendamento', ensureLogin.ensureLoggedIn('/login?logged=false'), agendarController.findAgendamentoById)

router.get('/cancelar-agendamento', ensureLogin.ensureLoggedIn('/login?logged=false'), agendarController.deleteAgendamentoById)

module.exports = router
