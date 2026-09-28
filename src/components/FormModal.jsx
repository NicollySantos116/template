'use client'

import { Form, Input, InputNumber, Modal } from 'antd';

export default function FormModal({ openModal, serie, confirmLoading, onSubmit, onCancel }) {
    const [form] = Form.useForm();

    return (
        <Modal
            open={openModal}
            title={serie ? 'Editar Série' : 'Adicionar Série'}
            centered
            onOk={() => form.submit()}
            onCancel={onCancel}
            confirmLoading={confirmLoading}
            destroyOnHidden >
            <Form form={form} layout='vertical' initialValues={serie} onFinish={onSubmit}>
                <Form.Item
                    name="title"
                    label="Título"
                    rules={[{
                        required: true,
                        min: 3,
                        max: 120,
                        message: 'Por favor, insira o título entre 3 e 120 caracteres!'
                    }]}
                >
                    <Input placeholder="ex: Grey's Anatomy" />
                </Form.Item>

                <Form.Item
                    name="genero"
                    label="Gênero"
                    rules={[{
                        required: true,
                        min: 3,
                        max: 120,
                        message: 'Por favor, insira o gênero entre 3 e 120 caracteres!'
                    }]}
                >
                    <Input placeholder="ex: Drama" />
                </Form.Item>

                <Form.Item
                    name="plataforma"
                    label="Plataforma"
                    rules={[{
                        required: true,
                        min: 3,
                        max: 120,
                        message: 'Por favor, insira a plataforma entre 3 e 120 caracteres!'
                    }]}
                >
                    <Input placeholder="ex: Disney Plus" />
                </Form.Item>

                <Form.Item
                    name="numero_temporadas"
                    label="Número de Temporadas"
                    rules={[{
                        required: true,
                        message: 'Por favor, insira o número de temporadas entre 1 e 100!'
                    }]}
                >
                    <InputNumber placeholder="ex: 23" min={1} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name="ano_lancamento"
                    label="Ano de Lançamento"
                    rules={[{
                        required: true,
                        message: 'Por favor, insira o ano de lançamento!'
                    }]}
                >
                    <InputNumber placeholder="ex: 2009" min={1900} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name="imageUrl"
                    label="URL da imagem"
                    rules={[
                        {
                            type: "url",
                            message: "Deve ser uma URL válida.",
                        },
                    ]}
                >
                    <Input placeholder="ex: https://codeverse.dev.br/breaking-bad.png" />
                </Form.Item>
            </Form>
        </Modal>
    );
}