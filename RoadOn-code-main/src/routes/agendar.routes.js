// @ts-nocheck
/**
 * Arquivo: src/routes/agendar.routes.js
 * Descrição: arquivo responsável pelas rotas da api relacionado a classe 'Agenda_Excursao'.
 * Data: 02/10/2021
 * Author: Gustavo Morais
 */
const router = require('express-promise-router')()

const ensureLogin = require("connect-ensure-login")

const agendarController = require('../controllers/agendar.controller')

const db = require('../database')

router.get('/agendar', ensureLogin.ensureLoggedIn('/login?logged=false'), async (req, res) => {
	const response = await db.query('SELECT * FROM destino WHERE id_destino = $1', [req.query.destino])	
	res.render('agendar-destino.ejs', { model: response.rows, title: 'RoadOn - Agendar Excursão' })
})

router.post('/agendar', agendarController.createAgendamento)

module.exports = router
