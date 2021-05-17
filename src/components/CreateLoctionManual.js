import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import Buttons from './commons/Buttons';

const { width, height } = Dimensions.get('window');
export default class CreateLoctionManual extends React.Component {
    state = {
        yourLocation: 'Nereden ?',
        herLocation: 'Nereye ?',
        yourImgOk: require('../img/ok.png'),
        herImgOk: require('../img/ok.png'),
        yourLongLat: [],
        herLongLat: [],
    };


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
        RNGooglePlaces.openAutocompleteModal()
            .then(place => {
                console.log(place);
                if (type === 'my') {
                    this.setState({
                        yourLocation: place.name,
                        yourImgOk: require('../img/check.png'),
                        yourLongLat: [place.location.latitude, place.location.longitude],
                    });
                } else {
                    this.setState({
                        herLocation: place.name,
                        herImgOk: require('../img/check.png'),
                        herLongLat: [place.location.latitude, place.location.longitude],
                    });
                }
            })
            .catch(error => console.log(error.message));
    }
    render() {
        return (
            <ImageBackground
                source={require('../img/CreateLoctionManualPage/bg.png')}
                style={styles.BackgroundStyleMain}
                >
                <Image source={require('../img/CreateLoctionManualPage/logo.png')} />
                {this.renderSection(
                    this.state.yourLocation,
                    () => this.openSearchModal('my'),
                    this.state.yourImgOk,
                )}
                
                {this.renderSection(
                    this.state.herLocation,
                    () => this.openSearchModal('her'),
                    this.state.herImgOk,
                )}
                <Buttons
                    text='Konum Oluştur'
                    onPress={() =>
                        Actions.Map()
                    }
                />
            </ImageBackground>
            
        );
    }
}//end of Component

const styles = StyleSheet.create({
    BackgroundStyleMain: {
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    section: {
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        width: width * 0.59,
        height: height * 0.045,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
      },

});