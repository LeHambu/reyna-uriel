const BASE_URL = "https://api.jikan.moe/v4";

document.getElementById("season-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const year = document.getElementById("year").value;
    const season = document.getElementById("season").value;
    const resultsContainer = document.getElementById("results-container");

    // Limpiar resultados anteriores
    resultsContainer.innerHTML = "";

    try {
        const response = await fetch(`${BASE_URL}/seasons/${year}/${season}`);
        if (!response.ok) throw new Error("Error al obtener datos de la API.");

        const data = await response.json();

        // Mostrar resultados
        if (data.data.length === 0) {
            resultsContainer.innerHTML = "<p>No se encontraron animes para esta temporada.</p>";
            return;
        }

        data.data.forEach((anime) => {
            const animeCard = document.createElement("div");
            animeCard.className = "anime-card";
            animeCard.innerHTML = `
                <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
                <h3>${anime.title}</h3>
                <p>Inicio: ${anime.aired.from ? anime.aired.from.split("T")[0] : "N/A"}</p>
            `;
            resultsContainer.appendChild(animeCard);
        });
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = "<p>Ocurrió un error al buscar animes. Intenta nuevamente.</p>";
    }
});
