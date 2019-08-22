import React from 'react';
import './PokemonGrid.css';

class PokemonGrid extends React.Component {
    constructor(props) {
        super(props);

        this.NOT_FOUND = {
            picture: '',
            name: '',
            height: '',
            weight: '',
            inBag: '',
            description: '',
            abilities: '',
            location: ''
        };
        this.currentPokemon = this.NOT_FOUND
        this.getAllPokemon = this.getAllPokemon.bind(this);
        this.openPokemonDetails = this.openPokemonDetails.bind(this);
    }

    getAllPokemon() {
        fetch("https://pokeapi.co/api/v2/generation/1/", {
            method: 'GET',
            headers: {}
        }).then(responseJson => {
            console.log("All Pokemon", responseJson);
        }) 
    }

    openPokemonDetails(name) {
        //Call API to get Pokemon Details
        // var pokemonDetails = {
        //     name: pokemonName,
        //     details: null
        // }

        console.log('Selected: ', name);

        //Route to Pokemon Details with Pokemon Info for API
        fetch("https://api.craft-demo.net/pokemon/1", {
            method: 'GET',
            headers: {
                "x-api-key": "HHko9Fuxf293b3w56zAJ89s3IcO9D5enaEPIg86l"
            }
        })
        .then(response => response.json())
        .then(pokemonDetails => {
            if(pokemonDetails) {
                console.log("Pokemon 1:", pokemonDetails);
            } else {
                //Default to "Not Found" Details
                this.currentPokemon = this.NOT_FOUND
            }
        });
    }

    render() {
        return (
            <div className="pokemon-grid">
                {/* All 151 Pokemon */}
                <div className="pokemon-grid-row">
                    <div className="pokemon-grid-element">
                        Grid Element 1
                        <button onClick={() => this.openPokemonDetails('name')}>Get Details</button>
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
}

export default PokemonGrid;