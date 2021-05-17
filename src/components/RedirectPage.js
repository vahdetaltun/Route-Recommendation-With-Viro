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


import { Actions } from 'react-native-router-flux';





const { width, height } = Dimensions.get('window');
export default class RedirectPage extends React.Component {
    state ={
        toWhere : 0,
    };
    redirect=() => {
        const target = this.props.data
        this.setState({toWhere:target})
        console.log(this.props.data,"props data")        
        console.log(this.state.toWhere)
        if(this.state.toWhere==={q1:1}){
            Actions.Quiz()
        }
        else if(this.state.toWhere==={q2:2}){
            Actions.Quiz1()
        }
        else if(this.state.toWhere==={q3:3}){
            Actions.Quiz2()
        }            
    }  
  render() {
    return (
       
            <View>
                <Button onPress={
                      () =>
                        this.redirect()}> 
                <Text>
                      Teste başla
                    </Text>        
                </Button>
            </View>

    );
  }
}

