"use client";

import { useState } from "react";

export default function cadastroDeSalas() {

    const [codigo, setCodigo] = useState("");
    const [nome, setNome] = useState("");
    const [capacidade, setCapacidade] = useState("");
    const [localizacao, setLocalizacao] = useState("");

    async function cadastrarSala(event: React.FormEvent) {
        event.preventDefault();

        const resposta = await fetch("http://localhost:8080/salas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                codigo: codigo,
                nome: nome,
                capacidade: Number(capacidade),
                localizacao: localizacao
            })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            alert("Sala cadastrada com sucesso!");

            setCodigo("");
            setNome("");
            setCapacidade("");
            setLocalizacao("");
        } else {
            alert(dados.erro);
        }
    }

    return (
        <div>
            <h2 className="text-center mt-5 mb-5 font-bold text-2xl">
                Cadastro de Sala
            </h2>

            <form
                onSubmit={cadastrarSala}
                className="flex flex-col gap-4 bg-gray-200 p-6 rounded-md max-w-md mx-auto"
            >

                <div>
                    <label>Código:</label>

                    <input
                        type="text"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label>Nome:</label>

                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label>Capacidade:</label>

                    <input
                        type="number"
                        value={capacidade}
                        onChange={(e) => setCapacidade(e.target.value)}
                        required
                        min="1"
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label>Localização:</label>

                    <input
                        type="text"
                        value={localizacao}
                        onChange={(e) => setLocalizacao(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded font-bold"
                >
                    Cadastrar Sala
                </button>

            </form>
        </div>
    );
}