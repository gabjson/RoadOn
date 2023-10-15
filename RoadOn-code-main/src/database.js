/**
    * Arquivo: config/database.js
    * Descrição: arquivo responsável pelas conexão da aplicação com o PostgreSQL.
    * Data: 10/09/2021
    * Author: Fabio Santos
 */

 const { Pool } = require('pg');
 const dotenv = require('dotenv').config();

 // ==> Conexão com a Base de Dados:

 const pool = new Pool({
   connectionString: process.env.DATABASE_URL
 });
 pool.on('connect', () => {
   console.log('Banco de Dados conectado com sucesso!');
 });

 async function findUser(username) {
  const res = await pool.query(`SELECT * FROM empresa WHERE email_empresa=$1 LIMIT 1`, [username]);

  if (res.rows.length > 0)
      return res.rows[0];
  else return null;
}

async function findUserById(id) {
  const res = await pool.query(`SELECT * FROM empresa WHERE id_empresa=$1 LIMIT 1`, [id]);
  if (res.rows.length > 0)
      return res.rows[0];
  else return null;
}

module.exports = {
  query: (text, params) => pool.query(text, params), findUser, findUserById
};

