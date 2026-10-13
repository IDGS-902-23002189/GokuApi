
const API_URL = "https://dragonball-api.com/api";

// Obtener personajes de una página
export async function getCharacters(page = 1) {
  const response = await fetch(
    `${API_URL}/characters?page=${page}&limit=10`
  );

  if (!response.ok) {
    throw new Error("No se pudieron obtener los personajes");
  }

  const data = await response.json();

  return data;
}
