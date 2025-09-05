import axios from "axios";

// Usa variable de entorno en Vercel: VITE_API_URL=https://tu-backend.onrender.com
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000"
});
