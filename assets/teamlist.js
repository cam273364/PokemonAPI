//function for displaying pokemon that we've added to the team



function displayMyTeam() {
    
    let pokemonArray = localStorage.getItem('pokemon')
    pokemonArray = JSON.parse(pokemonArray)
    const pokemonContainer = document.getElementById('pokemonContainer')
    pokemonContainer.innerText = ''
    pokemonArray.forEach(pokemon => {
        const sectionElement = document.createElement('section')
        sectionElement.classList.add("column", "card", "align-center")

        const nameDiv = document.createElement('div')
        nameDiv.classList.add('bold', 'small-caps')
        nameDiv.innerHTML = pokemon.name 

        sectionElement.appendChild(nameDiv)

        const pokemonImg = document.createElement('img')
        pokemonImg.src= pokemon.image
        sectionElement.appendChild(pokemonImg)

        const pokemonType = document.createElement('div')
        pokemonType.classList.add("row", "align-self-stretch", "gap-md")
        
        const pokemonTypeOne = document.createElement('div')
        pokemonTypeOne.classList.add("column", "align-center")
        pokemonTypeOne.innerHTML = pokemon.types[0]
        pokemonType.appendChild(pokemonTypeOne)
        
        const pokemonTypeTwo = document.createElement('div')
        pokemonTypeTwo.classList.add("column", "align-center")
        pokemonTypeTwo.innerHTML = pokemon.types[1]
        if (pokemon.types[1]){
            pokemonType.appendChild(pokemonTypeTwo)
        } 
            
        
        const removeFromTeam = document.createElement('button')
        removeFromTeam.innerText = 'Remove from Team'
        removeFromTeam.setAttribute('name', pokemon.name)
        //check if pokemon is shiny and pass to button
        const shinyStatus = pokemon.isShiny? 'shiny' : 'notShiny'
        removeFromTeam.setAttribute('status', shinyStatus)
        removeFromTeam.addEventListener('click', handleDelete)
        sectionElement.appendChild(removeFromTeam)

        const pokemonAbilities = document.createElement('div')
         //for loop to create abilities div for each ability
        pokemon.abilities.forEach(ability => {
            const pokemonAbilityDiv = document.createElement('div')
            pokemonAbilityDiv.innerText = ability
            pokemonAbilities.appendChild(pokemonAbilityDiv)
        })
        sectionElement.appendChild(pokemonAbilities)

        const pokemonHeight = document.createElement('div')
        sectionElement.appendChild(pokemonHeight)
        

        
        sectionElement.appendChild(pokemonType)


        pokemonContainer.appendChild(sectionElement)


    })
    
    // displayPokemon(pokemon)
}
displayMyTeam()

function handleDelete(event) {
    let pokemonArray = localStorage.getItem('pokemon')
    pokemonArray = JSON.parse(pokemonArray)
    console.log(pokemonArray)
    console.log(event.target)
    const nameToDelete = event.target.getAttribute('name')
    console.log(nameToDelete)
    const isShinyDelete = event.target.getAttribute('status')
    pokemonArray = pokemonArray.filter(pokemon => {
        if(nameToDelete === pokemon.name){
            if(isShinyDelete === 'shiny' && pokemon.isShiny){
                return false
            } 
            if(isShinyDelete === 'notShiny' && !pokemon.isShiny) {
                return false
            }

        
        }
        return true
    })
    localStorage.setItem('pokemon', JSON.stringify(pokemonArray))
    displayMyTeam()
}

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

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  