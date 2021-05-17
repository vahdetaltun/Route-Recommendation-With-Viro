/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-fallthrough */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {
  Container,
  Form,
  Input,
  Item,
  Button,
  Label,
} from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';



const firebaseConfig = {
  clientId:
    '1024714319659-lmt1ci8gh2aglp2d88cr9th5vei343ji.apps.googleusercontent.com',
  appId: '1:1024714319659:android:fb8b264883aa3a146f076e',
  apiKey: 'AIzaSyAYGO8DoGtW-v8lEdDbtagGNp5ogtAA8ok',
  databaseURL: 'https://trota-8c9f3.firebaseio.com',
  storageBucket: 'trota-8c9f3.appspot.com',
  messagingSenderId: '1024714319659',
  projectId: 'trota-8c9f3',
  persistence: true,
};

firebase.initializeApp(firebaseConfig);

const rootRef = firebase.database().ref();
const userRef = rootRef.child('users');


const { width, height } = Dimensions.get('window');
export default class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      users: [],
      name: '',
      surname: '',
      username: '',
      loading: false,
    };
  }

  isHere() {
    rootRef
      .child('users')
      .orderByChild('username')
      .equalTo(this.state.username)
      .once('value', snapshot => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          console.log('exists!', userData);
          alert('Kullanıcı adı zaten mevcut !');
        } else {
          rootRef
            .child('users')
            .orderByChild('email')
            .equalTo(this.state.email)
            .once('value', snapshot => {
              if (snapshot.exists()) {
                const userData = snapshot.val();
                console.log('exists!', userData);
                alert('Email zaten mevcut !');
              } else {
                this.signUpUser(this.state.email, this.state.password);
                userRef.push({
                  email: this.state.email,
                  name: this.state.name,
                  surname: this.state.surname,
                  username: this.state.username,
                  approve: true,
                }),
                Actions.login()
              }
            });
        }
      });
  }
  onPressAdd = () => {
    this.isHere();
  };

  signUpUser = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(u => { })
      .catch(error => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert(`Email address ${this.state.email} already in use.`);
          case 'auth/invalid-email':
            console.log(`Email address ${this.state.email} is invalid.`);
          case 'auth/operation-not-allowed':
            console.log('Error during sign up.');
          case 'auth/weak-password':
            console.log(
              'Password is not strong enough. Add additional characters including special characters and numbers.',
            );
          default:
            console.log(error.message);
        }
      });
  };

  render() {
    let data = [{
      value: 'Erkek',
    }, {
      value: 'Kadın',
    }];
    return (
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
          <View>
            <Item floatingLabel>
              <Label style={{ color: 'white' }}>İsim</Label>
              <Input
                style={{ color: 'white' }}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={text => this.setState({ name: text })}
                value={this.state.name}
              />
            </Item>
            <Item floatingLabel>
              <Label style={{ color: 'white' }}>Soyisim</Label>
              <Input
                style={{ color: 'white' }}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={text => this.setState({ surname: text })}
                value={this.state.surname}
              />
            </Item>
            <Item floatingLabel>
              <Label style={{ color: 'white' }}>Kullanıcı Adı</Label>
              <Input
                style={{ color: 'white' }}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={text => this.setState({ username: text })}
                value={this.state.username}
              />
            </Item>
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
            <View style={{ marginTop: 30 }}>
              <Button style={styles.buttonsignUp} onPress={this.onPressAdd}>
                <Text style={styles.buttonTextSignUp}>Kayıt Ol</Text>
              </Button>
              <View>

              </View>
            </View>
          </View>
        </Form>
        <Text style={{ color: 'white', marginTop: 15, fontSize: 15, textDecorationLine: 'underline' }} onPress={() => Actions.login()}>
          Giriş Sayfasına Git
          </Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({

  buttonsignUp: {
    width: width * 0.71,
    height: height * 0.07,
    backgroundColor: '#008C7B',
    opacity: 0.9,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonTextSignUp: {
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    width: width * 0.64,
  },


});