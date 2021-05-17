import React from 'react';
import { Actions } from 'react-native-router-flux';
import {
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  View,
  Dimensions,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {
  Container,
  Form,
  Input,
  Item,
  Label,
  Button,
} from 'native-base';
import Geolocation from '@react-native-community/geolocation';
import * as firebase from 'firebase';
import Buttons from './commons/Buttons';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';


const { width, height } = Dimensions.get('window');
export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    yourGPSLocation: [],
  };
  _fbAuth() {

    LoginManager.logInWithPermissions(['public_profile', 'email']).then(function (result) {
      if (result.isCancelled) {
        console.log('login was cancelled');
      }
      else {
        AccessToken.getCurrentAccessToken().then((accessTokenData) => {
          const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken)
          firebase.auth().signInWithCredential(credential).then((result) => {
          },
            (error) => {
              console.log(error);
            }
          )
        })
      }
    },
      function (error) {
      })
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log(user)
      }
    })
    //initial configuration
    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId generated from Firebase console
      webClientId: 'REPLACE_YOUR_WEB_CLIENT_ID_HERE',
    });
    //Check if user is already signed in
    this._isSignedIn();
    var that = this;
    //Checking for the permission just after component loaded
    if (Platform.OS === 'ios') {
      this.callLocation(that);
    } else {
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            that.callLocation(that);
          } else {
            // eslint-disable-next-line no-alert
            alert('Permission Denied');
          }
        } catch (err) {
          // eslint-disable-next-line no-alert
          alert('err', err);
          console.warn(err);
        }
      }
      requestLocationPermission();
    }
  };
  _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      alert('User is already signed in');
      //Get the User details as user is already signed in
      this._getCurrentUserInfo();
    } else {
      //alert("Please Login");
      console.log('Please Login');
    }
    this.setState({ gettingLoginStatus: false });
  };
  _getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log('User Info --> ', userInfo);
      this.setState({ userInfo: userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };
  _signIn = async () => {
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      this.setState({ userInfo: userInfo });
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };
  _signOut = async () => {
    //Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ userInfo: null }); // Remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  callLocation(that) {
    //alert("callLocation Called");
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        that.setState({ yourGPSLocation: [currentLatitude, currentLongitude] });
        //Setting state Longitude to re re-render the Longitude Text
        //this.setState({ currentLatitude: currentLatitude });
        //Setting state Latitude to re re-render the Longitude Text
      },
      // eslint-disable-next-line no-alert
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000 },
    );
    that.watchID = Geolocation.watchPosition(position => {
      //Will give you the location on location change
      console.log(position);

      //const currentLongitude = JSON.stringify(position.coords.longitude);
      //getting the Longitude from the location json
      //const currentLatitude = JSON.stringify(position.coords.latitude);
      //getting the Latitude from the location json
      that.setState({
        yourGPSLocation: [position.coords.latitude, position.coords.longitude],
      });
      //Setting state Longitude to re re-render the Longitude Text
      //that.setState({currentLatitude: currentLatitude});
      //Setting state Latitude to re re-render the Longitude Text
    });
  }
  componentWillUnmount = () => {
    Geolocation.clearWatch(this.watchID);
  };
  loginUser = (email, password, yourGPSLocation) => {

    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function (user) {
          console.log(yourGPSLocation);
          Actions.MainPage({
            data: {
              yourGPSLocation,
            },
            email: {
              email,
            },

          });
        })
        .catch(function(error){
          var errorcode = error.code;
          if (errorcode === 'auth/wrong-password') {
            alert('Şifre yanlış !');
          }else {
            alert("Email veya şifre yanlış !");
          }
        });
    } catch (error){
      console.log(error)
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <ImageBackground
          source={require('../img/signupdesign.png')}
          style={{
            width,
            height,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={require('../img/TROTA.png')} />

          <Form>
            <View style={{ marginTop: 50 }}>
              <Item floatingLabel>
                <Label style={{ color: 'white' }}>Email</Label>
                <Input
                  style={{ color: 'white' }}
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={email => this.setState({ email })}
                />
              </Item>
              <Item floatingLabel>
                <Label style={{ color: 'white' }}>Şifre</Label>
                <Input
                  style={{ color: 'white' }}
                  secureTextEntry={true}
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={password => this.setState({ password })}
                />
              </Item>
              <View style={{ marginTop: 40 }}>
                <View>
                  <Buttons
                    text='Giriş'
                    onPress={() =>
                      this.loginUser(this.state.email, this.state.password, this.state.yourGPSLocation)
                    } />
                  <Button
                    style={styles.BtnStyleGoogle}
                    onPress={
                      () =>
                        this._signIn()
                    }>
                    <Image source={require('../img/googleLogo.png')} style={styles.OtherLoginIconStyles} />
                    <Text style={styles.OtherLoginTxtBtn}>
                      Google Hesabınla Bağlan
                    </Text>
                  </Button>
                  <Button
                    style={styles.BtnStyleFacebook}
                    onPress={
                      () =>
                        this._fbAuth()
                    }>
                    <Image source={require('../img/fbLogo.png')} style={styles.OtherLoginIconStyles} />
                    <Text style={styles.OtherLoginTxtBtn}>
                      Facebook Hesabınla Bağlan
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
          </Form>
          <Text style={{ color: 'white', marginTop: 15, fontSize: 15, textDecorationLine: 'underline' }} onPress={() => Actions.SignUp()}>
            Hesabınız yok mu ?
          </Text>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  OtherLoginIconStyles: {
    width: width * 8.5 / 100,
    height: height * 6 / 100,
  },
  OtherLoginTxtBtn: {
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    width: width * 0.56,
  },
  BtnStyleGoogle: {
    width: width * 0.71,
    height: height * 0.075,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DD4F43',
    flexDirection: 'row',
  },
  BtnStyleFacebook: {
    width: width * 0.71,
    height: height * 0.07,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3A549F',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
    margin: 10,
  },
});