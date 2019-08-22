import React from 'react';
import './PokemonDetails.css';

class PokemonDetails extends React.Component {
  render() {
    return (
      <div className="pokemon-details">
          <div className="pokemon-details-info">
              
              Pokemon
          </div>
          <div className="pokemon-details-map">
              Google Map
          </div>
      </div>
    );
  }
}

export default PokemonDetails;