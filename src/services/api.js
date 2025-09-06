import axios from "axios";

const baseURL =
  (import.meta.env.VITE_API || "https://galeria-backend-fsdl.onrender.com")
    .replace(/\/+$/, "");

export const api = axios.create({
  baseURL,
  withCredentials: false,
});

// GET imágenes (siempre retornamos { images: [], next })
export async function getImages(next) {
  const url = next ? `/api/images?next=${encodeURIComponent(next)}` : "/api/images";
  const { data } = await api.get(url);

  const ok = data && typeof data === "object" && data.ok !== false;
  const images = ok && Array.isArray(data?.images) ? data.images : [];
  const cursor = ok && typeof data?.next === "string" ? data.next : null;

  return { images, next: cursor };
}

// POST subir imagen con título
export async function uploadImage(file, title = "") {
  const form = new FormData();
  form.append("image", file);
  form.append("title", title);

  const { data } = await api.post("/api/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (!data || !data.url) {
    throw new Error(data?.error || "Respuesta inválida del servidor");
  }
  return { url: data.url, public_id: data.public_id || null, title: data.title || "" };
}

// DELETE imagen por public_id
export async function deleteImage(publicId) {
  const { data } = await api.delete(`/api/images/${encodeURIComponent(publicId)}`);
  if (!data?.ok) throw new Error(data?.error || "No se pudo borrar");
  return true;
}
