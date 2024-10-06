(async () => {
  const fs = require("fs");
  // Paginacion de lista
  const TOTAL_PAGES = 5;
  const pages = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);
  let fileContent = pages.map((id) => `/pokemons/page/${id}`).join("\n");
  // Paginacion de pokemons por ID
  fileContent += "\n";
  const TOTAL_POKEMON = 151;
  const pokemonIds = Array.from({ length: TOTAL_POKEMON }, (_, i) => i + 1);
  fileContent += pokemonIds.map((id) => `/pokemon/${id}`).join("\n");
  // Paginacion de pokemons por Nombre
  const LIMIT_POKEMON = 151;
  const pokemonNames = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT_POKEMON}`
  ).then((res) => res.json());
  fileContent += "\n";
  fileContent += pokemonNames.results
    .map((pokemon) => `/pokemon/${pokemon.name}`)
    .join("\n");

  fs.writeFileSync("routes.txt", fileContent);
})();
