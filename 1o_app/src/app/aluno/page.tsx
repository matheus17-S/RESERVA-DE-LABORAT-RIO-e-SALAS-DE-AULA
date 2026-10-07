interface DadosDosAlunos {
  id            : number;
  RA            : string;
  nome          : string;
  datanascimento: string;
  email         : string;
  celular       : string;
  idcurso       : number;
} 
 
 export default async function Aluno() 
 {
    // gerar uma requisição HTTP
    const response = await fetch("http://localhost:8080/usuarios");

    // dados é uma lista quer receberá os dados vindo do json da API
    const dados: DadosDosAlunos[] = await response.json()
    console.log("Dados dos ALUNOS vindo do JSON da API");
    console.log(dados);

    return (
      <div>
        <h2 className="text-center mt-5 mb-2 font-bold text-2xl">
          Listagem dos ALUNOS cadastrados no BD (tabela ALUNO)
        </h2>
        <div>
            <p>Se desejar, escolha o RA de um ALUNO</p>
            <select name="ra">
            {
            dados.map((registro) => (
              <div key={registro.id}>
              <option value={registro.id}>{registro.RA}</option>
              </div>
            ))
            }
            </select>
        </div>

        <br></br>
        <br></br>
        <div className="flex flex-col gap-4 mx-2">
          {
            dados.map((registro) => (
              <div key={registro.id} className="bg-gray-200 p-4 rounded-md">
                <h4>
                  ID: {registro.id}
                </h4>
                <h2 className="font-bold">
                  RA: {registro.RA}
                </h2>
                <p>Nome: {registro.nome} </p>
                <p>Data de Nascimento: { registro.datanascimento } </p>
                <p>E-mail: {registro.email} </p>
                <p>Celular: {registro.celular} </p>
                <p>Código do Curso: {registro.idcurso} </p>
              </div>
            ))
          }
        </div>
        <br></br>
        <br></br>
      </div>
    );
}
