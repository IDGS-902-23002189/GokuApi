
import { useState } from "react";
import { useCharacters} from "./useCharacter";
import LanguageCard from "./components/LanguageCard";
import FilterBar from "./components/FilterBar";

function App() {
  const [page, setPage] = useState(1);
  const [especieActiva, setEspecieActiva] = useState("Todos");

  const {
    characters,
    totalPages,
    loading,
    error,
  } = useCharacters(page, especieActiva);

  function seleccionarEspecie(especie) {
    setEspecieActiva(especie);
    setPage(1);
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Monos de Rick y Morty</h1>
        <p>Explora los personajes y filtra por especie.</p>
      </header>

      <FilterBar
        especieActiva={especieActiva}
        onSeleccionar={seleccionarEspecie}
      />

      <main>
        {loading && <p>Cargando personajes...</p>}

        {error && (
          <p className="no-results">
            Error: {error}
          </p>
        )}

        {!loading && !error && (
          <>
            {characters.length > 0 ? (
              <ul className="cards-container">
                {characters.map((character) => (
                  <LanguageCard
                    key={character.id}
                    image={character.image}
                    name={character.name}
                    species={character.species}
                    status={character.status}
                  />
                ))}
              </ul>
            ) : (
              <p className="no-results">
                No se encontraron personajes.
              </p>
            )}

            {characters.length > 0 && (
              <nav className="pagination">
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Anterior
                </button>

                <span>
                  Página {page} de {totalPages}
                </span>

                <button
                  type="button"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Siguiente
                </button>
              </nav>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
