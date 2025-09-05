import React, { useState } from "react";
import { api } from "../services/api";

export default function UploadForm({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [subiendo, setSubiendo] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const form = new FormData();
    form.append("file", file);
    form.append("titulo", titulo);

    try {
      setSubiendo(true);
      const { data } = await api.post("/api/images", form, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      onUploaded?.(data);
      setFile(null);
      setTitulo("");
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título (opcional)"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <input
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button disabled={!file || subiendo}>
        {subiendo ? "Subiendo..." : "Subir imagen"}
      </button>
    </form>
  );
}
