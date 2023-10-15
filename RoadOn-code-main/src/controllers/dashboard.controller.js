const db = require('../database')

exports.populaDados = async (req, res) => {
    const { id_empresa } = req.user;
    const pendentes = await db.query('SELECT COUNT(id_excursao) as agendamentos FROM Agenda_Excursao WHERE data_saida_excursao > CURRENT_DATE AND id_empresa = $1', [id_empresa]);
    const realizados = await db.query('SELECT COUNT(id_excursao) as agendamentos FROM Agenda_Excursao WHERE data_saida_excursao < CURRENT_DATE AND id_empresa = $1', [id_empresa]);
    const lucroAnual = await db.query('SELECT TRUNC(SUM(destino.valor_excursao/12), 2) AS qtd FROM destino JOIN agenda_excursao ON agenda_excursao.id_destino = destino.id_destino WHERE agenda_excursao.id_empresa  = $1', [id_empresa])
    const lucroViagem = await db.query('SELECT TRUNC(SUM(destino.valor_excursao / (SELECT COUNT(id_excursao) FROM Agenda_Excursao)), 2) AS qtd FROM destino JOIN agenda_excursao ON agenda_excursao.id_destino = destino.id_destino WHERE agenda_excursao.id_empresa  = $1', [id_empresa])
    const dadosEmpresa = await db.query('SELECT * FROM empresa WHERE id_empresa = $1', [id_empresa]);

    // ==> Dados Gráficos
    const dadosJaneiro = await db.query('SELECT SUM(destino.valor_excursao), EXTRACT(MONTH FROM agenda_excursao.data_saida_excursao) as mes FROM destino JOIN agenda_excursao on agenda_excursao.id_destino = destino.id_destino WHERE EXTRACT(MONTH FROM agenda_excursao.data_saida_excursao) = 1 AND agenda_excursao.id_empresa = $1 GROUP BY mes', [id_empresa])
    const dadosFevereiro = await db.query('SELECT SUM(destino.valor_excursao), EXTRACT(MONTH FROM agenda_excursao.data_saida_excursao) as mes FROM destino JOIN agenda_excursao on agenda_excursao.id_destino = destino.id_destino WHERE EXTRACT(MONTH FROM agenda_excursao.data_saida_excursao) = 2 AND agenda_excursao.id_empresa = $1 GROUP BY mes', [id_empresa])
    const dadosMarco = await db.query('SELECT SUM(destino.valor_excursao), EXTRACT(MONTH FROM agenda_excursao.data_saida_excursao) as mes FROM destino JOIN agenda_excursao on agenda_excursao.id_destino = destino.id_destino WHERE EXTRACT(MONTH FROM agenda_excursao.data_saida_excursao) = 3 AND agenda_excursao.id_empresa = $1 GROUP BY mes', [id_empresa])
    const dadosAbril = await db.query('SELECT SUM(destino.valor_excursao), EXTRACT(MONTH FROM agenda_excursao.data_saida_excursao) as mes FROM destino JOIN agenda_excursao on agenda_excursao.id_destino = destino.id_destino WHERE EXTRACT(MONTH FROM agenda_excursao.data_saida_excursao) = 4 AND agenda_excursao.id_empresa = $1 GROUP BY mes', [id_empresa])
    const dadosMaio = await db.query('SELECT SUM(destino.valor_excursao), EXTRACT(MONTH FROM agenda_excursao.data_saida_excursao) as mes FROM destino JOIN agenda_excursao on agenda_excursao.id_destino = destino.id_destino WHERE EXTRACT(MONTH FROM agenda_excursao.data_saida_excursao) = 5 AND agenda_excursao.id_empresa = $1 GROUP BY mes', [id_empresa])
    const dadosJunho = await db.query('SELECT SUM(destino.valor_excursao), EXTRACT(MONTH FROM agenda_excursao.data_saida_excursao) as mes FROM destino JOIN agenda_excursao on agenda_excursao.id_destino = destino.id_destino WHERE EXTRACT(MONTH FROM agenda_excursao.data_saida_excursao) = 6 AND agenda_excursao.id_empresa = $1 GROUP BY mes', [id_empresa])
    const dadosJulho = await db.query('SELECT SUM(destino.valor_excursao), EXTRACT(MONTH FROM agenda_excursao.data_saida_excursao) as mes FROM destino JOIN agenda_excursao on agenda_excursao.id_destino = destino.id_destino WHERE EXTRACT(MONTH FROM agenda_excursao.data_saida_excursao) = 7 AND agenda_excursao.id_empresa = $1 GROUP BY mes', [id_empresa])
    const dadosAgosto = await db.query('SELECT SUM(destino.valor_excursao), EXTRACT(MONTH FROM agenda_excursao.data_saida_excursao) as mes FROM destino JOIN agenda_excursao on agenda_excursao.id_destino = destino.id_destino WHERE EXTRACT(MONTH FROM agenda_excursao.data_saida_excursao) = 8 AND agenda_excursao.id_empresa = $1 GROUP BY mes', [id_empresa])
    const dadosSetembro = await db.query('SELECT SUM(destino.valor_excursao), EXTRACT(MONTH FROM agenda_excursao.data_saida_excursao) as mes FROM destino JOIN agenda_excursao on agenda_excursao.id_destino = destino.id_destino WHERE EXTRACT(MONTH FROM agenda_excursao.data_saida_excursao) = 9 AND agenda_excursao.id_empresa = $1 GROUP BY mes', [id_empresa])
    const dadosOutubro = await db.query('SELECT SUM(destino.valor_excursao), EXTRACT(MONTH FROM agenda_excursao.data_saida_excursao) as mes FROM destino JOIN agenda_excursao on agenda_excursao.id_destino = destino.id_destino WHERE EXTRACT(MONTH FROM agenda_excursao.data_saida_excursao) = 10 AND agenda_excursao.id_empresa = $1  GROUP BY mes', [id_empresa])
    const dadosNovembro = await db.query('SELECT SUM(destino.valor_excursao), EXTRACT(MONTH FROM agenda_excursao.data_saida_excursao) as mes FROM destino JOIN agenda_excursao on agenda_excursao.id_destino = destino.id_destino WHERE EXTRACT(MONTH FROM agenda_excursao.data_saida_excursao) = 11 AND agenda_excursao.id_empresa = $1  GROUP BY mes', [id_empresa])
    const dadosDezembro = await db.query('SELECT SUM(destino.valor_excursao), EXTRACT(MONTH FROM agenda_excursao.data_saida_excursao) as mes FROM destino JOIN agenda_excursao on agenda_excursao.id_destino = destino.id_destino WHERE EXTRACT(MONTH FROM agenda_excursao.data_saida_excursao) = 12 AND agenda_excursao.id_empresa = $1  GROUP BY mes', [id_empresa])
    const dadosPizza = await db.query('SELECT agenda_excursao.id_destino, destino.nome_destino,COUNT(*) As QTD FROM agenda_excursao INNER JOIN destino ON destino.id_destino = agenda_excursao.id_destino AND agenda_excursao.id_empresa = $1 GROUP BY agenda_excursao.id_destino, destino.nome_destino ORDER BY QTD DESC LIMIT 3', [id_empresa])
    if (req.query.success){
        res.status(200).render('dashboard.ejs', 
            {
                modelPendentes: pendentes.rows, 
                modelRealizados: realizados.rows, 
                modelLucroAnual: lucroAnual.rows, 
                modelLucroViagem: lucroViagem.rows,
                modelJaneiro: dadosJaneiro.rows,
                modelFevereiro: dadosFevereiro.rows,
                modelMarco: dadosMarco.rows,
                modelAbril: dadosAbril.rows,
                modelMaio: dadosMaio.rows,
                modelJunho: dadosJunho.rows,
                modelJulho: dadosJulho.rows,
                modelAgosto: dadosAgosto.rows,
                modelSetembro: dadosSetembro.rows,
                modelOutubro: dadosOutubro.rows,
                modelNovembro: dadosNovembro.rows,
                modelDezembro: dadosDezembro.rows,
                modelPizza: dadosPizza.rows,
                modelEmpresa: dadosEmpresa.rows,
                title: 'RoadOn - Dashboard',
                success: true
            }
        )
    }
    else {
        res.status(200).render('dashboard.ejs', 
        {
            modelPendentes: pendentes.rows, 
            modelRealizados: realizados.rows, 
            modelLucroAnual: lucroAnual.rows, 
            modelLucroViagem: lucroViagem.rows,
            modelJaneiro: dadosJaneiro.rows,
            modelFevereiro: dadosFevereiro.rows,
            modelMarco: dadosMarco.rows,
            modelAbril: dadosAbril.rows,
            modelMaio: dadosMaio.rows,
            modelJunho: dadosJunho.rows,
            modelJulho: dadosJulho.rows,
            modelAgosto: dadosAgosto.rows,
            modelSetembro: dadosSetembro.rows,
            modelOutubro: dadosOutubro.rows,
            modelNovembro: dadosNovembro.rows,
            modelDezembro: dadosDezembro.rows,
            modelPizza: dadosPizza.rows,
            modelEmpresa: dadosEmpresa.rows,
            title: 'RoadOn - Dashboard',
            success: false
        }
    )

    }
}