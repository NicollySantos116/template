'use client';

import FormModal from '@components/FormModal';
import ConfirmDelete from '@components/ConfirmDelete';
import { Button, Card, Skeleton } from 'antd';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ReadByPage() {
    const { id } = useParams();

    const [serie, setSerie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        async function buscarSerie() {
            setLoading(true);

            try {
                const response = await axios.get(
                    `/api/series/${id}`
                );

                setSerie(response.data);
            } catch (error) {
                setSerie(null);

                if (error.response?.status === 404) {
                    toast.error('Série não encontrada.', {
                        id: 'read-id',
                    });
                } else {
                    toast.error('Erro ao buscar a série.', {
                        id: 'read-id',
                    });
                }

                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            buscarSerie();
        } else {
            setLoading(false);
        }
    }, [id]);

    const handleUpdate = async (values) => {
        setSaving(true);

        try {
            const response = await axios.put(
                `/api/series/${id}`,
                values
            );

            setSerie((prev) => ({
                ...prev,
                ...values,
                ...response.data,
            }));

            setEditOpen(false);

            toast.success('Série atualizada com sucesso!', {
                id: 'update-success',
            });
        } catch (error) {
            if (error.response?.status === 404) {
                toast.error(
                    'Série ou rota de atualização não encontrada.',
                    { id: 'update-error' }
                );
            } else {
                toast.error('Erro ao atualizar a série.', {
                    id: 'update-error',
                });
            }

            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        setDeleting(true);

        try {
            await axios.delete(`/api/series/${id}`);

            setSerie(null);
            setDeleteOpen(false);

            toast.success('Série excluída com sucesso!', {
                id: 'delete-success',
            });
        } catch (error) {
            if (error.response?.status === 404) {
                toast.error(
                    'Série ou rota de exclusão não encontrada.',
                    { id: 'delete-error' }
                );
            } else {
                toast.error('Erro ao excluir a série.', {
                    id: 'delete-error',
                });
            }

            console.error(error);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <main>
            <h2>Buscar série por ID</h2>

            <p>
                O navegador busca, edita e exclui pelo endpoint
                /api/series/{id}. O servidor acessa a API usando
                a chave privada.
            </p>

            <p>
                Abra o DevTools, na aba Network, para conferir as
                requisições GET, PUT e DELETE, sem expor a x-api-key
                privada no navegador.
            </p>

            {loading ? (
                <div className="skeleton">
                    <Skeleton active />
                </div>
            ) : serie ? (
                <>
                    <Card title={serie.title}>
                        <p>Gênero: {serie.genero}</p>
                        <p>Plataforma: {serie.plataforma}</p>
                        <p>
                            Temporadas: {serie.numero_temporada}
                        </p>
                        <p>
                            Ano de lançamento: {serie.ano_lancamento}
                        </p>
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
                        onSubmit={handleUpdate}
                        onCancel={() => setEditOpen(false)}
                    />

                    <ConfirmDelete
                        openModal={deleteOpen}
                        serie={serie}
                        confirmLoading={deleting}
                        onSubmit={handleDelete}
                        onCancel={() => setDeleteOpen(false)}
                    />
                </>
            ) : (
                <p>Série não encontrada ou indisponível.</p>
            )}
        </main>
    );
}
