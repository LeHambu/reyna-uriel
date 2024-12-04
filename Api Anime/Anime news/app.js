const BASE_URL = 'https://api.jikan.moe/v4';
const PLACEHOLDER_IMAGE = 'placeholder.jpg'; // Asegúrate de tener esta imagen

async function fetchFromJikanAPI(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching data from Jikan API:', error);
        return null;
    }
}
async function updateAnimeBanner() {
    const data = await fetchFromJikanAPI('/top/anime?limit=1');
    const bannerElement = document.getElementById('anime-banner');
    if (data && data.data.length > 0) {
        const imageUrl = data.data[0].images.jpg.large_image_url;
        bannerElement.style.backgroundImage = `url('${imageUrl}')`;
    } else {
        bannerElement.style.backgroundImage = `url('${PLACEHOLDER_IMAGE}')`;
    }
}

async function updateTrendingTopics() {
    const data = await fetchFromJikanAPI('/top/anime?limit=5');
    const trendingList = document.getElementById('trending-topics-list');
    trendingList.innerHTML = '';
    if (data && data.data.length > 0) {
        data.data.forEach(anime => {
            const li = document.createElement('li');
            li.textContent = anime.title;
            trendingList.appendChild(li);
        });
    } else {
        trendingList.innerHTML = '<li>No hay temas en tendencia disponibles</li>';
    }
}

async function updateUpcomingAnime() {
    const data = await fetchFromJikanAPI('/seasons/upcoming?limit=1');
    const upcomingAnimeElement = document.getElementById('upcoming-anime-image');
    if (data && data.data.length > 0) {
        upcomingAnimeElement.src = data.data[0].images.jpg.image_url;
    } else {
        upcomingAnimeElement.src = PLACEHOLDER_IMAGE;
    }
}

async function initPage() {
    await Promise.all([
        updateAnimeBanner(),
        updateTrendingTopics(),
        updateUpcomingAnime()
    ]);
}

document.addEventListener('DOMContentLoaded', initPage);