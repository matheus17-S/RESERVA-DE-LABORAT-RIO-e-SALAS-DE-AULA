import 'dotenv/config';
import express from 'express';
import mssql from 'mssql';

const porta = process.env.PORTA;
const stringSQL = process.env.CONNECTION_STRING;

// configurações
const app = express();
app.use(express.json());

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

// definir rotas

app.get('/alunos', async (req, res) => {
    const conexao = await conectaBD();
    const result = await conexao.query("SELECT * from nodejs.aluno");
    res.json(result.recordset);
});

app.get('/alunos/:id', async (req, res) => {
    const idProcurado = req.params.id;
    const conexao = await conectaBD();
    const result = await conexao.query(`SELECT * from nodejs.aluno WHERE id=${idProcurado}`);
    res.json(result.recordset);
});


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

        const request = new mssql.Request();

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

        const request = new mssql.Request();

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

app.use('/', (req, res) => {
    return res.json({ message: "Servidor rodando" });
});
console.log("ROTAS DE SALAS ATIVAS");
// colocar servidor para atender requisições
app.listen(porta, () => console.log(`API funcionando!\nServidor rodando em: http://localhost:${porta}`));
