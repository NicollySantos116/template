"use client";

import FormModal from "@components/FormModal";
import { Button, Card, Skeleton } from "antd";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ReadByPage() {
    const { id } = useParams();

    const [serie, setSeries] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        async function buscarSeries() {
            try {
                const response = await axios.get(`/api/series/${id}`);
                setSeries(response.data);
            } catch (error) {
                toast.error("Série não encontrada.", {
                    id: "read-id",
                });
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        buscarSeries();
    }, [id]);

    return (
        <main>
            <h2>Get By Id - read</h2>

            <p>
                O navegador busca, edita e exclui pelo /api/series/{id} (nosso
                route.js); o servidor fala direto com a API usando a api-key
                privada.
            </p>

            <p>
                Abra o DevTools - Network: aparece a série (GET/PUT/DELETE),
                sem x-api-key.
            </p>

            {loading ? (
                <div className="skeleton">
                    <Skeleton active />
                </div>
            ) : (
                serie && (
                    <>
                        <Card title={serie.title}>
                            <p>Gênero: {serie.genero}</p>
                            <p>Plataforma: {serie.plataforma}</p>
                            <p>Temporadas: {serie.numero_temporada}</p>
                            <p>Ano do lançamento: {serie.ano_lancamento}</p>
                        </Card>

                        <div className="actions">
                            <Button
                                type="primary"
                                onClick={() => setEditOpen(true)}
                            >
                                Editar
                            </Button>

                            <Button
                                danger
                                onClick={() => setDeleteOpen(true)}
                            >
                                Excluir
                            </Button>
                        </div>

                        <FormModal
                            openModal={editOpen}
                            serie={serie}
                            confirmLoading={saving}
                            onCancel={() => setEditOpen(false)}
                        />
                    </>
                )
            )}
        </main>
    );
}
