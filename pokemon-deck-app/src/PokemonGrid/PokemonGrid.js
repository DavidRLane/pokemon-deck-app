import React from 'react';
import './PokemonGrid.css';

class PokemonGrid extends React.Component {
    constructor(props) {
        super(props);

        this.MOCK_DESCRIPTION = `Lorem ipsum dolor sit amet, natoque amet vestibulum dui sit et convallis, 
            ut bibendum aliquam, lorem nulla quam ridiculus sed sed, nec sapien vestibulum turpis sed odio nisl. 
            Lacus quis in libero lacinia ultricies, dui ac integer, tempor felis accumsan consectetuer. 
            Id vestibulum sit quis ipsum, quis rutrum duis mattis, metus id eu in, phasellus in risus ut. 
            Tincidunt dui fusce consectetuer quam eu mauris, a arcu donec, id purus metus quisque id, 
            ultricies volutpat faucibus vel lectus. Sapien purus etiam, nibh vitae donec, eleifend mauris amet urna in elit, 
            ut ante lectus nec lorem leo donec, aut vel tortor nec diam. Quam sollicitudin viverra wisi mattis in aenean. 
            Eu turpis vitae pretium proin.`;
        this.NOT_FOUND = {
            id: '',
            picture: '',
            name: '',
            height: '',
            weight: '',
            inBag: '',
            description: this.MOCK_DESCRIPTION,
            type: '',
            location: ''
        };
        
        this.pokemonList = [];
        this.searchCriteria = '';
        
        this.getAllPokemonUrls = this.getAllPokemonUrls.bind(this);
        this.assignPokemonDetails = this.assignPokemonDetails.bind(this);
        this.openPokemonDetails = this.openPokemonDetails.bind(this);
        this.generateLocationsForGoogleApi = this.generateLocationsForGoogleApi.bind(this);
        this.createPokemonElements = this.createPokemonElements.bind(this);
        this.filterPokemon = this.filterPokemon.bind(this);
        this.restoreAllPokemon = this.restoreAllPokemon.bind(this);
        this.assignSearchCriteria = this.assignSearchCriteria.bind(this);

        this.state = {
            toggleSavedView: false,
            searchCriteria: '',
            summaryList: [],
            savedList: []
        }
    }

    //Start Up Function
    componentDidMount() {
        if(this.pokemonList.length === 0) {
            this.getAllPokemonUrls();
        }
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

    //Return Object of all Relevant Pokemon Details
    assignPokemonDetails(details) {
        var allTypes= [];
        for(var i in details.types) {
            allTypes.push(details.types[i].type.name);
        }
        allTypes = allTypes.join(" / ");

        return {
            id: details.id,
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

    //Create Pokemon Summary Card
    createPokemonElements(tempList) {
        return tempList.map((pokemon) => {
            return (
                <div className="pokemon-grid-element" key={pokemon.name}>
                    <img alt="Pokemon Sprite" src={pokemon.picture} onClick={() => this.openPokemonDetails(pokemon)}/>
                    <h3>{pokemon.name}</h3>
                </div>
            );    
        });
    }

    //Find Pokemon Location; If pokemon was already searched, send back pokemon info without fetch
    openPokemonDetails(pokemonObject) {
        if(pokemonObject.location == null) {
            //Route to Pokemon Location API
            fetch(`https://api.craft-demo.net/pokemon/${pokemonObject.id}`, {
                method: 'GET',
                headers: {
                    "x-api-key": "HHko9Fuxf293b3w56zAJ89s3IcO9D5enaEPIg86l"
                }
            })
            .then(response => response.json())
            .then(location => {
                if(location.locations.length > 0) {
                    pokemonObject.location = this.generateLocationsForGoogleApi(location.locations);
                }
                this.props.selectPokemon(pokemonObject);
            });
        } else {
            this.props.selectPokemon(pokemonObject);
        }
    }

    generateLocationsForGoogleApi(data) {
        var coordinates = [];
        for(var index in data) {
            var temp = data[index].split(",");
            coordinates.push({
                lat: temp[0],
                lng: temp[1]
            });
        }
        return coordinates;
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

    assignSearchCriteria(event) {
        this.setState({ searchCriteria: event.target.value });
    }

    render() {
        return (
            <div className="pokemon-grid">
                <div className="pokemon-search-bar">
                    <input type="text" value={this.state.searchCriteria} onChange={this.assignSearchCriteria} />
                    <input type="submit" value="Search" onClick={this.filterPokemon}/>
                    <input type="submit" value="Show All" onClick={this.restoreAllPokemon}/>
                </div>

                <div className="pokemon-grid-row">
                    { this.state.toggleSavedView ? this.state.savedList : this.state.summaryList}
                </div>
            </div>
        );
    }
}

export default PokemonGrid;