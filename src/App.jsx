import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Catalogo } from "./pages/Catalogo";
import { DetalleProducto } from "./pages/DetalleProducto";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <Link to="/" className="logo">
          <h1>TiendaSimple</h1>
        </Link>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Catalogo />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
