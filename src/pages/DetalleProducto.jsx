import { useParams, Link } from "react-router-dom";
import { productos } from "../data/productos";

export function DetalleProducto() {
  // Obtenemos el "id" que viene en la URL (ej: /producto/2)
  const { id } = useParams();
  
  // Buscamos el producto que coincida con ese id
  const producto = productos.find((p) => p.id === Number(id));

  // Si alguien escribe una URL inválida (ej: /producto/999)
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
