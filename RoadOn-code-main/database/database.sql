CREATE TABLE IF NOT EXISTS Empresa(
    id_empresa SERIAL NOT NULL PRIMARY KEY,
    nome_empresa VARCHAR(120) NOT NULL,
    cnpj_empresa VARCHAR(50) NOT NULL, 
    telefone_empresa VARCHAR(20) NOT NULL,
    email_empresa VARCHAR(240) NOT NULL,
    senha_empresa VARCHAR(250) NOT NULL,

    CONSTRAINT uq_email_empresa UNIQUE (email_empresa),
    CONSTRAINT uq_cnpj_empresa UNIQUE (cnpj_empresa)
);

CREATE TABLE IF NOT EXISTS Destino(
    id_destino SERIAL NOT NULL PRIMARY KEY,
    nome_destino VARCHAR(80) NOT NULL,
	id_empresa SERIAL NOT NULL,
    valor_excursao DECIMAL NOT NULL,
    minimo_passageiro_excursao INTEGER NOT NULL, 
    maximo_passageiro_excursao INTEGER NOT NULL, 
	
	CONSTRAINT fk_id_empresa FOREIGN KEY (id_empresa) REFERENCES Empresa(id_empresa) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Agenda_Excursao (
    id_excursao SERIAL NOT NULL PRIMARY KEY,
    id_destino SERIAL NOT NULL,
    id_empresa SERIAL NOT NULL,
    roteiro_excursao VARCHAR(500),
    data_saida_excursao TIMESTAMP NOT NULL,
    data_volta_excursao TIMESTAMP NOT NULL,

    CONSTRAINT fk_id_destino FOREIGN KEY (id_destino) REFERENCES Destino(id_destino) ON DELETE CASCADE,
    CONSTRAINT fk_id_empresa FOREIGN KEY (id_empresa) REFERENCES Empresa(id_empresa) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Pessoa (
    id_pessoa SERIAL NOT NULL PRIMARY KEY,
    data_nascimento DATE NOT NULL,
    nome_pessoa VARCHAR(240) NOT NULL,
    telefone_pessoa VARCHAR(20) NOT NULL,
    email_pessoa VARCHAR(240) NOT NULL
);

CREATE TABLE IF NOT EXISTS Pessoa_Excursao(
    id_pessoa SERIAL NOT NULL,
    id_excursao SERIAL NOT NULL,
	
    CONSTRAINT fk_id_pessoa FOREIGN KEY (id_pessoa) REFERENCES Pessoa(id_pessoa) ON DELETE CASCADE,
    CONSTRAINT fk_id_excursao FOREIGN KEY (id_excursao) REFERENCES Agenda_Excursao(id_excursao) ON DELETE CASCADE,
	CONSTRAINT pk_id_excursao_pessoa PRIMARY KEY (id_excursao, id_pessoa)
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
