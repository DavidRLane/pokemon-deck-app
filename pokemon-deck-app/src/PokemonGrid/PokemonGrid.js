import React from 'react';
import './PokemonGrid.css';

function openPokemonDetails(pokemonName) {
    //Call API to get Pokemon Details
    var pokemonDetails = {
        name: pokemonName,
        details: null
    }

    //Route to Pokemon Details with Pokemon Info for API
}

function PokemonGrid() {
  return (
    <div className="pokemon-grid">
        {/* All 151 Pokemon */}
        <div className="pokemon-grid-row">
            <div className="pokemon-grid-element" onClick="openPokemonDetails('pokemon-name-goes-here')">
                Grid Element 1
            </div>
            <div className="pokemon-grid-element">
                Grid Element 2
            </div>
            <div className="pokemon-grid-element">
                Grid Element 3
            </div>
            <div className="pokemon-grid-element">
                Grid Element 4
            </div>
            <div className="pokemon-grid-element">
                Grid Element 5
            </div>
        </div>

        {/* Saved Pokemon */}
        <div className="pokemon-grid-row">
            <div className="pokemon-grid-element" onClick="openPokemonDetails('pokemon-name-goes-here')">
                Saved Grid Element 1
            </div>
            <div className="pokemon-grid-element">
                Saved Grid Element 2
            </div>
            <div className="pokemon-grid-element">
                Saved Grid Element 3
            </div>
            <div className="pokemon-grid-element">
                Saved Grid Element 4
            </div>
            <div className="pokemon-grid-element">
                Saved Grid Element 5
            </div>
        </div>
    </div>
  );
}

export default PokemonGrid;