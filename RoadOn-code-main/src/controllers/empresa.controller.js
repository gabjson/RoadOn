const db = require("../database");
const bcrypt = require('bcryptjs');
// ==> Método responsável por criar uma nova Empresa':

exports.createEmpresa = async (req, res, next) => {   
  const { nome_empresa, cnpj_empresa, telefone_empresa, email_empresa, senha_empresa } = req.body;
  const senhaHash = bcrypt.hashSync(senha_empresa, 10);
  try {
    const { rows } = await db.query(
      "INSERT INTO empresa (nome_empresa, cnpj_empresa, telefone_empresa, email_empresa, senha_empresa) VALUES ($1, $2, $3, $4, $5)",
      [nome_empresa, cnpj_empresa, telefone_empresa, email_empresa, senhaHash]      
    );
    res.status(201).redirect('/login?success=true')    
  } 
  catch (error) {
    switch (error.code) {
      case '23505':
        res.status(403).redirect('/registrar-empresa?exists=true')
          break;
      default:
        res.status(500).redirect('/registrar-empresa?erro=true')
    }
  }
};

// ==> Método responsável por listar todos as Empresas':

exports.listAllEmpresas = async (req, res) => {
  const response = await db.query('SELECT * FROM empresa ORDER BY nome_empresa ASC');
  res.status(200).send(response.rows);
};

// ==> Método responsável por selecionar Empresa pelo 'Id':

exports.findEmpresaById = async (req, res) => {
  const { id_empresa } = req.user; 
  const response = await db.query('SELECT * FROM empresa WHERE id_empresa = $1', [id_empresa]);
  if (req.query.exists)
    res.status(200).render('alterar-empresa.ejs', { model: response.rows, error: false, exists: true, title: 'RoadOn - Alterar Empresa' })
  else if (req.query.error)
    res.status(200).render('alterar-empresa.ejs', { model: response.rows, error: true, exists: false, title: 'RoadOn - Alterar Empresa' })
  else
    res.status(200).render('alterar-empresa.ejs', { model: response.rows, error: false, exists: false, title: 'RoadOn - Alterar Empresa' })
}

// ==> Método responsável por atualizar uma Empresa pelo 'Id':

exports.updateEmpresaById = async (req, res) => {
  const id_empresa = parseInt(req.query.empresa);
  const { nome_empresa, cnpj_empresa, telefone_empresa, email_empresa, senha_empresa } = req.body;
  const senhaHash = bcrypt.hashSync(senha_empresa.toString(), 10);
  try {
    const response = await db.query(
      "UPDATE empresa SET nome_empresa = $1, cnpj_empresa = $2, telefone_empresa = $3, email_empresa = $4, senha_empresa = $5 WHERE id_empresa = $6",
      [nome_empresa, cnpj_empresa, telefone_empresa, email_empresa, senhaHash, id_empresa]
    );
    res.status(200).redirect('/dashboard?success=true');    
  } catch (error) {
      switch (error.code) {
        case '23505':
          res.status(403).redirect('/alterar-empresa?exists=true')
          break;
        default:
          res.status(500).redirect('/alterar-empresa?error=true')
    }
  }
};

// ==> Método responsável por excluir uma 'Empresa' pelo 'Id':

exports.deleteEmpresaById = async (req, res) => {
  const id_empresa = parseInt(req.query.empresa);
  await db.query('DELETE FROM empresa WHERE id_empresa = $1', [
    id_empresa
  ]);
  res.status(200).redirect('/logout');
};