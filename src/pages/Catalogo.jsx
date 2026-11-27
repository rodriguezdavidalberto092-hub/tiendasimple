import { useEffect, useState } from "react";
import { ProductoCard } from "../components/ProductoCard";
import { obtenerProductos } from "../api/productos";

export function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function cargarProductos() {
      try {
        setProductos(await obtenerProductos(controller.signal));
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
