import { useState } from "react";
import { uploadImage } from "../services/api";

export default function UploadForm({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleUpload() {
    if (!file) return;
    setLoading(true);
    setMsg("");
    try {
      const { url } = await uploadImage(file);
      setMsg("Imagen subida");
      onUploaded?.(url);  // el padre puede refrescar la grilla
      setFile(null);
    } catch (e) {
      console.error("uploadImage error:", e);
      setMsg(e?.message || "Error subiendo imagen");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0] || null)} />
      <button disabled={!file || loading} onClick={handleUpload}>
        {loading ? "Subiendo..." : "Subir imagen"}
      </button>
      {msg && <small>{msg}</small>}
    </div>
  );
}
