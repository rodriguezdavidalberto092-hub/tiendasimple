# TiendaSimple - TP2 Integrador

Aplicación React/Vite con una API Node.js que sirve el catálogo de productos.

## Estructura

- `src/`: frontend React.
- `backend/`: API HTTP y Dockerfile.
- `.github/workflows/build-backend.yml`: construye la imagen Docker del backend en cada push a `main`.
- `render.yaml`: definición del servicio de backend en Render, con despliegue automático.
- `netlify.toml`: configuración de build y rutas SPA para Netlify.

## Requisitos

- Node.js 22 o superior.
- Docker (opcional, para ejecutar el backend en contenedor).

## Ejecución local

En una terminal, iniciar la API:

```bash
cd backend
npm install
npm run dev
```

En otra terminal, iniciar el frontend:

```bash
npm install
npm run dev
```

Vite reenvía `/api` a `http://localhost:3001`. La API devuelve el catálogo en `GET /api/productos`.

Para apuntar el frontend a otra API, configurar `VITE_API_URL` con la URL completa del endpoint, por ejemplo `https://<servicio-backend>/api/productos`. En Netlify, esta variable debe configurarse antes del build para que Vite la incorpore.

## Docker

Desde la raíz del proyecto:

```bash
docker build -t tiendasimple-api ./backend
docker run --rm -p 3001:3001 tiendasimple-api
```

La API escucha en `PORT` (Render lo configura automáticamente; localmente usa `3001`). `CORS_ORIGIN` permite configurar uno o más orígenes separados por comas; por defecto permite cualquier origen para facilitar la publicación inicial del catálogo público.

## Publicación y CI

- **Frontend (Netlify):** conectar el repositorio, usar el directorio raíz, el comando `npm run build` y el directorio de publicación `dist`. Definir `VITE_API_URL` con el endpoint público de Render.
- **Backend (Render):** crear el servicio desde el Blueprint `render.yaml` y conectar el repositorio. El servicio usa `backend/Dockerfile` y despliega nuevos commits automáticamente.
- **GitHub Actions:** el workflow construye la imagen del backend ante cada push a `main`. No publica la imagen en un registry.

## Enlaces de entrega

Completar con las URLs reales luego de publicar y vincular las cuentas:

- Frontend publicado: **PENDIENTE**
- Endpoint del backend: **PENDIENTE**
- Repositorio GitHub: **https://github.com/rodriguezdavidalberto092-hub/tiendasimple**
- Tablero Kanban público: **https://github.com/users/rodriguezdavidalberto092-hub/projects/1/views/1**

## Kanban sugerido

Crear un tablero público con columnas **Pendiente**, **En progreso** y **Finalizada**, y cargar al menos estas tareas:

1. Crear la API de productos y contenerizarla.
2. Conectar el catálogo del frontend con la API.
3. Configurar el workflow de GitHub Actions.
4. Publicar el backend en Render.
5. Publicar el frontend en Netlify y validar la carga remota.
