# Projeto NodeJS Primeiros Passos
- criar a pasta do projeto (api_nodejs)
- no terminal ou prompt, dentro da pasta, digitar o comando: *npm init -y*
- no terminal ou prompt instalar os pacotes: *npm install mssql express dotenv*
- abrir a pasta no Visual Studio Code e criar o arquivo .env na pasta raiz do projeto
- editar o arquivo *package.json* alterando a linha: "type": "module"
- criar o arquivo index.js e inserir os comandos para configurar e criar as rotas da API

## Executando a API
- no terminal e na pasta do projeto, digitar: *node index.js*

## Tabelas SQL Server
create schema nodejs

create table nodejs.curso (
	id int identity primary key,
	nome varchar(50) NOT NULL,
	codcurso int
)

insert into nodejs.curso (nome, codcurso) values
('Informática', 19),
('Desenvolvimento de Sistemas', 39),
('Eletro Eletrônica', 17),
('Alimentos', 16),
('Mecatrônica', 20)


create table nodejs.aluno (
	id int identity primary key,
	RA varchar(5) NOT NULL,
	nome varchar(50) NOT NULL,
	email varchar(50) NOT NULL,
	celular varchar(12) NOT NULL,
	codcurso int NOT NULL,
)

INSERT INTO nodejs.aluno (RA, nome, email, celular, codcurso) 
VALUES 
    ('12345', 'Ana Silva', 'ana.silva@email.com', '11987654321', 19),
    ('67890', 'Carlos Oliveira', 'carlos.oliveira@email.com', '19991234567', 39),
    ('11223', 'Mariana Santos', 'mariana.santos@email.com', '21976543210', 17),
    ('44556', 'Lucas Ferreira', 'lucas.ferreira@email.com', '31988776655', 16),
    ('77889', 'Beatriz Souza', 'beatriz.souza@email.com', '41999887766', 20);
