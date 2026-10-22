
"use client";

import { useEffect, useState } from "react";

interface Usuario {
    id: number;
    nome_completo: string;
}

interface Recurso {
    id: number;
    codigo: string;
    nome: string;
}

export default function Reservas() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [salas, setSalas] = useState<Recurso[]>([]);
    const [laboratorios, setLaboratorios] = useState<Recurso[]>([]);

    const [usuarioId, setUsuarioId] = useState("");
    const [tipoRecurso, setTipoRecurso] = useState("");
    const [recursoId, setRecursoId] = useState("");

    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFim, setHoraFim] = useState("");

    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        async function carregarDados() {
            try {
                const [resUsuarios, resSalas, resLaboratorios] =
                    await Promise.all([
                        fetch("http://localhost:8080/usuarios"),
                        fetch("http://localhost:8080/salas"),
                        fetch("http://localhost:8080/laboratorios")
                    ]);

                if (!resUsuarios.ok || !resSalas.ok || !resLaboratorios.ok) {
                    throw new Error("Não foi possível carregar os cadastros.");
                }

                setUsuarios(await resUsuarios.json());
                setSalas(await resSalas.json());
                setLaboratorios(await resLaboratorios.json());
            } catch (erro) {
                console.error(erro);
                setMensagem("Erro ao carregar usuários, salas ou laboratórios.");
            }
        }

        carregarDados();
    }, []);

    const recursos =
        tipoRecurso === "sala" ? salas : laboratorios;

    async function cadastrarReserva(
        evento: React.FormEvent<HTMLFormElement>
    ) {
        evento.preventDefault();
        setMensagem("");

        if (!usuarioId || !tipoRecurso || !recursoId) {
            setMensagem("Preencha o usuário e selecione um recurso.");
            return;
        }

        if (dataFim < dataInicio) {
            setMensagem("A data final não pode ser anterior à inicial.");
            return;
        }

        if (dataFim === dataInicio && horaFim <= horaInicio) {
            setMensagem("O horário final deve ser posterior ao inicial.");
            return;
        }

        const corpo = {
            data_inicio: dataInicio,
            data_fim: dataFim,
            hora_inicio: horaInicio,
            hora_fim: horaFim,
            usuario_id: Number(usuarioId),
            laboratorio_id:
                tipoRecurso === "laboratorio" ? Number(recursoId) : null,
            sala_id:
                tipoRecurso === "sala" ? Number(recursoId) : null,
            status_id: 4
        };

        try {
            const resposta = await fetch("http://localhost:8080/reservas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(corpo)
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                setMensagem(dados.erro || "Não foi possível cadastrar a reserva.");
                return;
            }

            setMensagem(dados.mensagem || "Reserva cadastrada com sucesso!");

            setUsuarioId("");
            setTipoRecurso("");
            setRecursoId("");
            setDataInicio("");
            setDataFim("");
            setHoraInicio("");
            setHoraFim("");
        } catch (erro) {
            console.error(erro);
            setMensagem("Não foi possível conectar à API.");
        }
    }

    return (
        <main className="mx-auto max-w-2xl p-6">
            <h1 className="mb-6 text-center text-2xl font-bold">
                Reserva de Laboratórios e Salas
            </h1>

            <form
                onSubmit={cadastrarReserva}
                className="flex flex-col gap-4 rounded-lg border p-6"
            >
                <div className="flex flex-col gap-1">
                    <label htmlFor="usuario">Usuário:</label>
                    <select
                        id="usuario"
                        value={usuarioId}
                        onChange={(e) => setUsuarioId(e.target.value)}
                        required
                        className="rounded border p-2"
                    >
                        <option value="">Selecione um usuário</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.nome_completo}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="tipoRecurso">Tipo de recurso:</label>
                    <select
                        id="tipoRecurso"
                        value={tipoRecurso}
                        onChange={(e) => {
                            setTipoRecurso(e.target.value);
                            setRecursoId("");
                        }}
                        required
                        className="rounded border p-2"
                    >
                        <option value="">Selecione o tipo</option>
                        <option value="sala">Sala de aula</option>
                        <option value="laboratorio">Laboratório</option>
                    </select>
                </div>

                {tipoRecurso !== "" && (
                    <div className="flex flex-col gap-1">
                        <label htmlFor="recurso">Recurso:</label>
                        <select
                            id="recurso"
                            value={recursoId}
                            onChange={(e) => setRecursoId(e.target.value)}
                            required
                            className="rounded border p-2"
                        >
                            <option value="">Selecione o recurso</option>
                            {recursos.map((recurso) => (
                                <option key={recurso.id} value={recurso.id}>
                                    {recurso.codigo} - {recurso.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="dataInicio">Data inicial:</label>
                        <input
                            id="dataInicio"
                            type="date"
                            value={dataInicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                            required
                            className="rounded border p-2"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="dataFim">Data final:</label>
                        <input
                            id="dataFim"
                            type="date"
                            value={dataFim}
                            onChange={(e) => setDataFim(e.target.value)}
                            min={dataInicio || undefined}
                            required
                            className="rounded border p-2"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="horaInicio">Hora inicial:</label>
                        <input
                            id="horaInicio"
                            type="time"
                            value={horaInicio}
                            onChange={(e) => setHoraInicio(e.target.value)}
                            required
                            className="rounded border p-2"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="horaFim">Hora final:</label>
                        <input
                            id="horaFim"
                            type="time"
                            value={horaFim}
                            onChange={(e) => setHoraFim(e.target.value)}
                            required
                            className="rounded border p-2"
                        />
                    </div>
                </div>

                <p className="text-sm">
                    O status inicial será Reservado.
                </p>

                <button
                    type="submit"
                    className="rounded bg-blue-600 p-3 font-bold text-white hover:bg-blue-700"
                >
                    Cadastrar reserva
                </button>

                {mensagem && (
                    <p role="status" className="text-center">
                        {mensagem}
                    </p>
                )}
            </form>
        </main>
    );
}
