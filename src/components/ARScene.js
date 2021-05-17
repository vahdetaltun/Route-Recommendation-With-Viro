
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';
import { Actions } from 'react-native-router-flux';

var sharedProps = {
  apiKey:"API_KEY_HERE",
}

var InitialARCARScene = require('../components/ARInfo');
var AR_NAVIGATOR_TYPE = "AR";

var defaultNavigatorType = AR_NAVIGATOR_TYPE;

export default class ARScene extends Component {
  
  constructor() {
    super();
    
    this.state = {
      navigatorType : defaultNavigatorType,
      
      sharedProps : sharedProps
    }
    this._getARNavigator = this._getARNavigator.bind(this);
  }
  render() {
    const {email} = this.props.email;
    const {location} = this.props.location;
    console.log("ARSCene", location,email);

    AsyncStorage.multiSet([
      ["email",email],
      ["location",location],
    ]);

    console.log(location,"sğosadğsads");
    return(
     this._getARNavigator()     
   );
  }

  _getARNavigator() {
    
    return (
      <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialARCARScene}} />
        
    );
  }
}

module.exports = ARScene
