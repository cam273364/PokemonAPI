// Gather information from the user

const pokemonForm = document.getElementById("pokemonForm");
console.log(pokemonForm)

pokemonForm.addEventListener("submit",async (event) => {
  event.preventDefault();
  const pokemonName = pokemonForm.pokemonName.value;
  const pokemonShiny = pokemonForm.pokemonShiny.checked
  const pokemonData = await getPokemonData(pokemonName, pokemonShiny);
  await displayPokemon(pokemonData)
});

function displayPokemon(pokemonData){
  const pokemonName = document.getElementById('pokemonName')
  const pokemonImage = document.getElementById('pokemonImage')
  const pokemonTypeOne = document.getElementById('pokemonTypeOne')
  const pokemonTypeTwo = document.getElementById('pokemonTypeTwo')
 pokemonName.innerText = capitalizeFirstLetter(pokemonData.name)
  pokemonImage.src = pokemonData.image
  pokemonTypeOne.innerText = capitalizeFirstLetter(pokemonData.types[0])
  pokemonTypeTwo.innerText = capitalizeFirstLetter(pokemonData.types[1] || '')
}

async function getPokemonData(pokemonName, pokemonShiny) {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName);
  const pokemonData = await response.json();
  const image = pokemonData.sprites.front_default;
  const shinyImage = pokemonData.sprites.front_shiny;
  const name = pokemonData.name;
  const types = pokemonData.types.map((type) => type.type.name)
 if(!pokemonShiny) {
   return {
    image: image,
    name: name,
    types: types
 }; 
  } else {
    return {
      image: shinyImage,
      name: name,
      types: types
    }
  }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
//listen for submission of form
// -Pokemon Name
// On submit, send a request off to get the info to display back to the user
// -pokeapi.co
// Display the result back to the user
// -Name of the Pokemon
// -Image with the picture of the Pokemon
//conduct a search but also pass in whether you'd like to see shiny