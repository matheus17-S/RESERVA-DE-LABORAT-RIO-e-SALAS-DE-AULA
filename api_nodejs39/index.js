import 'dotenv/config';
import express from 'express';
import mssql from 'mssql';
import cors from 'cors';

// configurações
const app = express();

app.use(cors());

console.log("CORS ATIVO - VERSAO NOVA DA API");

app.use(express.json());

const porta = process.env.PORTA;
const stringSQL = process.env.CONNECTION_STRING;

// conectar no BD
async function conectaBD() {
    try {
        const pool = await mssql.connect(stringSQL);
        return pool;
    } catch (erro) {
        console.log("Erro no acesso ao BD:", erro);
        throw erro;
    }
}

// rota usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const conexao = await conectaBD();

        const result = await conexao.query(`
            SELECT *
            FROM Usuario
        `);

        res.json(result.recordset);
    } catch (erro) {
        console.log("Erro ao buscar usuários:", erro);
        res.status(500).json({
            erro: "Erro ao buscar usuários"
        });
    }
});

//usuarios
app.post('/usuarios', async (req, res) => {
    try {
        const {
            cpf,
            nome_completo,
            data_aniversario,
            celular,
            email,
            login,
            senha
        } = req.body;

        const conexao = await conectaBD();

        await conexao.request()
            .input('cpf', mssql.VarChar(11), cpf)
            .input('nome_completo', mssql.VarChar(150), nome_completo)
            .input('data_aniversario', mssql.Date, data_aniversario)
            .input('celular', mssql.VarChar(20), celular)
            .input('email', mssql.VarChar(150), email)
            .input('login', mssql.VarChar(50), login)
            .input('senha', mssql.VarChar(255), senha)
            .query(`
                INSERT INTO Usuario
                (
                    cpf,
                    nome_completo,
                    data_aniversario,
                    celular,
                    email,
                    login,
                    senha
                )
                VALUES
                (
                    @cpf,
                    @nome_completo,
                    @data_aniversario,
                    @celular,
                    @email,
                    @login,
                    @senha
                )
            `);

        res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso"
        });

    } catch (erro) {
        console.error("ERRO COMPLETO:", erro);

        res.status(500).json({
            erro: erro.message
        });
    }
});

//rota laboroatorio
app.get('/laboratorios', async (req, res) => {
    try {
        const conexao = await conectaBD();

        const result = await conexao.query(`
            SELECT *
            FROM Laboratorio
        `);

        res.json(result.recordset);

    } catch (erro) {
        console.log("Erro ao buscar laboratórios:", erro);

        res.status(500).json({
            erro: "Erro ao buscar laboratórios"
        });
    }
});

//laboratorios
app.post('/laboratorios', async (req, res) => {
    try {
        const {
            codigo,
            nome,
            capacidade,
            localizacao
        } = req.body;

        const conexao = await conectaBD();

        const request = conexao.request();

        request.input('codigo', mssql.VarChar(20), codigo);
        request.input('nome', mssql.VarChar(100), nome);
        request.input('capacidade', mssql.Int, capacidade);
        request.input('localizacao', mssql.VarChar(150), localizacao);

        await request.query(`
            INSERT INTO Laboratorio
            (
                codigo,
                nome,
                capacidade,
                localizacao
            )
            VALUES
            (
                @codigo,
                @nome,
                @capacidade,
                @localizacao
            )
        `);

        res.status(201).json({
            mensagem: "Laboratório cadastrado com sucesso"
        });

    } catch (erro) {
        console.log("Erro ao cadastrar laboratório:", erro);

        res.status(500).json({
            erro: erro.message
        });
    }
});

//rota salas
app.get('/salas', async (req, res) => {
    try {
        const conexao = await conectaBD();

        const result = await conexao.query(`
            SELECT *
            FROM Sala
        `);

        res.json(result.recordset);

    } catch (erro) {
        console.log("Erro ao buscar salas:", erro);

        res.status(500).json({
            erro: "Erro ao buscar salas"
        });
    }
});

//salas
app.post('/salas', async (req, res) => {
    try {
        const {
            codigo,
            nome,
            capacidade,
            localizacao
        } = req.body;

       const conexao = await conectaBD();

       const request = conexao.request();

        request.input('codigo', mssql.VarChar(20), codigo);
        request.input('nome', mssql.VarChar(100), nome);
        request.input('capacidade', mssql.Int, capacidade);
        request.input('localizacao', mssql.VarChar(150), localizacao);

        await request.query(`
            INSERT INTO Sala
            (
                codigo,
                nome,
                capacidade,
                localizacao
            )
            VALUES
            (
                @codigo,
                @nome,
                @capacidade,
                @localizacao
            )
        `);

        res.status(201).json({
            mensagem: "Sala cadastrada com sucesso"
        });

    } catch (erro) {
        console.log("Erro ao cadastrar sala:", erro);

        res.status(500).json({
            erro: erro.message
        });
    }
});

