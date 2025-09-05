import React from "react";
import { api } from "../services/api";

export default function GalleryGrid({ items, setItems }) {
  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar imagen?")) return;
    await api.delete(`/api/images/${id}`);
    setItems((prev) => prev.filter((i) => i._id !== id));
  };

  return (
    <div className="grid">
      {items.map((img) => (
        <figure key={img._id} className="card">
          {/* NITIDEZ: cuadrado, contain */}
          <img
            src={`${api.defaults.baseURL}${img.url}`}
            alt={img.titulo || "imagen"}
            width="1024"
            height="1024"
            loading="lazy"
          />
          <figcaption>
            <strong>{img.titulo || "Sin título"}</strong>
            <button onClick={() => handleDelete(img._id)}>Borrar</button>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
