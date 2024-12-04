const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon';

const sanitizeName = (name) => {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z]/g, '');
}

const getPokemon = async (name) => {
  const response = await fetch(`${POKEAPI_URL}/${name}`);
  return response.json();
}

const renderPokemon = (template, pokemon) => {
  const { name, sprites, weight, height, id } = pokemon;
  const html = `
    <div class="pokemon-card">
        <div class="pokemon-card__header">
            <h2>${name}  #${id}</h2>
        </div>
        <span class="pokemon-card__label">Sprites</span>
        <div class="pokemon-card__images">
            <img src="${sprites.front_default}" alt="${name} front" />
            <img src="${sprites.back_default}" alt="${name} back" />
        </div>
        <div class="pokemon-card__details">
            <span class="pokemon-card__weight-height">Weight / Height</span>
            <div>${weight} / ${height}</div>
        </div>
    </div>
  `;
  template.innerHTML += html;
}

export {
  getPokemon,
  renderPokemon,
  sanitizeName,
};
