// @ts-nocheck
/**
 * Arquivo: src/routes/agendar.routes.js
 * Descrição: arquivo responsável pelas rotas da api relacionado a classe 'Agenda_Excursao'.
 * Data: 25/10/2021
 * Author: Fabio Santos
 */
const router = require('express-promise-router')()

const ensureLogin = require("connect-ensure-login")

const db = require('../database')

const agendarController = require('../controllers/agendar.controller')

router.get('/reagendar', ensureLogin.ensureLoggedIn('/login?logged=false'), async (req, res) => {
	const {id_empresa} = req.user
	id_excursao = parseInt(req.query.excursao)
	const response = await db.query(
		'SELECT * FROM agenda_excursao INNER JOIN destino ON destino.id_destino = agenda_excursao.id_destino WHERE agenda_excursao.id_excursao  = $1 AND agenda_excursao.id_empresa = $2',
		[id_excursao, id_empresa]
	)
	res.render('reagendar-destino.ejs', {model: response.rows, title: 'RoadOn - Reagendar Excursão'})
})

router.post('/reagendar', agendarController.updateAgendamentoById)

module.exports = router
