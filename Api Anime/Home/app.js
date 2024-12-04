import ApiAnimeConsumo from "../ApiAnimecosumo.js";

// Referencias al DOM
const searchInput = document.querySelector("#searchQuery");
const searchType = document.querySelector("#searchType");
const searchButton = document.querySelector("#searchButton");
const searchResultsContainer = document.querySelector(".results-container");

// Manejar la búsqueda al hacer clic en el botón
searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    const type = searchType.value;

    // Validar que haya un término de búsqueda
    if (!query) {
        alert("Por favor, ingresa un término de búsqueda.");
        return;
    }

    try {
        // Llama al módulo para buscar en la API
        const results = await ApiAnimeConsumo.search(type, query);
        displayResults(results, type);
    } catch (error) {
        searchResultsContainer.innerHTML = `<p class="error">Error al realizar la búsqueda: ${error.message}</p>`;
    }
});

// Mostrar resultados en la página
const displayResults = (results, type) => {
    // Limpiar contenedor de resultados
    searchResultsContainer.innerHTML = "";

    if (results.length === 0) {
        searchResultsContainer.innerHTML = `<p class="no-results">No se encontraron resultados para "${searchInput.value}".</p>`;
        return;
    }

    // Generar HTML dinámico según el tipo de búsqueda
    const resultsHTML = results
        .map((result) => {
            if (type === "anime") {
                return `
                    <div class="result-card">
                        <img src="${result.images.jpg.image_url}" alt="${result.title}" />
                        <h3>${result.title}</h3>
                        <p><strong>Episodios:</strong> ${result.episodes || "N/A"}</p>
                        <p><strong>Sinopsis:</strong> ${result.synopsis || "Sin información disponible."}</p>
                    </div>
                `;
            } else if (type === "character") {
                return `
                    <div class="result-card">
                        <img src="${result.images.jpg.image_url}" alt="${result.name}" />
                        <h3>${result.name}</h3>
                        <p><strong>Kanji:</strong> ${result.name_kanji || "N/A"}</p>
                        <p><strong>Sobre:</strong> ${result.about || "Sin información disponible."}</p>
                    </div>
                `;
            } else if (type === "genre") {
                return `
                    <div class="result-card">
                        <img src="${result.images.jpg.image_url}" alt="${result.title}" />
                        <h3>${result.title}</h3>
                        <p><strong>Géneros:</strong> ${result.genres.map((g) => g.name).join(", ")}</p>
                        <p><strong>Sinopsis:</strong> ${result.synopsis || "Sin información disponible."}</p>
                    </div>
                `;
            }
        })
        .join("");

    searchResultsContainer.innerHTML = `
        <div class="results">
            ${resultsHTML}
        </div>
    `;
};
