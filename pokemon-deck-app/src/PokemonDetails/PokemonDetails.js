import React from 'react';
import './PokemonDetails.css';
import PokemonMap from '../PokemonMap/PokemonMap';

class PokemonDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="pokemon-details">
          <button className="pokemon-revert-button" onClick={this.props.switchViews}>
            Go Back to Summary
          </button>

          <div className="pokemon-details-and-map">
            <div className="pokemon-details-info">
                <img alt="Pokemon Sprite" src={this.props.data.picture}/>
                <h3>{this.props.data.name}</h3>
                <h5>{this.props.data.type}</h5>
                <p>Height: {this.props.data.height}</p>
                <p>Weight: {this.props.data.weight}</p>
                <p>In Bag: {this.props.data.inbag ? "True" : "False"}</p>
                <p>{this.props.data.description}</p>
            </div>
            <div className="pokemon-details-map">
                <PokemonMap pokemonData={this.props.data}/>
            </div>
          </div>
      </div>
    );
  }
}

export default PokemonDetails;