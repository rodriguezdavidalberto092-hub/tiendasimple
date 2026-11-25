import { Link } from "react-router-dom";

export function ProductoCard({ producto }) {
  return (
    <article className="card">
      <h3>{producto.nombre}</h3>
      <p className="precio">${producto.precio.toLocaleString("es-AR")}</p>
      <p className="descripcion">{producto.descripcion}</p>
      
      {/* Link navega sin recargar la página */}
      <Link to={`/producto/${producto.id}`} className="btn">
        Ver detalle
      </Link>
    </article>
  );
}
