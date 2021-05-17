import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
} from 'react-native';
import MapView, {
    PROVIDER_GOOGLE,
    Marker,
} from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';
import MapViewDirections from 'react-native-maps-directions';
import { Actions } from 'react-native-router-flux';

const LATITUDE_DELTA = 3;
const LONGITUDE_DELTA = 3;
const GOOGLE_API_KEY = 'AIzaSyAYGO8DoGtW-v8lEdDbtagGNp5ogtAA8ok';

const { width, height } = Dimensions.get('window');
export default class RouteRecommendation extends React.Component {
    state = {
        region: {
            //initial Region
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0,
            longitudeDelta: 0,
        },
        DestinationLocation: 'Gitmek istediğiniz adresi giriniz...',
        yourImgOk: require('../img/ok.png'),
        destinationplace: [],
        currentPlaceName: '',
    };
    componentWillMount() {
        console.log(this.props.data); 
        const { yourGPSLocation } = this.props.data;   
        this.setState({
            region: {
                latitude: yourGPSLocation[0],
                longitude: yourGPSLocation[1],
                //latitude: 37.06622,
                //longitude: 37.38332,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            },
            destinationplace: [yourGPSLocation[0], yourGPSLocation[1]],
            //destinationplace: [37.06622, 37.38332]
        });
    }
    renderSection(text, onPress, img) {
        return (
            <View style={styles.section}>
                <TouchableOpacity
                    onPress={onPress}
                    style={{
                        flex: 1,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <Text style={{ textAlign: 'center', flex: 9 }}>{text}</Text>
                    <Image source={img} />
                </TouchableOpacity>
            </View>
        );
    }
    openSearchModal(type) {
        const { yourGPSLocation } = this.props.data;
        RNGooglePlaces.openAutocompleteModal()
            .then(place => {
                console.log(place);
                //console.log(this.state)
                if (type === 'my') {
                    this.setState({
                        DestinationLocation: place.name,
                        yourImgOk: require('../img/checkWhite.png'),
                        destinationplace: [place.location.latitude, place.location.longitude],
                        region: {
                            latitude: yourGPSLocation[0],
                            longitude: yourGPSLocation[1],
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        }
                    });
                }
            })
            .catch(error => console.log(error.message));
    }
    render() {
        const { yourGPSLocation } = this.props.data;
        const origin = { latitude: yourGPSLocation[0], longitude: yourGPSLocation[1] };
        //const origin = { latitude: 37.06622, longitude: 37.38332 };
        const destination = { latitude: this.state.destinationplace[0], longitude: this.state.destinationplace[1] }
        //const destination = { latitude: 37.06623, longitude: 37.38333 };
        const title = this.state;
        const {email} = this.props.email;
        return (
            <View>
                {this.renderSection(
                    this.state.DestinationLocation,
                    () => this.openSearchModal('my'),
                    this.state.yourImgOk,
                )}
                <MapView
                    // eslint-disable-next-line react-native/no-inline-styles
                    provider={PROVIDER_GOOGLE}
                    style={styles.MapStyle}
                    region={this.state.region}
                    onRegionChange={this.onRegionChange}
                    customMapStyle = {generatedMapStyle}
                >
                    <Marker
                        //Hedef Marker
                        coordinate={destination}
                        title={title.DestinationLocation}
                        description={"Varış Noktanız"}
                        pinColor='green'
                    />
                    <Marker
                        coordinate={origin}
                        title={'Başlangıç Noktanız'}
                    //description={"denemeMarkerString.str"}
                    />
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_API_KEY}
                        strokeWidth={5}
                        strokeColor="limegreen"
                    />

                </MapView>
                <TouchableOpacity
                    style={styles.BtnAR}
                    onPress={() => Actions.ARScene({
                      email: {
                        email: email, 
                      },
                      location: {
                        location: yourGPSLocation,
                      },
                    })}
                >
                    <Image source={require('../img/ARLogo.png')} style={styles.ARLogoStyle} />
                    <Text style={styles.ARTextStyle}>Bilgi Al</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    ARTextStyle: {
        color: 'white',
        fontWeight: 'bold',
    },
    ARLogoStyle: {
        width:40,
        height:40,
        
    },
    BtnAR: {
        width,
        height: height * 9 / 100,
        backgroundColor: '#008C7B',
        alignItems: 'center',
        justifyContent: 'center',
    },
    MapStyle: {
        width,
        height: height * 83 / 100,
    },
    section: {
        backgroundColor: '#008C7B',
        width,
        height: height * 0.05,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
});
const generatedMapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#263c3f"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6b9a76"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#212a37"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#1f2835"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#f3d19c"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2f3948"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#515c6d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
  ]

