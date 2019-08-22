import React from 'react';
import './PokemonDisplayButtons.css';

class PokemonDisplayButtons extends React.Component {
  render() {
    return (
      <div className="pokemon-switch-buttons">
          <button>All</button>
          <button>Saved</button>
      </div>
    );
  }
}

export default PokemonDisplayButtons;