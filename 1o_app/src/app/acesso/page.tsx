"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Acesso() {

    const router = useRouter();
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");


    async function fazerLogin(event: React.FormEvent) {

        event.preventDefault();

        const resposta = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                login: login,
                senha: senha
            })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
           alert("Login realizado com sucesso!");

            document.cookie = "usuario_logado=true; path=/";

            router.push("/");

            // Por enquanto, vamos apenas mostrar a mensagem.
            // Depois podemos redirecionar para a página inicial.
        } else {
            alert(dados.erro);
        }
    }

    return (
        <div className="flex flex-col items-center">

            <h2 className="text-center mt-5 mb-5 font-bold text-2xl">
                Acesso ao Sistema
            </h2>

            <form
                onSubmit={fazerLogin}
                className="flex flex-col gap-4 bg-gray-200 p-6 rounded-md w-96"
            >

                <div>
                    <label>Login:</label>

                    <input
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label>Senha:</label>

                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded font-bold"
                >
                    Entrar
                </button>

                <p className="text-center">
                    Ainda não possui cadastro?
                </p>

                <Link
                    href="/cadastro"
                    className="bg-green-600 text-white p-2 rounded text-center font-bold"
                >
                    Cadastrar usuário
                </Link>

            </form>

        </div>
    );
}