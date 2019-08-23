import React from 'react';
import ReactDOM from 'react-dom';
import PokemonDeck from './PokemonDeck';
import PokemonDetails from './PokemonDetails/PokemonDetails';
import PokemonGrid from './PokemonGrid/PokemonGrid';
import PokemonMap from './PokemonMap/PokemonMap';

describe('PokemonDeck', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PokemonDeck />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('PokemonDetails', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PokemonDetails />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('PokemonGrid', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PokemonGrid />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('PokemonMap', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PokemonMap />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
