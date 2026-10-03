import Link from "next/link";

export function Header() 
{
  return (
    <header className="flex px-2 py-4 bg-red-900 text-white">
      <div className="flex items-center justify-between w-full mx-auto max-w-3xl">
        <div className="flex px-2 py-4 bg-green-700 text-white">
          <h1 className="text-center font-bold mt-3 text-2xl">
            Aprendendo a trabalhar com NEXTJS
          </h1>
        </div>
      </div>
      <nav>
        <ul className="flex items-center justify-center gap-10">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/aluno">Aluno</Link>
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
