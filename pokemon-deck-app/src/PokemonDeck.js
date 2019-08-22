import React from 'react';
import './PokemonDeck.css';
import PokemonGrid from './PokemonGrid/PokemonGrid';
import PokemonDisplayButtons from './PokemonDisplayButtons/PokemonDisplayButtons';

class PokemonDeck extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="pokemon-deck">
        <header className="pokemon-deck-header">
          <PokemonDisplayButtons />
          <PokemonGrid />
        </header>
      </div>
    );
  }
}

export default PokemonDeck;