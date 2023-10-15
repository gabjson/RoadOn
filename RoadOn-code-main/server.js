/**
     * Arquivo: server.js
     * Descrição: arquivo responsável por toda a configuração e execução da aplicação.
     * Data: 10/09/2021
     * Author: Fabio Santos
 */

require('dotenv-safe').config();
const express = require('express');
const app = require('./src/app');

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});