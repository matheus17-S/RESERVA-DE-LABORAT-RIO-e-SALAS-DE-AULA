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
    try{
        await mssql.connect(stringSQL);
        return mssql;
    }
    catch(erro){
        console.log("Erro no acesso ao BD.", erro)
    }
}


// definir rotas
app.get('/alunos',async (req,res) => {
    const conexao = await conectaBD();
    const result = await conexao.query("SELECT * from nodejs.aluno");
    res.json(result.recordset);
})

app.get('/alunos/:id',async (req,res) => {
    const idProcurado = req.params.id;
    const conexao = await conectaBD();
    const result = await conexao.query(`SELECT * from nodejs.aluno WHERE id=${idProcurado}`);
    res.json(result.recordset);
})



app.use('/', (req,res) => {
    return res.json({ message: "Servidor rodando"})
})


// colocar servidor para atender requisições
app.listen(porta, () => console.log(`API funcionando!\nServidor rodando em: http://localhost:${porta}`));



