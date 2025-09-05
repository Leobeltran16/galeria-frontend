import React, { useEffect, useState } from "react";
import { api } from "./services/api";
import UploadForm from "./components/UploadForm";
import GalleryGrid from "./components/GalleryGrid";

export default function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/api/images").then(({ data }) => setItems(data));
  }, []);

  return (
    <main className="container">
      <h1>Galería de Imágenes</h1>
      <UploadForm onUploaded={(img) => setItems((prev) => [img, ...prev])} />
      <GalleryGrid items={items} setItems={setItems} />
    </main>
  );
}
