const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon';
const POKEAPI_SPECIES_URL = 'https://pokeapi.co/api/v2/pokemon-species';

const sanitizeName = (name) => {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z]/g, '');
}

const getPokemon = async (name) => {
  const response = await fetch(`${POKEAPI_URL}/${name}`);
  const pokemon = await response.json();
  
  // Obtener la URL de la especie para la cadena de evolución
  const speciesResponse = await fetch(`${POKEAPI_SPECIES_URL}/${name}`);
  const species = await speciesResponse.json();
  
  // Obtener la cadena de evolución
  const evolutionChainUrl = species.evolution_chain.url;
  const evolutionResponse = await fetch(evolutionChainUrl);
  const evolutionChain = await evolutionResponse.json();

return { ...pokemon, evolutionChain };
}

const renderPokemon = (template, pokemonData) => {
  const { name, sprites, weight, height, id, abilities, evolutionChain } = pokemonData;

  // Procesar la cadena de evolución
  const evolutionNames = [];
  let evolution = evolutionChain.chain;
  do {
    evolutionNames.push(evolution.species.name);
    evolution = evolution.evolves_to[0];
  } while (evolution);

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
            <div class="pokemon-card__abilities">
                <span>Abilities:</span>
                <ul>
                  ${abilities.map((ability) => `<li>${ability.ability.name}</li>`).join('')}
                </ul>
            </div>
            <div class="pokemon-card__evolution">
                <span>Evolution Chain:</span>
                <ul>
                  ${evolutionNames.map((evolutionName) => `<li>${evolutionName}</li>`).join('')}
                </ul>
            </div>
        </div>
    </div>
  `;
  template.innerHTML = html;
}

export {
  getPokemon,
  renderPokemon,
  sanitizeName,
};
