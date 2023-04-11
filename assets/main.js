// Gather information from the user

const pokemonForm = document.getElementById("pokemonForm");


pokemonForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const pokemonName = pokemonForm.pokemonName.value;
  const pokemonShiny = pokemonForm.pokemonShiny.checked
  const pokemonData = await getPokemonData(pokemonName, pokemonShiny);
  displayPokemon(pokemonData)
});

function displayPokemon(pokemonData) {
  const pokemonCard = document.getElementById('pokemonCard')
  
  const pokemonName = document.getElementById('pokemonName')
  const pokemonImage = document.getElementById('pokemonImage')
  const pokemonTypeOne = document.getElementById('pokemonTypeOne')
  const pokemonTypeTwo = document.getElementById('pokemonTypeTwo')
  const pokemonAbilities = document.getElementById('pokemonAbilities')
  const pokemonHeight = document.getElementById('pokemonHeight')
  const pokemonWeight = document.getElementById('pokemonWeight')
  console.log(pokemonWeight)
 
  pokemonCard.classList.remove('hide')
  
  pokemonHeight.innerText = 'Height: ' + pokemonData.height + ' m'
  pokemonWeight.innerText = 'Weight: ' + pokemonData.weight + ' kg'
  pokemonName.innerText = capitalizeFirstLetter(pokemonData.name)
 
  pokemonImage.src = pokemonData.image
  pokemonAbilities.innerHTML = ''

  const abilitiesLabel = document.createElement('h3')
  abilitiesLabel.innerText = 'Abilities'
  pokemonAbilities.appendChild(abilitiesLabel)
  pokemonData.abilities.forEach(ability => {
  
    const div = document.createElement('div')
    div.innerText = capitalizeFirstLetter(ability)
    pokemonAbilities.appendChild(div)
    
  })
  
  pokemonTypeOne.innerText = capitalizeFirstLetter(pokemonData.types[0])
  pokemonTypeOne.dataset.type = pokemonData.types[0]
  if (!pokemonData.types[1]) {
    pokemonTypeTwo.classList.add('hide')
  } else {
    pokemonTypeTwo.innerText = capitalizeFirstLetter(pokemonData.types[1])
    pokemonTypeTwo.dataset.type = pokemonData.types[1]
    pokemonTypeTwo.classList.remove('hide')
  }

}

async function getPokemonData(pokemonName, pokemonShiny) {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName);
  const pokemonData = await response.json();
  const image = pokemonData.sprites.front_default;
  const shinyImage = pokemonData.sprites.front_shiny;
  const name = pokemonData.name;
  const height = String(pokemonData.height/10)
  const weight = String(pokemonData.weight/10)
  console.log(weight)
  console.log(pokemonData.height)
  const types = pokemonData.types.map((type) => type.type.name)
  const abilities = pokemonData.abilities.map((ability) => ability.ability.name)
  
  if (!pokemonShiny) {
    return {
      image: image,
      name: name,
      types: types,
      abilities: abilities,
      height: height,
      weight: weight

    };
  } else {
    return {
      image: shinyImage,
      name: name,
      types: types,
      abilities: abilities,
      height: height,
      weight: weight
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


//add a pokemon to list
//display abilities
//search by pokemon number
//get random pokemon