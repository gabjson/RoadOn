/**
 * Arquivo: src/routes/index.js
 * Descrição: arquivo responsável pela chamada da API da aplicação.
 * Data: 21/09/2021
 * Author: Fabio Santos
 */

const express = require('express')
const router = express.Router()

router.get('/api', (req, res) => {
	res.status(200).send({
		success: 'true',
		message: 'Seja bem-vindo(a) a API do RoadOn!',
		version: '1.0.0',
	})
})

module.exports = router
