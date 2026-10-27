
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function PersonajeDetalle() {
  const { id } = useParams();

  const [personaje, setPersonaje] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function obtenerPersonaje() {
      setLoading(true);
      setError(false);
      setPersonaje(null);

      try {
        const respuesta = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`,
          { signal: controller.signal }
        );

        if (!respuesta.ok) {
          throw new Error("No se encontró el personaje");
        }

        const datos = await respuesta.json();
        setPersonaje(datos);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    obtenerPersonaje();

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return <p>Cargando personaje...</p>;
  }

  if (error || !personaje) {
    return (
      <main>
        <h1>Personaje no encontrado</h1>
        <p>No fue posible cargar la información del personaje.</p>
        <Link to="/personajes">Volver al catálogo</Link>
      </main>
    );
  }

  return (
    <main className="detalle-personaje">
      <h1>{personaje.name}</h1>

      <img
        src={personaje.image}
        alt={`Imagen de ${personaje.name}`}
      />

      <p>Estado: {personaje.status}</p>
      <p>Especie: {personaje.species}</p>
      <p>Género: {personaje.gender}</p>
      <p>Origen: {personaje.origin.name}</p>
      <p>Ubicación: {personaje.location.name}</p>

      <Link to="/personajes">Volver a las tarjetas</Link>
    </main>
  );
}
