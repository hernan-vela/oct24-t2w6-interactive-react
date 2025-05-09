import React from 'react'
import './App.css'

class App extends React.Component {
  constructor(){
      super();

    this.state = {
      pokemonID: 0,
      pokemonName: ""
    }
  }

  componentDidMount(){
    console.log("Component mounted. ");
  }

  componentDidUpdate(){
    console.log(this.state);
  }


  render() {
    return (
      <>
        <h1>This is a class component!</h1>
        
        {this.state.pokemonName.length > 0 && 
        <h1>
          {this.state.pokemonName}
        </h1>
        }


      </>
  )
 }
}
export default App
