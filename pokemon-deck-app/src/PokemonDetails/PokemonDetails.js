import React from 'react';
import './PokemonDetails.css';
import PokemonMap from '../PokemonMap/PokemonMap';

class PokemonDetails extends React.Component {
  constructor(props) {
    super(props);

    this.pokemonInfo = <div className="pokemon-container">No Information Available</div>;
    this.pokemonMap = <div className="pokemon-container">No Locations Found</div>;
  }


  componentWillMount() {

    console.log("Props", this.props.data);

    if(this.props.data) {
      this.pokemonInfo = 
        <div className="pokemon-details-info">
          <img alt="Pokemon Sprite" src={this.props.data.picture}/>
          <h3>{this.props.data.name}</h3>
          <h5>{this.props.data.type}</h5>
          <p>Height: {this.props.data.height}</p>
          <p>Weight: {this.props.data.weight}</p>
          <p>In Bag: {this.props.data.inbag ? "True" : "False"}</p>
          <p>{this.props.data.description}</p>
        </div>;
      this.pokemonMap = 
        <div className="pokemon-details-map">
          {!this.props.data.location ? <p>No Locations Found</p> : <p>{this.props.data.location.length} Location(s) Found</p> }
          <PokemonMap pokemonData={this.props.data}/>
        </div>;
    } else {
      this.pokemonInfo = <div className="pokemon-container">No Information Available</div>;
      this.pokemonMap = <div className="pokemon-container">No Locations Found</div>;
    }
  }

  render() {
    return (
      <div className="pokemon-details">
          <button className="pokemon-revert-button" onClick={this.props.switchViews}>
            Go Back to Summary
          </button>

          <div className="pokemon-details-and-map">
            {this.pokemonInfo}    
            {this.pokemonMap}
          </div>
      </div>
    );
  }
}

export default PokemonDetails;