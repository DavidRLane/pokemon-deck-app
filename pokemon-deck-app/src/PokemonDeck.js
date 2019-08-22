import React from 'react';
import './PokemonDeck.css';
import PokemonGrid from './PokemonGrid/PokemonGrid';
import PokemonDisplayButtons from './PokemonDisplayButtons/PokemonDisplayButtons';
import SearchBar from './SearchBar/SearchBar';

class PokemonDeck extends React.Component {
  render() {
    return (
      <div className="pokemon-deck">
        <header className="pokemon-deck-header">
          <PokemonDisplayButtons/>
          <SearchBar/>
          <PokemonGrid/>
        </header>
      </div>
    );
  }
}

export default PokemonDeck;