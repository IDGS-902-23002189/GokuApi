import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import LanguageCard from "../components/LanguageCard";

export default function Favoritos() {
  const { usuario } = useAuth();
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const guardados = JSON.parse(
      localStorage.getItem("personajesFavoritos") || "[]",
    );

    setFavoritos(guardados);
  }, []);

  function quitarFavorito(id) {
    const actualizados = favoritos.filter((personaje) => personaje.id !== id);

    setFavoritos(actualizados);
    localStorage.setItem("personajesFavoritos", JSON.stringify(actualizados));
  }

  return (
    <main className="app-container">
      <h1>Mis favoritos</h1>
      <h2>Hola, {usuario}</h2>
      <a
        href="https://spoiler.mx/noticia/pelicula-rick-and-morty-confirmada/"
        target="_blank"
        rel="noopener noreferrer"
        className="favoritos-imagen-link"
      >
        <img
          src="https://spoiler.mx/wp-content/uploads/2017/02/rick_and_morty_04.jpg"
          alt="Rick y Morty"
          className="favoritos-imagen"
        />
      </a>

      <p>Aquí puedes consultar tus personajes favoritos.</p>

      <Link to="/personajes">Explorar personajes</Link>

      {favoritos.length === 0 ? (
        <p>Aún no tienes personajes favoritos.</p>
      ) : (
        <ul className="cards-container">
          {favoritos.map((personaje) => (
            <li key={personaje.id}>
              <Link to={`/personaje/${personaje.id}`} className="favorito-link">
                <LanguageCard
                  id={personaje.id}
                  image={personaje.image}
                  name={personaje.name}
                  species={personaje.species}
                  status={personaje.status}
                />
              </Link>

              <button
                type="button"
                onClick={() => quitarFavorito(personaje.id)}
              >
                Quitar de favoritos
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
