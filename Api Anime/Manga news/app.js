const apiBaseUrl = 'https://api.jikan.moe/v4';
const mangaCalendar = document.getElementById('animeCalendar');

async function fetchPopularMangas() {
  try {
    const response = await fetch(`${apiBaseUrl}/manga?order_by=popularity&sort=desc&limit=10`);
    const data = await response.json();
    return data.data; 
  } catch (error) {
    console.error('Error al obtener los mangas:', error);
    return [];
  }
}

function renderMangas(mangas) {
  mangaCalendar.innerHTML = '';

  mangas.forEach((manga) => {
    const mangaCard = document.createElement('div');
    mangaCard.className = 'anime-card';

    const mangaImage = document.createElement('img');
    mangaImage.src = manga.images.jpg.image_url;
    mangaImage.alt = manga.title;

    const mangaTitle = document.createElement('div');
    mangaTitle.className = 'anime-title';
    mangaTitle.textContent = manga.title;

    const mangaDate = document.createElement('div');
    mangaDate.className = 'anime-date';
    mangaDate.textContent = `Publicado: ${manga.published.from ? new Date(manga.published.from).toLocaleDateString() : 'N/A'}`;

    mangaCard.appendChild(mangaImage);
    mangaCard.appendChild(mangaTitle);
    mangaCard.appendChild(mangaDate);

    mangaCalendar.appendChild(mangaCard);
  });
}

async function initMangaCalendar() {
  const mangas = await fetchPopularMangas();
  renderMangas(mangas);
}

initMangaCalendar();