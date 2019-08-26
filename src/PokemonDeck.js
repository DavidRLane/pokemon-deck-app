import React from 'react';
import './PokemonDeck.css';
import PokemonGrid from './PokemonGrid/PokemonGrid';
import PokemonDetails from './PokemonDetails/PokemonDetails';

class PokemonDeck extends React.Component {
  constructor(props) {
    super(props);

    this.sendPokemonData = this.sendPokemonData.bind(this);
    this.switchPokemonView = this.switchPokemonView.bind(this);
    this.updateSavedPokemon = this.updateSavedPokemon.bind(this);
    this.saveAllPokemon = this.saveAllPokemon.bind(this);
    this.saveAllSummaryPokemon = this.saveAllSummaryPokemon.bind(this);

    this.state = {
      pokemonData: null,
      summaryPokemon: [],
      allPokemon: [],
      savedPokemon: [],
      showGrid: true,
    }
  }

  sendPokemonData(newData) {
    this.setState({ pokemonData: newData }, () => this.switchPokemonView());
  }

  switchPokemonView() {
    this.setState({ showGrid: !this.state.showGrid });
  }

  updateSavedPokemon(pokemon) {
    this.setState({ savedPokemon: pokemon })
  }

  saveAllPokemon(allPokemon) {
    this.setState({ allPokemon: allPokemon });
  }

  saveAllSummaryPokemon(allPokemon) {
    this.setState({ summaryPokemon: allPokemon });
  }

  render() {
    return (
      <div className="pokemon-deck">
        <header className="pokemon-deck-header">
          { 
            this.state.showGrid 
              ? <PokemonGrid 
                  allPokemon={this.state.allPokemon}
                  summaryPokemon={this.state.summaryPokemon}
                  savedPokemon={this.state.savedPokemon}
                  selectPokemon={this.sendPokemonData}
                  saveAllPokemon={this.saveAllPokemon}
                  saveAllSummaryPokemon={this.saveAllSummaryPokemon} 
                /> 
              : <PokemonDetails 
                  pokemonDetails={this.state.pokemonData} 
                  savedPokemon={this.state.savedPokemon}
                  switchViews={this.switchPokemonView} 
                  updateSavedPokemon={this.updateSavedPokemon}
                /> 
          }
        </header>
      </div>
    );
  }
}

export default PokemonDeck;