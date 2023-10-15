const db = require('../database')

// ==> Método responsável por criar um novo Destino:

exports.createDestino = async (req, res) => {
    const { nome_destino, valor_excursao, minimo_passageiro_excursao, maximo_passageiro_excursao } = req.body;
    const { id_empresa } = req.user;
    const { rows } = await db.query(
        "INSERT INTO destino (nome_destino, id_empresa, valor_excursao, minimo_passageiro_excursao, maximo_passageiro_excursao) VALUES ($1, $2, $3, $4, $5)",
        [nome_destino, id_empresa, parseInt(valor_excursao), minimo_passageiro_excursao, maximo_passageiro_excursao]
    );    
    res.status(201).redirect('/destinos?success=true')        
};

// ==> Método responsável por listar todos os Destinos':

exports.listAllDestinos = async (req, res) => {
    const { id_empresa } = req.user;
    const response = await db.query('SELECT * FROM destino WHERE id_empresa = $1 ORDER BY nome_destino ASC', [id_empresa]);
    if (req.query.success)
        res.render('destinos.ejs', { model: response.rows, success: true, deleted: false, title: 'RoadOn - Destinos'})
    else if (req.query.deleted)
        res.render('destinos.ejs', { model: response.rows, success: true, deleted: true, title: 'RoadOn - Destinos'})
    else
        res.render('destinos.ejs', { model: response.rows, success: false, deleted: false, title: 'RoadOn - Destinos'})
};

exports.findDestinoById = async (req, res) => {
    id_destino = parseInt(req.query.destino);
    const response = await db.query('SELECT * FROM destino WHERE id_destino = $1', [id_destino]);
    if (req.query.exists)
        res.status(200).render('alterar-destino.ejs', { model: response.rows, exists: true, error: false, title: 'RoadOn - Alterar Destino' });
    else if (req.query.error)
        res.status(200).render('alterar-destino.ejs', { model: response.rows, exists: false, error: true, title: 'RoadOn - Alterar Destino' });
    else
        res.status(200).render('alterar-destino.ejs', { model: response.rows, exists: false, error: false, title: 'RoadOn - Alterar Destino' });    
}

exports.updateDestinoById = async (req, res) => {
    id_destino = parseInt(req.query.destino);
    const { nome_destino, valor_excursao, minimo_passageiro_excursao, maximo_passageiro_excursao } = req.body;
    const { rows } = await db.query(
        "UPDATE destino SET nome_destino = $1, valor_excursao = $2, minimo_passageiro_excursao = $3, maximo_passageiro_excursao = $4 WHERE id_destino = $5",
        [nome_destino, parseInt(valor_excursao), minimo_passageiro_excursao, maximo_passageiro_excursao, id_destino]
    );
        res.status(200).redirect('/destinos?success=true');        
}

exports.deleteDestinoById = async (req, res) => {
    id_destino = parseInt(req.query.destino);
    const response = await db.query('DELETE FROM destino WHERE id_destino = $1', [id_destino]);
    res.status(200).redirect('/destinos?deleted=true')
}