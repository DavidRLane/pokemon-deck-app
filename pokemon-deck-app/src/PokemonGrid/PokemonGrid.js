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
        this.MOCK_DESCRIPTION = `Lorem ipsum dolor sit amet, natoque amet vestibulum dui sit et convallis, 
            ut bibendum aliquam, lorem nulla quam ridiculus sed sed, nec sapien vestibulum turpis sed odio nisl. 
            Lacus quis in libero lacinia ultricies, dui ac integer, tempor felis accumsan consectetuer. 
            Id vestibulum sit quis ipsum, quis rutrum duis mattis, metus id eu in, phasellus in risus ut. 
            Tincidunt dui fusce consectetuer quam eu mauris, a arcu donec, id purus metus quisque id, 
            ultricies volutpat faucibus vel lectus. Sapien purus etiam, nibh vitae donec, eleifend mauris amet urna in elit, 
            ut ante lectus nec lorem leo donec, aut vel tortor nec diam. Quam sollicitudin viverra wisi mattis in aenean. 
            Eu turpis vitae pretium proin.`;
        this.currentPokemon = this.NOT_FOUND;
        this.pokemonList = [];
        this.getAllPokemonUrls = this.getAllPokemonUrls.bind(this);
        this.assignPokemonDetails = this.assignPokemonDetails.bind(this);
        this.openPokemonDetails = this.openPokemonDetails.bind(this);
    }

    componentDidMount() {
        this.getAllPokemonUrls();
    }

    getAllPokemonUrls() {
        fetch("https://pokeapi.co/api/v2/generation/1/", {
            method: 'GET',
            headers: {}
        })
        .then(response => response.json())
        .then(response => {
            console.log("All Pokemon", response);
            this.getAllPokemon(response.pokemon_species);
        });
    }

    async getAllPokemon(pokemonList) {
        for(var i in pokemonList) {
            var pokemonUrl = pokemonList[i].url.replace('pokemon-species', 'pokemon');
            var response = await fetch(pokemonUrl);
            var json = await response.json();
            this.pokemonList.push(this.assignPokemonDetails(json)); 
        }
    }

    assignPokemonDetails(details) {
        var allAbilities = [];
        for(var i in details.abilities) {
            allAbilities.push(details.abilities[i].ability.name);
        }
        allAbilities = allAbilities.join(" | ");

        return {
            picture: details.sprites.front_default,
            name: details.name,
            height: details.height,
            weight: details.weight,
            inBag: false,
            description: this.MOCK_DESCRIPTION,
            abilities: allAbilities,
            location: null
        }
    }

    openPokemonDetails(name) {
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
                    <div className="pokemon-grid-element">
                        Saved Grid Element 1
                        <button onClick={() => this.openPokemonDetails('name')}>Get Details</button>
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