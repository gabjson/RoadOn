// @ts-nocheck
/**
 * Arquivo: src/routes/turista.routes.js
 * Descrição: arquivo responsável pelas rotas da api relacionado a classe 'Pessoa'.
 * Data: 02/10/2021
 * Author: Gustavo Morais
 */
const router = require('express-promise-router')()

const ensureLogin = require("connect-ensure-login")

const db = require('../database')

let moment = require('moment');
moment.locale('pt-br')

const turistaController = require('../controllers/turista.controller')

router.get('/registrar-turista', ensureLogin.ensureLoggedIn('/login?logged=false'), async (req, res) => {
	const { id_empresa } = req.user; 
	const response = await db.query('SELECT * FROM agenda_excursao INNER JOIN destino ON destino.id_destino = agenda_excursao.id_destino WHERE agenda_excursao.id_empresa = $1 ORDER BY agenda_excursao.data_saida_excursao ASC ', [id_empresa]);
	res.render('registrar-turista.ejs', { model: response.rows, moment: moment, title: 'RoadOn - Cadastro de Turista' })
})

router.post('/registrar-turista', turistaController.createPessoa)

router.get('/turistas', ensureLogin.ensureLoggedIn('/login?logged=false'), turistaController.listAllPessoas)

module.exports = router
