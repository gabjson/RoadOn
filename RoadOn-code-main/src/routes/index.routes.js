// @ts-nocheck
/**
 * Arquivo: src/routes/pessoa.routes.js
 * Descrição: arquivo responsável pelas rotas da api relacionado a classe 'Pessoa'.
 * Data: 02/10/2021
 * Author: Gustavo Morais
 */
const router = require('express-promise-router')()

const ensureLogin = require("connect-ensure-login")

router.get('/index', ensureLogin.ensureLoggedIn('/login?logged=false'), (req, res) => {
	res.render('index-logado.ejs', {title: 'RoadOn'})
})

module.exports = router
