import React from 'react';
import './PokemonDeck.css';
import SearchBar from './SearchBar/SearchBar';
import PokemonGrid from './PokemonGrid/PokemonGrid';
import PokemonDisplayButtons from './PokemonDisplayButtons/PokemonDisplayButtons';

function PokemonDeck() {
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

export default PokemonDeck;