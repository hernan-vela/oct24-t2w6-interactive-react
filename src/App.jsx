import React from 'react'
import './App.css'

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      pokemonId: 0,
      pokemonName: "",
      pokemonSpriteUrl: "",
      pokemonSearchTerm: ""
    }

    this.getRandomPokemon = this.getRandomPokemon.bind(this);
  }

  async componentDidMount(){
    console.log("Component mounted.");

    this.getRandomPokemon();
    
  }

  componentDidUpdate(){
    console.log(this.state);
  }

  componentWillUnmount(){
    console.log("API stuff is all done, goodbye!");
  }

  // exampleFunctionInClass () {
  // }

  async getRandomPokemon () {
    let randomPokemonId = Math.floor(Math.random() * 1025) + 1;
    console.log("Random Pokemon ID to get is: " + randomPokemonId);

   this.getSpecificPokemon(randomPokemonId);
  }


  async getSpecificPokemon(targetPokemonValue){

    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + targetPokemonValue);
    let data = await response.json();

    console.log(data);

    this.setState((previousState) => {
      return {
        // Guarantee that previous state is all kept
        ...previousState,
        // pokemonId: previousState.pokemonId,
        // And then overwrite the specific bits that we want to update
        pokemonName: data.name,
        pokemonId: data.id,
        pokemonSpriteUrl: data.sprites.other.home.front_default
      }
    });
  }




  render() {
    return (
      <>
        <h1>This is a class component!</h1>

        {/* <button onClick={(event) => {this.getRandomPokemon(event)}} > */}
        {/* <button onClick={() => {this.getRandomPokemon()}} > */}
        <button onClick={this.getRandomPokemon} >
          Get a random Pokemon
        </button>

        <section>
          <label htmlFor="pokemonNameInput">Pokemon to search for:</label>
          <input 
            type="text" 
            name="pokemonNameInput" 
            id="pokemonNameInput" 
            value={this.state.pokemonSearchTerm} 
            onChange={(event) => {
              this.setState((previousState) => {
                return {
                  ...previousState,
                  pokemonSearchTerm: event.target.value
                }
              })
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                this.getSpecificPokemon(this.state.pokemonSearchTerm);
              }
            }}
          />
          <button onClick={() => this.getSpecificPokemon(this.state.pokemonSearchTerm)}>
            Search!
          </button>
        </section>

        {this.state.pokemonName.length > 0 && 
        <h1>
          {this.state.pokemonName}
        </h1>
        }

        
        {this.state.pokemonSpriteUrl.length > 0 &&
          <img src={this.state.pokemonSpriteUrl} /> 
        }
        

      </>
    )
  }
}

export default App