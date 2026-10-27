
import { useState } from "react";
import { useCharacters } from "../useCharacter";
import LanguageCard from "../components/LanguageCard";
import FilterBar from "../components/FilterBar";
import BarraBusqueda from "../components/BarraBusqueda";
import UltimaBusqueda from "../components/UltimaBusqueda";

export default function Personajes() {
  const [page, setPage] = useState(1);

  const [especieActiva, setEspecieActiva] = useState(
    () => localStorage.getItem("ultimaEspecie") || "Todos"
  );

  const [textoBusqueda, setTextoBusqueda] = useState(
    () => localStorage.getItem("ultimaBusqueda") || ""
  );

  const [busqueda, setBusqueda] = useState(
    () => localStorage.getItem("ultimaBusqueda") || ""
  );

  const [ultimaBusqueda, setUltimaBusqueda] = useState(
    () => localStorage.getItem("ultimaBusqueda") || ""
  );

  const {
    characters,
    totalPages,
    loading,
    error,
  } = useCharacters(page, especieActiva, busqueda);

  function seleccionarEspecie(especie) {
    setEspecieActiva(especie);
    localStorage.setItem("ultimaEspecie", especie);
    setPage(1);
  }

  function buscarPersonaje() {
    const texto = textoBusqueda.trim();

    setBusqueda(texto);
    setPage(1);

    if (texto !== "") {
      localStorage.setItem("ultimaBusqueda", texto);
      setUltimaBusqueda(texto);
    } else {
      localStorage.removeItem("ultimaBusqueda");
      setUltimaBusqueda("");
    }
  }

  function recuperarUltimaBusqueda() {
    const guardada = localStorage.getItem("ultimaBusqueda") || "";

    setTextoBusqueda(guardada);
    setBusqueda(guardada);
    setPage(1);
  }

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>Monos de Rick y Morty</h1>
        <p>
          Explora los personajes, filtra por especie y busca por nombre.
        </p>
      </header>

      <FilterBar
        especieActiva={especieActiva}
        onSeleccionar={seleccionarEspecie}
      />

      <BarraBusqueda
        textoBusqueda={textoBusqueda}
        onCambiar={setTextoBusqueda}
        onBuscar={buscarPersonaje}
      />

      <UltimaBusqueda
        onRecuperar={recuperarUltimaBusqueda}
        deshabilitado={!ultimaBusqueda}
      />

      {loading && <p>Cargando personajes...</p>}

      {!loading && error && (
        <p className="no-results">Error: {error}</p>
      )}

      {!loading && !error && (
        <>
          {characters.length > 0 ? (
            <ul className="cards-container">
              {characters.map((personaje) => (
                <LanguageCard
                  key={personaje.id}
                  id={personaje.id}
                  image={personaje.image}
                  name={personaje.name}
                  species={personaje.species}
                  status={personaje.status}
                />
              ))}
            </ul>
          ) : (
            <p className="no-results">
              No se encontraron personajes.
            </p>
          )}

          {characters.length > 0 && totalPages > 1 && (
            <nav
              className="pagination"
              aria-label="Paginación"
            >
              <button
                type="button"
                disabled={page <= 1 || loading}
                onClick={() => setPage((actual) => actual - 1)}
              >
                Anterior
              </button>

              <span>
                Página {page} de {totalPages}
              </span>

              <button
                type="button"
                disabled={page >= totalPages || loading}
                onClick={() => setPage((actual) => actual + 1)}
              >
                Siguiente
              </button>
            </nav>
          )}
        </>
      )}
    </main>
  );
}
