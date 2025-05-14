import React, { useContext, useEffect, useState } from 'react'
import '../App.css'
import { useParams } from 'react-router-dom';
import { UserJwtContext } from '../contexts/UserJwtContext';



export function PokemonSearcher(){


  let [userJwt] = useContext(UserJwtContext);


  // let params = useParams();
  // console.log(params.searchTerm);
  let {searchTerm} = useParams();

  // let [pokemonData, setPokemonData] = useState({});
  let [pokemonName, setPokemonName] = useState("");
  let [pokemonSpriteUrl, setPokemonSpriteUrl] = useState("");
  // let [_, setPokemonId] = useState(0);
  let [pokemonSearchTerm, setPokemonSearchTerm] = useState("");


  // equivalent to componentDidMount
  useEffect(() => {
    console.log("Use effect says hello world!");

    if (searchTerm){
      setPokemonSearchTerm(searchTerm);
      getSpecificPokemon(searchTerm);
    } else {
      getRandomPokemon();
    }

    // Return inside useeffect is equivalent to componentWillUnmount
    // return (() => {
    //   console.log("Component is unmounting now.");
    // });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {

    if (!userJwt && pokemonSearchTerm.length > 0){ 
      setPokemonSearchTerm("");
      
    } else {
     // user is logged in and is allowed to search
    }

  }, [pokemonSearchTerm, userJwt]);



  // equivalent to componentDidUpdate
  // useEffect(() => {
  //   console.log("Use effect says hello world! on re-render");
    
  // });

  // // equivalent to componentDidUpdate for a specific variable
  // useEffect(() => {
  //   console.log("Use effect says hello world! on update of pokemonName");
  // }, [pokemonName]);




  const getRandomPokemon = async () => {
    let randomPokemonId = Math.floor(Math.random() * 1025) + 1;
    console.log("Random Pokemon ID to get is: " + randomPokemonId);

   getSpecificPokemon(randomPokemonId);
   
  }


  const getSpecificPokemon = async (targetPokemonValue) => {

    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + targetPokemonValue);
    let data = await response.json();

    console.log(data);

    setPokemonName(data.name);
    setPokemonSpriteUrl(data.sprites.other.home.front_default);
    // setPokemonId(data.id);

    // setPokemonData((previousState) => {
    //   return {
    //     // Guarantee that previous state is all kept
    //     ...previousState,
    //     // pokemonId: previousState.pokemonId,
    //     // And then overwrite the specific bits that we want to update
    //     pokemonName: data.name,
    //     pokemonId: data.id,
    //     pokemonSpriteUrl: data.sprites.other.home.front_default
    //   }
    // });
  }


  return (
      <>
        <h1>This is a function component!</h1>

        {/* <button onClick={(event) => {this.getRandomPokemon(event)}} > */}
        {/* <button onClick={() => {this.getRandomPokemon()}} > */}
        <button onClick={getRandomPokemon} >
          Get a random Pokemon
        </button>

        <section>
          <label htmlFor="pokemonNameInput">Pokemon to search for:</label>
          <input 
            type="text" 
            name="pokemonNameInput" 
            data-testid="pokemonNameInput"
            id="brokenpokemonNameInput" 
            value={pokemonSearchTerm} 
            onChange={(event) => {
              setPokemonSearchTerm(event.target.value)
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                getSpecificPokemon(pokemonSearchTerm);
              }
            }}
          />
          <button onClick={() => getSpecificPokemon(pokemonSearchTerm)}>
            Search!
          </button>
        </section>

        {pokemonName.length > 0 && 
        <h1>
          {pokemonName}
        </h1>
        }

        
        {pokemonSpriteUrl.length > 0 &&
          <img src={pokemonSpriteUrl} /> 
        }
        

      </>
    )
}


// class App extends React.Component {
//   constructor(){
//     super();

//     this.state = {
//       pokemonId: 0,
//       pokemonName: "",
//       pokemonSpriteUrl: "",
//       pokemonSearchTerm: ""
//     }

//     this.getRandomPokemon = this.getRandomPokemon.bind(this);
//   }

//   async componentDidMount(){
//     console.log("Component mounted.");

//     this.getRandomPokemon();
    
//   }

//   componentDidUpdate(){
//     console.log(this.state);
//   }

//   componentWillUnmount(){
//     console.log("API stuff is all done, goodbye!");
//   }

//   // exampleFunctionInClass () {
//   // }

//   async getRandomPokemon () {
//     let randomPokemonId = Math.floor(Math.random() * 1025) + 1;
//     console.log("Random Pokemon ID to get is: " + randomPokemonId);

//    this.getSpecificPokemon(randomPokemonId);
//   }


//   async getSpecificPokemon(targetPokemonValue){

//     let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + targetPokemonValue);
//     let data = await response.json();

//     console.log(data);

//     this.setState((previousState) => {
//       return {
//         // Guarantee that previous state is all kept
//         ...previousState,
//         // pokemonId: previousState.pokemonId,
//         // And then overwrite the specific bits that we want to update
//         pokemonName: data.name,
//         pokemonId: data.id,
//         pokemonSpriteUrl: data.sprites.other.home.front_default
//       }
//     });
//   }




//   render() {
//     return (
//       <>
//         <h1>This is a class component!</h1>

//         {/* <button onClick={(event) => {this.getRandomPokemon(event)}} > */}
//         {/* <button onClick={() => {this.getRandomPokemon()}} > */}
//         <button onClick={this.getRandomPokemon} >
//           Get a random Pokemon
//         </button>

//         <section>
//           <label htmlFor="pokemonNameInput">Pokemon to search for:</label>
//           <input 
//             type="text" 
//             name="pokemonNameInput" 
//             id="pokemonNameInput" 
//             value={this.state.pokemonSearchTerm} 
//             onChange={(event) => {
//               this.setState((previousState) => {
//                 return {
//                   ...previousState,
//                   pokemonSearchTerm: event.target.value
//                 }
//               })
//             }}
//             onKeyDown={(event) => {
//               if (event.key === "Enter") {
//                 this.getSpecificPokemon(this.state.pokemonSearchTerm);
//               }
//             }}
//           />
//           <button onClick={() => this.getSpecificPokemon(this.state.pokemonSearchTerm)}>
//             Search!
//           </button>
//         </section>

//         {this.state.pokemonName.length > 0 && 
//         <h1>
//           {this.state.pokemonName}
//         </h1>
//         }

        
//         {this.state.pokemonSpriteUrl.length > 0 &&
//           <img src={this.state.pokemonSpriteUrl} /> 
//         }
        

//       </>
//     )
//   }
// }

// export default App
