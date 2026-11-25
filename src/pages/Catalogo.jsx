import { useEffect, useState } from "react";
import { ProductoCard } from "../components/ProductoCard";

const API_URL = import.meta.env.VITE_API_URL || "/api/productos";

export function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function cargarProductos() {
      try {
        const respuesta = await fetch(API_URL, { signal: controller.signal });
        if (!respuesta.ok) {
          throw new Error(`El servidor respondió con estado ${respuesta.status}.`);
        }

        const datos = await respuesta.json();
        if (!Array.isArray(datos)) {
          throw new Error("La respuesta del servidor no tiene el formato esperado.");
        }

        setProductos(datos);
      } catch (errorCarga) {
        if (errorCarga.name !== "AbortError") {
          setError(errorCarga.message || "No se pudo cargar el catálogo.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarProductos();
    return () => controller.abort();
  }, []);

  return (
    <section>
      <h2>Catálogo de Productos</h2>
      {cargando && <p className="estado-catalogo">Cargando productos...</p>}
      {!cargando && error && (
        <p className="estado-catalogo error" role="alert">
          No se pudo cargar el catálogo: {error}
        </p>
      )}
      {!cargando && !error && productos.length === 0 && (
        <p className="estado-catalogo">No hay productos disponibles.</p>
      )}
      {!cargando && !error && productos.length > 0 && (
        <div className="grid-productos">
          {productos.map((prod) => (
            <ProductoCard key={prod.id} producto={prod} />
          ))}
        </div>
      )}
    </section>
  );
}
