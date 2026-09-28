"use client";

import FormModal from "@components/FormModal";
import { Button } from "antd";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreatePage() {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      console.log("Dados enviados:", values);

      await axios.post("/api/series", values);

      setOpenModal(false);
      toast.success("Série criada!", { id: "create" });
    } catch (error) {
      toast.error("Erro ao criar a série.", { id: "create" });
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h2>Post - Create</h2>

      <p>
        O navegador envia o formulário (modal) para /api/series (nosso
        route.js); o servidor cria a série na API com a api-key privada.
      </p>

      <p>
        Abra o DevTools → Network → series → Payload: os dados enviados, sem
        x-api-key.
      </p>

      <Button onClick={() => setOpenModal(true)}>
        Adicionar Série
      </Button>

      <FormModal
        openModal={openModal}
        confirmLoading={loading}
        onSubmit={handleSubmit}
        onCancel={() => setOpenModal(false)}
      />
    </main>
  );
}