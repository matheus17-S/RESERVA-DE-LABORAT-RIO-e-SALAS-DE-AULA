import Link from "next/link";

export function Header() 
{
  return (
    <header className="flex px-2 py-4 bg-blue-900 text-white">
      <div className="flex items-center justify-between w-full mx-auto max-w-3xl">
        <div className="flex px-2 py-4 bg--700 text-white">
          <h1 className="text-center font-bold mt-3 text-2xl">
            RESERVA DE LABORATÓRIO e SALAS DE AULA
          </h1>
        </div>
      </div>
      <nav>
        <ul className="flex items-center justify-center gap-10">
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/cadastrosalas">Cadastro de salas</Link>
          </li>
          <li>
            <Link href="/cadastrolaboratorio">Cadastro de laboratórios</Link>
          </li>
          <li>
            <Link href="/usuarios">Usuários</Link>
          </li>
          <li>
            <Link href="/listagemsalas">Salas</Link>
          </li>
          <li>
            <Link href="/laboratorios">Laboratórios</Link>
          </li>
          <li>
            <Link href="/quemsomos">QSomos</Link>
          </li>
          <li>
            <Link href="/contato">Contato</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
