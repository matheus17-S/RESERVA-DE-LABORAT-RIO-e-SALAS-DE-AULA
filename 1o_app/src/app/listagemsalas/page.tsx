interface DadosDasSalas {
  codigo: number;
  nome: string;
  localizacao: string;
  capacidade: string;
}

export default async function Usuarios() {

  const response = await fetch("http://localhost:8080/salas");

  const dados: DadosDasSalas[] = await response.json();

  console.log("Dados das SALAS vindo do JSON da API");
  console.log(dados);

  return (
    <div>

      <h2 className="text-center mt-5 mb-2 font-bold text-2xl">
        Listagem das SALAS cadastradas no BD
      </h2>

      <div className="flex flex-col gap-4 mx-2">

        {
          dados.map((registro) => (

            <div
              key={registro.codigo}
              className="bg-gray-200 p-4 rounded-md"
            >

              <h4>
                ID: {registro.codigo}
              </h4>
              <h2>
                Nome: {registro.nome}
              </h2>
              <p>
                Localização: {registro.localizacao}
              </p>

              <p>
                Capacidade: {registro.capacidade}
              </p>

            </div>

          ))
        }

      </div>

    </div>
  );
}
