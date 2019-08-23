import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({text}) => <div className="map-marker">{text}</div>;

class PokemonMap extends Component {
    constructor(props) {
        super(props);

        this.center = {
            lat: 32.7157, 
            lng: -117.1611
        }
        this.zoom = 10.5;

        this.createMapComponents = this.createMapComponents.bind(this);

        this.state = {
            mapCoordinateComponents: [] 
        }
    }

    componentDidMount() {
        this.setState({ 
            mapCoordinateComponents: this.createMapComponents()
        })
    }

    createMapComponents() {
        var temp = [];
        
        if(this.props.pokemonData.location) {
            temp = this.props.pokemonData.location.map((marker, index) => {
                var locationName = `Location ${index+1}`;

                return (
                    <AnyReactComponent 
                        key={index}
                        lat={marker.lat}
                        lng={marker.lng}
                        text={locationName}      
                    />
                );    
            });
        }

        return temp;
    }
   
    render() {
      return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyAyoUKv-HBA2TwaWauPpQ8KPJIU4RuWdFM" }}
                defaultCenter={this.center}
                defaultZoom={this.zoom}
            >
                {this.state.mapCoordinateComponents}
            </GoogleMapReact>
        </div>
      );
    }
  }
   
  export default PokemonMap;