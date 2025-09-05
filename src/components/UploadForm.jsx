import React, { useState } from "react";
import api from "../services/api";

const UploadForm = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("titulo", titulo);

    try {
      setLoading(true);
      const { data } = await api.post("/images", formData);
      onUpload(data);
      setFile(null);
      setTitulo("");
    } catch (error) {
      console.error("Error al subir imagen:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit" disabled={loading}>
        {loading ? "Subiendo..." : "Subir imagen"}
      </button>
    </form>
  );
};

export default UploadForm;
