import { useEffect, useState } from "react";
import { getImages, deleteImage } from "../services/api";

export default function GalleryGrid({ refreshKey = 0 }) {
  const [items, setItems] = useState([]);
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
      setError(e?.message || "No se pudo cargar la galería");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  async function handleDelete(public_id) {
    const ok = confirm("¿Borrar esta imagen?");
    if (!ok) return;
    try {
      await deleteImage(public_id);
      setItems(prev => prev.filter(it => it.public_id !== public_id));
    } catch (e) {
      alert(e?.message || "No se pudo borrar");
    }
  }

  return (
    <div>
      {error && (
        <div style={{ background: "#fee", color: "#900", padding: 8, borderRadius: 8, marginBottom: 12 }}>
          {error}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
          alignItems: "start",
        }}
      >
        {items.map(img => (
          <figure key={img.public_id || img.url} style={{ margin: 0 }}>
            <div style={{ position: "relative" }}>
              <img
                src={img.url}
                alt={img.title || img.public_id || "image"}
                style={{ width: "100%", borderRadius: 12, display: "block" }}
                loading="lazy"
              />
              <button
                onClick={() => handleDelete(img.public_id)}
                title="Borrar"
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  border: "none",
                  borderRadius: 8,
                  padding: "6px 10px",
                  cursor: "pointer",
                }}
              >
                🗑️
              </button>
            </div>
            <figcaption style={{ marginTop: 6, fontWeight: 600 }}>
              {img.title || "Sin título"}
            </figcaption>
          </figure>
        ))}
      </div>

      <div style={{ marginTop: 12 }}>
        {loading && <span>Cargando...</span>}
        {!loading && !items.length && !error && <span>No hay imágenes aún.</span>}
        {next && !loading && (
          <button onClick={() => load(false)}>
            Cargar más
          </button>
        )}
      </div>
    </div>
  );
}