//deletar salas
app.delete('/salas/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const request = new mssql.Request();

        request.input('id', mssql.Int, id);

        await request.query(`
            DELETE FROM Sala
            WHERE id = @id
        `);

        res.json({
            mensagem: "Sala excluída com sucesso"
        });

    } catch (erro) {
        console.log("Erro ao excluir sala:", erro);

        res.status(500).json({
            erro: erro.message
        });
    }
});

//status
app.get('/status', async (req, res) => {
    try {
        const conexao = await conectaBD();

        const result = await conexao.query(`
            SELECT *
            FROM Status
        `);

        res.json(result.recordset);

    } catch (erro) {
        console.log("Erro ao buscar status:", erro);

        res.status(500).json({
            erro: "Erro ao buscar status"
        });
    }
});

//login
app.post('/login', async (req, res) => {
    try {
        const { login, senha } = req.body;

        const conexao = await conectaBD();

        const request = new mssql.Request();

        request.input('login', mssql.VarChar(50), login);
        request.input('senha', mssql.VarChar(255), senha);

        const result = await request.query(`
            SELECT id, nome_completo, login
            FROM Usuario
            WHERE login = @login
            AND senha = @senha
        `);

        if (result.recordset.length === 0) {
            return res.status(401).json({
                erro: "Login ou senha incorretos"
            });
        }

        const usuario = result.recordset[0];

        // Registrar o acesso
        const acesso = new mssql.Request();

        acesso.input('usuario_id', mssql.Int, usuario.id);

        await acesso.query(`
            INSERT INTO AcessoUsuario
            (
                usuario_id
            )
            VALUES
            (
                @usuario_id
            )
        `);

        res.status(200).json({
            mensagem: "Login realizado com sucesso",
            usuario: usuario
        });

    } catch (erro) {
        console.log("Erro no login:", erro);

        res.status(500).json({
            erro: erro.message
        });
    }
});

// Cadastrar reserva
app.post('/reservas', async (req, res) => {
    try {
        const {
            data_inicio,
            data_fim,
            hora_inicio,
            hora_fim,
            usuario_id,
            laboratorio_id,
            sala_id,
            status_id
        } = req.body;

        // Verifica se foi informado exatamente um recurso
        const temLaboratorio = laboratorio_id != null && laboratorio_id !== "";
        const temSala = sala_id != null && sala_id !== "";

        if (temLaboratorio === temSala) {
            return res.status(400).json({
                erro: "Selecione um laboratório ou uma sala."
            });
        }

        if (new Date(data_fim) < new Date(data_inicio)) {
            return res.status(400).json({
                erro: "A data final não pode ser anterior à data inicial."
            });
        }

        if (hora_fim <= hora_inicio) {
            return res.status(400).json({
                erro: "O horário final deve ser posterior ao inicial."
            });
        }

        const request = new mssql.Request();

        request.input('data_inicio', mssql.Date, data_inicio);
        request.input('data_fim', mssql.Date, data_fim);
        request.input('hora_inicio', mssql.VarChar(8), hora_inicio);
        request.input('hora_fim', mssql.VarChar(8), hora_fim);
        request.input('usuario_id', mssql.Int, usuario_id);
        request.input(
            'laboratorio_id',
            mssql.Int,
            temLaboratorio ? Number(laboratorio_id) : null
        );
        request.input(
            'sala_id',
            mssql.Int,
            temSala ? Number(sala_id) : null
        );
        request.input('status_id', mssql.Int, status_id ?? 4);

        await request.query(`
            INSERT INTO Reserva (
                data_inicio,
                data_fim,
                hora_inicio,
                hora_fim,
                usuario_id,
                laboratorio_id,
                sala_id,
                status_id
            )
            VALUES (
                @data_inicio,
                @data_fim,
                @hora_inicio,
                @hora_fim,
                @usuario_id,
                @laboratorio_id,
                @sala_id,
                @status_id
            )
        `);

        return res.status(201).json({
            mensagem: "Reserva cadastrada com sucesso."
        });

    } catch (erro) {
        console.log("Erro ao cadastrar reserva:", erro);

        return res.status(500).json({
            erro: "Erro ao cadastrar reserva."
        });
    }
});

app.use('/', (req, res) => {
    return res.json({ message: "Servidor rodando" });
});
console.log("ROTAS DE SALAS ATIVAS");
// colocar servidor para atender requisições
app.listen(porta, () => console.log(`API funcionando!\nServidor rodando em: http://localhost:${porta}`));
