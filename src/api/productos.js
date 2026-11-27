const API_URL = import.meta.env.VITE_API_URL || "/api/productos";

export async function obtenerProductos(signal) {
  const respuesta = await fetch(API_URL, { signal });
  if (!respuesta.ok) {
    throw new Error(`El servidor respondió con estado ${respuesta.status}.`);
  }

  const datos = await respuesta.json();
  if (!Array.isArray(datos)) {
    throw new Error("La respuesta del servidor no tiene el formato esperado.");
  }

  return datos;
}
