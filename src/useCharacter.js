
import { useEffect, useState } from "react";

export function useCharacters(page, especieActiva, busqueda) {
  const [characters, setCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function obtenerPersonajes() {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      params.set("page", page);

      if (especieActiva !== "Todos") {
        params.set("species", especieActiva);
      }

      if (busqueda.trim()) {
        params.set("name", busqueda.trim());
      }

      try {
        const respuesta = await fetch(
          `https://rickandmortyapi.com/api/character/?${params}`,
          { signal: controller.signal }
        );

        // La API responde 404 cuando no encuentra coincidencias.
        if (respuesta.status === 404) {
          setCharacters([]);
          setTotalPages(0);
          return;
        }

        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar los personajes.");
        }

        const datos = await respuesta.json();

        setCharacters(datos.results);
        setTotalPages(datos.info.pages);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setCharacters([]);
          setTotalPages(0);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    obtenerPersonajes();

    return () => controller.abort();
  }, [page, especieActiva, busqueda]);

  return {
    characters,
    totalPages,
    loading,
    error,
  };
}
