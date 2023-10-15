const db = require('../database')
let moment = require('moment')
moment.locale('pt-br')

// ==> Método responsável por criar uma pessoa no banco de dados:

exports.createPessoa = async (req, res) => {
    const { nome_pessoa  , telefone_pessoa  , email_pessoa, data_nascimento } = req.body;
    id_excursao = parseInt(req.body.destinos);
    const { rows } = await db.query(
        "INSERT INTO pessoa  (nome_pessoa, telefone_pessoa, email_pessoa, data_nascimento) VALUES ($1, $2, $3, $4)",
        [nome_pessoa , telefone_pessoa , email_pessoa, data_nascimento]
    ).then(setTimeout(async () => {
        await db.query(
            "INSERT INTO pessoa_excursao (id_pessoa, id_excursao) SELECT pessoa.id_pessoa, $1 FROM pessoa WHERE pessoa.id_pessoa = (select id_pessoa from pessoa order by id_pessoa desc limit 1)", [id_excursao])
            , 1500 
        }))
        

    res.status(201).redirect('/agendados?turistaInclude=true')
};

// ==> Método responsável por listar todas as Pessoas':

exports.listAllPessoas = async (req, res) => {
    id_excursao  = parseInt(req.query.excursao);
    const response = await db.query('SELECT * FROM pessoa_excursao INNER JOIN agenda_excursao ON pessoa_excursao.id_excursao = agenda_excursao.id_excursao INNER JOIN pessoa ON pessoa.id_pessoa = pessoa_excursao.id_pessoa WHERE agenda_excursao.id_excursao = $1', [id_excursao]);
    res.status(200).render('turistas.ejs', { model: response.rows, title: 'RoadOn - Turistas da Excursão' })
};

exports.findPessoaById = async (req, res) => {
    id_excursao  = parseInt(req.query.excursao);
    id_turista  = parseInt(req.query.turista);
    const response = await db.query('SELECT * FROM pessoa_excursao INNER JOIN agenda_excursao ON pessoa_excursao.id_excursao = agenda_excursao.id_excursao INNER JOIN pessoa ON pessoa.id_pessoa = pessoa_excursao.id_pessoa INNER JOIN destino ON destino.id_destino = agenda_excursao.id_destino WHERE agenda_excursao.id_excursao = $1 AND pessoa.id_pessoa = $2', [id_excursao, id_turista]);
    res.status(200).render('editar-turista.ejs', {model: response.rows, moment: moment, title: 'RoadOn - Alterar Turista' })
}

exports.updatePessoaById = async (req, res) => {
    id_turista  = parseInt(req.query.turista);
    const { nome_pessoa , telefone_pessoa , email_pessoa} = req.body;
    const { rows } = await db.query(
        "UPDATE pessoa SET nome_pessoa = $1, telefone_pessoa = $2, email_pessoa = $3 WHERE id_pessoa  = $4",
        [nome_pessoa , telefone_pessoa , email_pessoa , id_turista]
    );
    res.status(200).redirect('/agendados?turistaChange=true');
}

exports.deletePessoaById = async (req, res) => {
    id_turista  = parseInt(req.query.turista);
    const response = await db.query('DELETE FROM pessoa WHERE id_pessoa = $1', [id_turista]);
    res.status(200).redirect('/agendados?turistaDelete=true');
}