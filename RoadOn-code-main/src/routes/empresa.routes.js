// @ts-nocheck
/**
 * Arquivo: src/routes/empresa.routes.js
 * Descrição: arquivo responsável pelas rotas da api relacionado a classe 'Empresa'.
 * Data: 10/09/2021
 * Author: Fabio Santos / Gustavo Morais
 */
const router = require('express-promise-router')()

const empresaController = require('../controllers/empresa.controller')

router.get('/registrar-empresa', (req, res) => {
	if (req.query.exists)
		res.render('registrar-empresa.ejs', { exists: true, error: false, title: 'RoadOn - Cadastro de Empresa'})
	else if (req.query.error)
		res.render('registrar-empresa.ejs', { exists: false, error: true, title: 'RoadOn - Cadastro de Empresa'})
	 else
		res.render('registrar-empresa.ejs', { exists: false, error: false, title: 'RoadOn - Cadastro de Empresa'})
})

router.post('/registrar-empresa', empresaController.createEmpresa)

module.exports = router
