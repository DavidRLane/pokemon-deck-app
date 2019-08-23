import React from 'react';
import './PokemonDetails.css';
import PokemonMap from '../PokemonMap/PokemonMap';

class PokemonDetails extends React.Component {
  constructor(props) {
    super(props);

    this.pokemonInfo = <div className="pokemon-container">No Information Available</div>;
    this.pokemonMap = <div className="pokemon-container">No Locations Found</div>;

    this.updateInBagPokemon = this.updateInBagPokemon.bind(this);
    this.addPokemon = this.addPokemon.bind(this);
    this.removePokemon = this.removePokemon.bind(this);
  }

  componentWillMount() {
    if(this.props.pokemonDetails) {
      this.pokemonInfo = 
        <div className="pokemon-details-info">
          <img alt="Pokemon Sprite" src={this.props.pokemonDetails.picture}/>
          <h3>{this.props.pokemonDetails.name}</h3>
          <h5>{this.props.pokemonDetails.type}</h5>
          <p>Height: {this.props.pokemonDetails.height}</p>
          <p>Weight: {this.props.pokemonDetails.weight}</p>
          <p>In Bag: 
            <form>
              <input
                name="inBag"
                type="checkbox"
                value={this.props.pokemonDetails.inBag}
                onChange={this.updateInBagPokemon} 
              />
            </form>
          </p>
          <p>{this.props.pokemonDetails.description}</p>
        </div>;
      this.pokemonMap = 
        <div className="pokemon-details-map">
          {!this.props.pokemonDetails.location ? <p>No Locations Found</p> : <p>{this.props.pokemonDetails.location.length} Location(s) Found</p> }
          <PokemonMap pokemonData={this.props.pokemonDetails}/>
        </div>;
    } else {
      this.pokemonInfo = <div className="pokemon-container">No Information Available</div>;
      this.pokemonMap = <div className="pokemon-container">No Locations Found</div>;
    }
  }

  //Update the "inBag" field by either removing or adding the pokemon
  updateInBagPokemon(event) {
    this.props.pokemonDetails.inBag = !this.props.pokemonDetails.inBag;

    if(this.props.pokemonDetails.inBag) {
      this.addPokemon(this.props.pokemonDetails);
    } else {
      this.removePokemon(this.props.pokemonDetails);
    }
  }

  addPokemon() {
    this.props.savedPokemon.push(this.props.pokemonDetails);
  }

  removePokemon() {
    for(var index in this.props.savedPokemon) {
      if (this.props.savedPokemon[index].name === this.props.pokemonDetails.name) {
        this.props.savedPokemon.splice(index, 1);
        this.props.updateSavedPokemon(this.props.savedPokemon);
        break;
      }
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