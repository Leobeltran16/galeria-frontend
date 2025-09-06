import { useEffect, useState } from "react";
import { getImages } from "../services/api";

export default function GalleryGrid() {
  const [items, setItems] = useState([]);   // siempre un array
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load(first = false) {
    try {
      setError("");
      setLoading(true);
      const data = await getImages(first ? null : next);
      if (first) setItems(Array.isArray(data.images) ? data.images : []);
      else setItems(prev => [...prev, ...(Array.isArray(data.images) ? data.images : [])]);
      setNext(data.next || null);
    } catch (e) {
      console.error("getImages error:", e);
      setError(e?.message || "No se pudo cargar la galería");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(true);
  }, []);

  const safeItems = Array.isArray(items) ? items : [];

  return (
    <section>
      {error && (
        <div style={{ background: "#fee", color: "#900", padding: 8, borderRadius: 8, marginBottom: 12 }}>
          {error}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 12,
          alignItems: "start",
        }}
      >
        {safeItems.map(img => (
          <img
            key={img.public_id || img.url}
            src={img.url}
            alt={img.public_id || "image"}
            style={{ width: "100%", borderRadius: 8, display: "block" }}
            loading="lazy"
          />
        ))}
      </div>

      <div style={{ marginTop: 12 }}>
        {loading && <span>Cargando...</span>}
        {!loading && !safeItems.length && !error && <span>No hay imágenes aún.</span>}
        {next && !loading && (
          <button onClick={() => load(false)}>
            Cargar más
          </button>
        )}
      </div>
    </section>
  );
}
