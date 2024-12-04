const apiBaseUrl = 'https://api.jikan.moe/v4';
const animeCalendar = document.getElementById('animeCalendar');

async function fetchAiringAnimes() {
  try {
    const response = await fetch(`${apiBaseUrl}/seasons/now`);
    const data = await response.json();
    return data.data; 
  } catch (error) {
    console.error('Error al obtener los animes:', error);
    return [];
  }
}

function renderAnimes(animes) {
  animeCalendar.innerHTML = ''; 

  animes.forEach((anime) => {
    const animeCard = document.createElement('div');
    animeCard.className = 'anime-card';

    const animeImage = document.createElement('img');
    animeImage.src = anime.images.jpg.image_url;
    animeImage.alt = anime.title;

    const animeTitle = document.createElement('div');
    animeTitle.className = 'anime-title';
    animeTitle.textContent = anime.title;


    const animeDate = document.createElement('div');
    animeDate.className = 'anime-date';
    animeDate.textContent = `Estreno: ${anime.aired.from ? new Date(anime.aired.from).toLocaleDateString() : 'N/A'}`;

    animeCard.appendChild(animeImage);
    animeCard.appendChild(animeTitle);
    animeCard.appendChild(animeDate);

    animeCalendar.appendChild(animeCard);
  });
}

async function initCalendar() {
  const animes = await fetchAiringAnimes();
  renderAnimes(animes);
}

initCalendar();