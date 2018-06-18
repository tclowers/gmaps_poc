import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import pointerSVG from './blue_circle.svg';


export class MapContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            lat: 0,
            lng: 0
        };

        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
        this.getPosition = this.getPosition.bind(this);
        this.updateCurrentPosition = this.updateCurrentPosition.bind(this);

    };

    getPosition(options) {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
    }

    updateCurrentPosition() {
        console.log("updating position");
        this.getPosition()
            .then((position) => {
                this.setState({lat: position.coords.latitude, lng: position.coords.longitude});
            })
    }

    onInfoWindowClose() {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        });
    };

    onMarkerClick(props, marker, e) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
        console.log("click");
        console.log("state: ", this.state);
    };

    render() {
        const style = {
            width: '100%',
            height: '100%'
        }

        let userMarker = {
            url: {pointerSVG},
            size: new this.props.google.maps.Size(64, 64),
            scaledSize: new this.props.google.maps.Size(128, 64)
        }

        return (
            <Map google={this.props.google}
                zoom={18}
                style={style}
                onReady={this.updateCurrentPosition}
                center={{
                    lat: this.state.lat,
                    lng: this.state.lng
                }}
            >
                <Marker
                    onClick={this.onMarkerClick}
                    position={{
                        lat: this.state.lat,
                        lng: this.state.lng
                    }}
                    // icon={pointerSVG}
                    className="your_marker"
                    name={'Current location'}
                    style={{width:'1rem', height: '1rem'}} />
                    
                <InfoWindow onClose={this.onInfoWindowClose}>
                <div>
                <h1>{this.state.selectedPlace.name}</h1>
                </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GMAPS_APIKEY
})(MapContainer)