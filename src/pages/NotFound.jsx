
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main>
      <h1>404 - NO EXISTE</h1>
      <p>La página que buscas no existe.</p>
      <Link to="/">Volver al catálogo</Link>
    </main>
  );
}
