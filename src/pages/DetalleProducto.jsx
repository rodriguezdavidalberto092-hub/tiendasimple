import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { obtenerProductos } from "../api/productos";

export function DetalleProducto() {
  const { id } = useParams();
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
          setError(errorCarga.message || "No se pudo cargar el producto.");
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

  const producto = productos.find((item) => item.id === Number(id));

  if (cargando) {
    return <p className="estado-catalogo">Cargando producto...</p>;
  }

  if (error) {
    return (
      <div className="detalle-container">
        <p className="error" role="alert">
          No se pudo cargar el producto: {error}
        </p>
        <Link to="/" className="btn btn-secundario">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="detalle-container">
        <h2>Producto no encontrado</h2>
        <Link to="/" className="btn">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="detalle-container">
      <span className="badge">{producto.categoria}</span>
      <h2>{producto.nombre}</h2>
      <p className="precio-grande">${producto.precio.toLocaleString("es-AR")}</p>
      <p>{producto.descripcion}</p>
      <p><strong>Stock disponible:</strong> {producto.stock} unidades</p>
      
      <Link to="/" className="btn btn-secundario">
        ← Volver al catálogo
      </Link>
    </div>
  );
}
