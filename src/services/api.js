import axios from "axios";

const baseURL =
  (import.meta.env.VITE_API || "https://galeria-backend-fsdl.onrender.com")
    .replace(/\/+$/, "");

export const api = axios.create({
  baseURL,
  withCredentials: false,
});

// GET lista de imágenes (siempre devuelve { images: [], next })
export async function getImages(next) {
  const url = next ? `/api/images?next=${encodeURIComponent(next)}` : "/api/images";
  const { data } = await api.get(url);

  // defensa por si viene 404 en HTML o estructura inesperada
  const ok = data && typeof data === "object" && data.ok !== false;
  const images = ok && Array.isArray(data?.images) ? data.images : [];
  const cursor = ok && typeof data?.next === "string" ? data.next : null;

  return { images, next: cursor };
}

// POST subir imagen (campo "image") — retorna { url } o lanza error
export async function uploadImage(file) {
  const form = new FormData();
  form.append("image", file);

  const { data } = await api.post("/api/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (!data || !data.url) {
    throw new Error(data?.error || "Respuesta inválida del servidor");
  }
  return { url: data.url, public_id: data.public_id || null };
}
