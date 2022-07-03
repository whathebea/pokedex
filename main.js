const fetchPokemon = () => {
  const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

  const pokemonPromises = [];

  for (let i = 1; i <= 150; i++) {
    pokemonPromises.push(
      fetch(getPokemonUrl(i)).then((response) => response.json())
    );
  }
  Promise.all(pokemonPromises).then((pokemons) => {
    /* console.log(pokemons); */
    const pokeList = pokemons.reduce((acc, pokemon) => {
        acc += `<div class="card">
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="sprite">
        <h1 class="name">${pokemon.name}</h1>
        <span class="type">${pokemon.types.map(typeInfo => typeInfo.type.name).join(' | ')}</span>
        </div>`;
        return acc;
    }, '');

    const div = document.querySelector('[data-js="pokedex"]');
    div.innerHTML = pokeList;
  });
};

fetchPokemon();
