
import { useEffect, useState } from "react";
import { getCharacters } from "./services/api";
import CharacterList from "./components/CharacterList";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function loadCharacters() {
      try {
        setLoading(true);
        setError("");

        const data = await getCharacters(page);

        setCharacters(data.items);
        setTotalPages(data.meta.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadCharacters();
  }, [page]);

  return (
    <main className="app">
      <h1>Dragon Ball</h1>
      <p>Explora los personajes del universo Dragon Ball</p>

      {loading && <p>Cargando personajes...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <CharacterList characters={characters} />

          <div className="pagination">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Anterior
            </button>

            <span>
              Página {page} de {totalPages}
            </span>

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default App;
