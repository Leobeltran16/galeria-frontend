import UploadForm from "./components/UploadForm";
import GalleryGrid from "./components/GalleryGrid";

export default function App() {
  // Si querés refrescar la grilla tras subir, podés manejar un "tick" en estado y pasarlo a GalleryGrid.
  return (
    <main style={{ padding: 16 }}>
      <h1>Galería de Imágenes</h1>
      <UploadForm />
      <hr style={{ margin: "16px 0" }} />
      <GalleryGrid />
    </main>
  );
}
