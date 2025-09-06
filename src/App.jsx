import { useState } from "react";
import UploadForm from "./components/UploadForm";
import GalleryGrid from "./components/GalleryGrid";
import "./styles.css"; // si tenés estilos

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  return (
    <main style={{ padding: 16, maxWidth: 1100, margin: "0 auto" }}>
      <h1>Galería de Imágenes</h1>
      <UploadForm onUploaded={() => setRefreshKey(k => k + 1)} />
      <hr style={{ margin: "16px 0" }} />
      <GalleryGrid refreshKey={refreshKey} />
    </main>
  );
}
