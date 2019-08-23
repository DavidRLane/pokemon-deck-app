import React from 'react';
import './PokemonDetails.css';
import PokemonMap from '../PokemonMap/PokemonMap';

class PokemonDetails extends React.Component {
  constructor(props) {
    super(props);

    this.pokemonDetailInfo = null;
    this.pokemonMapInfo = null;
  }

  componentDidMount() {
    if(this.props.data) {
      this.pokemonDetailInfo = 
        <div className="pokemon-details-info">
          <img alt="Pokemon Sprite" src={this.props.data.picture}/>
          <h3>{this.props.data.name}</h3>
          <h5>{this.props.data.type}</h5>
          <p>Height: {this.props.data.height}</p>
          <p>Weight: {this.props.data.weight}</p>
          <p>In Bag: {this.props.data.inbag ? "True" : "False"}</p>
          <p>{this.props.data.description}</p>
        </div>;
        
      this.pokemonMapInfo = 
        <div className="pokemon-details-map">
            {!this.props.data.location ? <p>No Locations Found</p> : <p>{this.props.data.location.length} Location(s) Found</p> }
            <PokemonMap pokemonData={this.props.data}/>
        </div>;
    } else {
      this.pokemonDetailInfo = <h1>Information Not Available</h1>
      this.pokemonMapInfo = <h1>Map Not Available</h1>
    }
  }

  render() {
    return (
      <div className="pokemon-details">
          <button className="pokemon-revert-button" onClick={this.props.switchViews}>
            Go Back to Summary
          </button>

          <div className="pokemon-details-and-map">
            {this.pokemonDetailInfo}
            {this.pokemonMapInfo}
          </div>
      </div>
    );
  }
}

export default PokemonDetails;