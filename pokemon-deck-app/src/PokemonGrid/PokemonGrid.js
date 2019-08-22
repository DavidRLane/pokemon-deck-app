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
            type: '',
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
        this.pokemonSummary = [];
        this.searchCriteria = '';
        this.getAllPokemonUrls = this.getAllPokemonUrls.bind(this);
        this.assignPokemonDetails = this.assignPokemonDetails.bind(this);
        this.openPokemonDetails = this.openPokemonDetails.bind(this);
        this.createPokemonElements = this.createPokemonElements.bind(this);
        this.filterPokemon = this.filterPokemon.bind(this);
        this.restoreAllPokemon = this.restoreAllPokemon.bind(this);
        this.assignCriteria = this.assignCriteria.bind(this);

        this.state = {
            toggleSavedView: false,
            searchCriteria: '',
            summaryList: [],
            savedList: []
        }
    }

    //Start Up Function
    componentDidMount() {
        this.getAllPokemonUrls();
    }

    getAllPokemonUrls() {
        //All Gen 1 Pokemon
        fetch("https://pokeapi.co/api/v2/generation/1/", {
            method: 'GET',
            headers: {}
        })
        .then(response => response.json())
        .then(response => {
            this.getAllPokemon(response.pokemon_species);
        });
    }

    async getAllPokemon(pokemonList) {
        for(var i in pokemonList) {
            //Each Pokemon Detail Info
            var pokemonUrl = pokemonList[i].url.replace('pokemon-species', 'pokemon');
            var response = await fetch(pokemonUrl);
            var json = await response.json();

            this.pokemonList.push(this.assignPokemonDetails(json)); 
        }
        this.setState({ summaryList: this.createPokemonElements(this.pokemonList) })
    }

    assignPokemonDetails(details) {
        var allTypes= [];
        for(var i in details.types) {
            allTypes.push(details.types[i].type.name);
        }
        allTypes = allTypes.join(" / ");

        return {
            picture: details.sprites.front_default,
            name: details.name,
            height: details.height,
            weight: details.weight,
            inBag: false,
            description: this.MOCK_DESCRIPTION,
            type: allTypes,
            location: null
        }
    }

    createPokemonElements(tempList) {
        return tempList.map((pokemon) => {
            return (
                <div className="pokemon-grid-element" key={pokemon.name}>
                    <img alt="Pokemon Sprite" src={pokemon.picture} onClick={() => this.openPokemonDetails('name')}/>
                    <h3>{pokemon.name}</h3>
                </div>
            );    
        });
    }

    openPokemonDetails(name) {
        //Route to Pokemon Location API
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
                this.currentPokemon.location = null;
            }
        });
    }

    filterPokemon() {
        if(this.state.searchCriteria.length > 0) {
            var results = [];
            var pokemonNameRegex = new RegExp(this.state.searchCriteria, 'i');
    
            results = this.pokemonList.filter(function(pokemon) {
                return pokemonNameRegex.test(pokemon.name);
            });
            this.setState({ summaryList: this.createPokemonElements(results) });
        } else {
            this.setState({ summaryList: this.createPokemonElements(this.pokemonList) });
        }
    }

    restoreAllPokemon() {
        this.setState({ searchCriteria: '' }, () => this.filterPokemon());
    }

    assignCriteria(event) {
        this.setState({ searchCriteria: event.target.value });
    }

    render() {
        return (
            <div className="pokemon-grid">
                <div className="pokemon-search-bar">
                    <input type="text" value={this.state.searchCriteria} onChange={this.assignCriteria} />
                    <input type="submit" value="Search" onClick={this.filterPokemon}/>
                    <input type="submit" value="Show All" onClick={this.restoreAllPokemon}/>
                </div>

                {/* All 151 Pokemon */}
                <div className="pokemon-grid-row">
                    {this.state.summaryList}
                </div>

                {/* Saved Pokemon */}
                <div className="pokemon-grid-row">
                    {this.state.savedList}
                </div>
            </div>
        );
    }
}

export default PokemonGrid;