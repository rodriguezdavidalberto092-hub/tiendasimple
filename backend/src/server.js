import { createServer } from "node:http";
import process from "node:process";
import { productos } from "./productos.js";

const port = process.env.PORT || 3001;
const allowedOrigins = (process.env.CORS_ORIGIN || "*")
  .split(",")
  .map((origin) => origin.trim());

function sendJson(response, status, data) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(data));
}

const server = createServer((request, response) => {
  const url = new URL(request.url, "http://localhost");

  if (url.pathname !== "/api/productos") {
    sendJson(response, 404, { error: "Endpoint no encontrado." });
    return;
  }

  const origin = request.headers.origin;
  if (origin && (allowedOrigins.includes("*") || allowedOrigins.includes(origin))) {
    response.setHeader("Access-Control-Allow-Origin", allowedOrigins.includes("*") ? "*" : origin);
    response.setHeader("Vary", "Origin");
  }

  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    response.end();
    return;
  }

  if (request.method !== "GET") {
    sendJson(response, 405, { error: "Método no permitido." });
    return;
  }

  sendJson(response, 200, productos);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`TiendaSimple API escuchando en el puerto ${port}.`);
});
