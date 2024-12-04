const BASE_URL = "https://api.jikan.moe/v4";

const ApiAnimeConsumo = (() => {
    /**
     * Realiza una búsqueda en la API de Jikan.
     * @param {string} type - Tipo de búsqueda: 'anime', 'characters' o 'genres'.
     * @param {string} query - El término de búsqueda.
     * @returns {Promise<object[]>} - Resultados de la API.
     */
    const search = async (type, query) => {
        try {
            let endpoint = "";

            // Configurar el endpoint según el tipo
            if (type === "anime") {
                endpoint = `anime?q=${query}&limit=10`;
            } else if (type === "character") {
                endpoint = `characters?q=${query}&limit=10`;
            } else if (type === "genre") {
                // Obtener todos los animes del género
                const genresResponse = await fetch(`${BASE_URL}/genres/anime`);
                const genresData = await genresResponse.json();
                const genre = genresData.data.find((g) => g.name.toLowerCase() === query.toLowerCase());
                if (!genre) {
                    throw new Error("Género no encontrado.");
                }
                endpoint = `anime?genres=${genre.mal_id}&limit=10`;
            }

            const response = await fetch(`${BASE_URL}/${endpoint}`);
            if (!response.ok) {
                throw new Error(`Error en la API: ${response.statusText}`);
            }

            const data = await response.json();
            return data.data || []; // Retorna los datos o un arreglo vacío
        } catch (error) {
            console.error("Error al consumir la API:", error);
            throw error;
        }
    };

    return { search };
})();


export default ApiAnimeConsumo;
