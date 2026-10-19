'use client';

import { Modal } from 'antd';

export default function ConfirmDelete({
    openModal,
    serie,
    confirmLoading,
    onSubmit,
    onCancel,
}) {
    return (
        <Modal
            title="Excluir série"
            open={openModal}
            confirmLoading={confirmLoading}
            onOk={onSubmit}
            onCancel={onCancel}
            okText="Excluir"
            cancelText="Cancelar"
            okButtonProps={{ danger: true }}
        >
            <p>
                Tem certeza de que deseja excluir a série{' '}
                <strong>{serie?.title || 'selecionada'}</strong>?
            </p>

            <p>Essa ação não poderá ser desfeita.</p>
        </Modal>
    );
}
