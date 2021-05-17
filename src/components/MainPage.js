import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
} from 'react-native-maps';
import { Actions } from 'react-native-router-flux';

const LATITUDE_DELTA = 0.002;
const LONGITUDE_DELTA = 0.002;

const { width, height } = Dimensions.get('window');
export default class MainPage extends React.Component {
  state = {
    region: {
      latitude: 37.78825,
      longitude: 122.4324,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    yourGPSLocation: [],
  };

  componentDidMount() {
    console.log(this.props.data,"111111");
    const {yourGPSLocation} = this.props.data;
    this.setState({
      region: {
        latitude: yourGPSLocation[0],
        longitude: yourGPSLocation[1],
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
     
    });
  }
  barItems = (type, onpress) => {
    return (
      <TouchableOpacity onPress={onpress}>
        <Image
          source={type}
          style={styles.styleInBottombar}
        />
      </TouchableOpacity>

    );
  };
  render() {
    const {yourGPSLocation} = this.props.data;
    const origin = { latitude: yourGPSLocation[0], longitude: yourGPSLocation[1]}
    const {email} = this.props.email;
    //const denemeMarkerString = { str: 'Not Found 404!' }
    return (
      <ImageBackground style={styles.backGround} source={require('../img/bg.png')}>
        <MapView
          // eslint-disable-next-line react-native/no-inline-styles
          provider={PROVIDER_GOOGLE}
          style={styles.MapConfigMainPage}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          customMapStyle = {generatedMapStyle}
        >
          <Marker
            coordinate={origin}
            title={'Buradasınız'}
            //description={denemeMarkerString.str}
            pinColor='purple'
          />
        </MapView>

        <ScrollView style={styles.descriptionPanelMain}>
          <Text style={styles.TextConfig}>
            Gaziantep ya da eski ve halk arasındaki adıyla Antep, Türkiye'nin
            bir ili ve en kalabalık sekizinci şehri. 2017 itibarıyla 2.005.515
            nüfusa sahiptir. Güneydoğu Anadolu Bölgesi'nde sanayi ve
            gelişmişlik bakımından birincidir. hâlâ yaşanılan en eski
            kentlerinden biridir.
            Konumu sebebiyle Gaziantep'te Akdeniz iklimi ve karasal iklim bir
            karışımı görülmektedir. Hava özellikle Haziran, Temmuz, Ağustos ve
            Eylül aylarında çok sıcaktır. Aralık, Ocak ve Şubat aylarında ise
            çok soğuktur. Gaziantep'te ölçülen en yüksek sıcaklık 44 °C, en
            düşük sıcaklık ise -13 °C'dir. Haziran-Eylül arasında Gaziantep,
            en az yağışı alır. En çok yağışı ise Aralık-Şubat arasında alır.
            Konumu sebebiyle Gaziantep'te Akdeniz iklimi ve karasal iklim bir
            karışımı görülmektedir. Hava özellikle Haziran, Temmuz, Ağustos ve
            Eylül aylarında çok sıcaktır. Aralık, Ocak ve Şubat aylarında ise
            çok soğuktur. Gaziantep'te ölçülen en yüksek sıcaklık 44 °C, en
            düşük sıcaklık ise -13 °C'dir. Haziran-Eylül arasında Gaziantep,
            en az yağışı alır. En çok yağışı ise Aralık-Şubat arasında alır.
            Konumu sebebiyle Gaziantep'te Akdeniz iklimi ve karasal iklim bir
            karışımı görülmektedir. Hava özellikle Haziran, Temmuz, Ağustos ve
            Eylül aylarında çok sıcaktır. Aralık, Ocak ve Şubat aylarında ise
            çok soğuktur. Gaziantep'te ölçülen en yüksek sıcaklık 44 °C, en
            düşük sıcaklık ise -13 °C'dir. Haziran-Eylül arasında Gaziantep,
            en az yağışı alır. En çok yağışı ise Aralık-Şubat arasında alır.
          </Text>
        </ScrollView>

        <View style={styles.Bottombar}>
          {this.barItems(require('../img/home.png'),
            () => Actions.MainPage(
              {
                data: {
                  yourGPSLocation,
                },
                email: {
                  email:email,
                },
              }
            ),
          )}
          {this.barItems(require('../img/pusula.png'),
            () => Actions.RouteRecommendation({
              data: {
                yourGPSLocation,
              },
              email: {
                email:email,
              },
            })
          )}
          {this.barItems(require('../img/calendar.png'),
          () => Actions.calendar())}

          {this.barItems(require('../img/kupa.png'),
          ()=> Actions.Quiz({
            email: {
              email:email,
            },
          }))}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  TextConfig: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20,
    textAlign: 'justify',
  },
  styleInBottombar: {
    height: 40,
    width: 40,
    margin: (5, 0, 0, 5),
  },
  Bottombar: {
    width,
    height: height * 10 / 100,
    justifyContent: 'space-between',
    backgroundColor: '#008C7B',
    flexDirection: 'row',
  },
  descriptionPanelMain: {
    width,
    height: height * 40 / 100,
    backgroundColor: '#F8FDFD',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  MapConfigMainPage: {
    width,
    height: height * 50 / 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backGround: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const generatedMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]