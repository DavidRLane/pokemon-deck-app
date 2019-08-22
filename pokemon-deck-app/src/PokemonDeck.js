import React from 'react';
import './PokemonDeck.css';
import PokemonGrid from './PokemonGrid/PokemonGrid';
import PokemonDisplayButtons from './PokemonDisplayButtons/PokemonDisplayButtons';
import PokemonDetails from './PokemonDetails/PokemonDetails';

class PokemonDeck extends React.Component {
  constructor(props) {
    super(props);


    this.sendPokemonData = this.sendPokemonData.bind(this);
    this.switchPokemonView = this.switchPokemonView.bind(this);

    this.state = {
      pokemonData: null,
      showGrid: true,
    }
  }

  sendPokemonData(newData) {

    console.log("New Data", newData);

    this.setState({ pokemonData: newData }, () => this.switchPokemonView());
  }

  switchPokemonView() {
    this.setState({ showGrid: !this.state.showGrid });
  }


  render() {
    return (
      <div className="pokemon-deck">
        <header className="pokemon-deck-header">
          <PokemonDisplayButtons />
          { 
            this.state.showGrid 
              ? <PokemonGrid selectPokemon={this.sendPokemonData}/> 
              : <PokemonDetails data={this.state.pokemonData} switchViews={this.switchPokemonView}/> 
          }
        </header>
      </div>
    );
  }
}

export default PokemonDeck;