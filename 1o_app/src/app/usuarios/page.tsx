"use client";

import { useState } from "react";

export default function Usuarios() {
    const [formulario, setFormulario] = useState({
        cpf: "",
        nome_completo: "",
        data_aniversario: "",
        celular: "",
        email: "",
        login: "",
        senha: ""
    });

    const [mensagem, setMensagem] = useState("");

    function alterarCampo(e: React.ChangeEvent<HTMLInputElement>) {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    }

    async function cadastrarUsuario(e: React.FormEvent) {
        e.preventDefault();

        try {
            const resposta = await fetch("http://localhost:8080/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formulario)
            });

            const dados = await resposta.json();

            if (resposta.ok) {
                setMensagem("Usuário cadastrado com sucesso!");

                setFormulario({
                    cpf: "",
                    nome_completo: "",
                    data_aniversario: "",
                    celular: "",
                    email: "",
                    login: "",
                    senha: ""
                });
            } else {
                setMensagem(dados.erro || "Erro ao cadastrar usuário.");
            }

        } catch (erro) {
            setMensagem("Não foi possível conectar com a API.");
        }
    }

    return (
        <main>
            <h1>Cadastro de Usuário</h1>

            <form onSubmit={cadastrarUsuario}>

                <div>
                    <label>CPF</label>
                    <input
                        type="text"
                        name="cpf"
                        value={formulario.cpf}
                        onChange={alterarCampo}
                    />
                </div>

                <div>
                    <label>Nome completo</label>
                    <input
                        type="text"
                        name="nome_completo"
                        value={formulario.nome_completo}
                        onChange={alterarCampo}
                    />
                </div>

                <div>
                    <label>Data de aniversário</label>
                    <input
                        type="date"
                        name="data_aniversario"
                        value={formulario.data_aniversario}
                        onChange={alterarCampo}
                    />
                </div>

                <div>
                    <label>Celular</label>
                    <input
                        type="text"
                        name="celular"
                        value={formulario.celular}
                        onChange={alterarCampo}
                    />
                </div>

                <div>
                    <label>E-mail</label>
                    <input
                        type="email"
                        name="email"
                        value={formulario.email}
                        onChange={alterarCampo}
                    />
                </div>

                <div>
                    <label>Login</label>
                    <input
                        type="text"
                        name="login"
                        value={formulario.login}
                        onChange={alterarCampo}
                    />
                </div>

                <div>
                    <label>Senha</label>
                    <input
                        type="password"
                        name="senha"
                        value={formulario.senha}
                        onChange={alterarCampo}
                    />
                </div>

                <button type="submit">
                    Cadastrar usuário
                </button>

            </form>

            {mensagem && <p>{mensagem}</p>}
        </main>
    );
}