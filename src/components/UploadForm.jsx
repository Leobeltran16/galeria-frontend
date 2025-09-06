import { useState } from "react";
import { uploadImage } from "../services/api";

export default function UploadForm({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleUpload() {
    if (!file) return;
    setLoading(true);
    setMsg("");
    try {
      await uploadImage(file, title);
      setMsg("Imagen subida");
      setFile(null);
      setTitle("");
      onUploaded?.(); // refresca la grilla
    } catch (e) {
      setMsg(e?.message || "Error subiendo imagen");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
      <input
        type="text"
        placeholder="Título (opcional)"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ padding: 6, minWidth: 220 }}
      />
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0] || null)} />
      <button disabled={!file || loading} onClick={handleUpload}>
        {loading ? "Subiendo..." : "Subir imagen"}
      </button>
      {msg && <small>{msg}</small>}
    </div>
  );
}
