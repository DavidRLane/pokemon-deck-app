import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        
        this.filterPokemon = this.filterPokemon.bind(this);

        this.state = {
            filteredList: []
        }
    }
    
    filterPokemon(name) {
        var filteredList = this.state.summaryList;
        var pokemonNameRegex = new RegExp(name, 'i');

        filteredList = filteredList.filter(function(pokemonName) {
            return pokemonNameRegex.test(pokemonName);
        });
        this.setState({summaryList: filteredList});
    }
  
    render() {
        return (
            <div className="pokemon-search-bar">
                Search
            </div>
        );
    }
}

export default SearchBar;