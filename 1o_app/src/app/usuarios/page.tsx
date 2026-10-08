interface DadosDosUsuarios {
  id: number;
  cpf: string;
  nome_completo: string;
  data_aniversario: string;
  celular: string;
  email: string;
  login: string;
  data_cadastro: string;
}

export default async function Usuarios() {

  const response = await fetch("http://localhost:8080/usuarios");

  const dados: DadosDosUsuarios[] = await response.json();

  console.log("Dados dos USUÁRIOS vindo do JSON da API");
  console.log(dados);

  return (
    <div>

      <h2 className="text-center mt-5 mb-2 font-bold text-2xl">
        Listagem dos USUÁRIOS cadastrados no BD
      </h2>

      <div className="flex flex-col gap-4 mx-2">

        {
          dados.map((registro) => (

            <div
              key={registro.id}
              className="bg-gray-200 p-4 rounded-md"
            >

              <h4>
                ID: {registro.id}
              </h4>

              <h2 className="font-bold">
                Nome: {registro.nome_completo}
              </h2>

              <p>
                CPF: {registro.cpf}
              </p>

              <p>
                Data de aniversário: {registro.data_aniversario}
              </p>

              <p>
                E-mail: {registro.email}
              </p>

              <p>
                Celular: {registro.celular}
              </p>

              <p>
                Login: {registro.login}
              </p>

              <p>
                Data de cadastro: {registro.data_cadastro}
              </p>

            </div>

          ))
        }

      </div>

    </div>
  );
}
