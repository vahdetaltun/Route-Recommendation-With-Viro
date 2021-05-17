'use strict';

import {
  ViroARScene,
  ViroAnimations,
  ViroLightingEnvironment,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroImage,
  ViroMaterials,
} from 'react-viro';
import React from 'react';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';


var createReactClass = require('create-react-class');
var ARInfo = createReactClass({
  getInitialState() {
    return {
      texture: "white",
      playAnim: false,
      animateCar: false,
      tapWhite: false,
      tapBlue: false,
      tapGrey: false,
      tapRed: false,
      tapYellow: false,
      locations:'',
    }
  },
  render: function() {
   AsyncStorage.multiGet(['email','location']).then((data) => {
    let emailibo = data[0][1];
    let location = data[1][1];
    this.props = emailibo;
    this.locations = location;
    console.log(data,"poıjsadpoısadğpsağpdsağp");
   
    });
    console.log(this.locations, "location log");
    console.log(this.props,"sadassa");
    return (
      <ViroARScene>
        <ViroLightingEnvironment source={require('../img/res/tesla/garage_1k.hdr')}/>
        <ViroARImageMarker target={"target_001"} onAnchorFound={this._onAnchorFound} pauseUpdates={this.state.pauseUpdates}>
         <ViroImage source={require('../img/Info/kaleInfo.png')} rotation={[-90, 0, 0]} scale={[.2, .2, .2]} onClick={()=>Actions.Quiz({
           email: {
            email: this.props,
          }
         })}/>    
         <ViroImage source={require('../img/Ottoman_Janissary.png')} rotation={[-90, 0, 0]} scale={[.08, .08, .08]} position={[-.15, 0, 0]} />   
         <ViroImage source={require('../img/antep-fıstığı.png')} rotation={[-90, 0, 0]} scale={[.1, .1, .1]} position={[.15, 0, 0]}/>   
         <ViroImage source={require('../img/ATATURK.jpg')} rotation={[-90, 0, 0]} scale={[.1, .1, .1]} position={[0, 0, .15]}/>           
        </ViroARImageMarker>
        <ViroARImageMarker target={"target_002"} onAnchorFound={this._onAnchorFound} pauseUpdates={this.state.pauseUpdates}>
          <ViroImage source={require('../img/Info/nemrutInfo.png')} rotation={[-90, 0, 0]} scale={[.2, .2, .2]} onClick={()=>Actions.Quiz1({
            email: {
              email:this.props,
            }
          })} />
          <ViroImage source={require('../img/nemrut1.png')} rotation={[-90, 0, 0]} scale={[.08, .08, .08]} position={[-.15, 0, 0]} />   
          <ViroImage source={require('../img/nemrut2.png')} rotation={[-90, 0, 0]} scale={[.1, .1, .1]} position={[.15, 0, 0]}  />
        </ViroARImageMarker>       
        <ViroARImageMarker target={"target_003"} onAnchorFound={this._onAnchorFound} pauseUpdates={this.state.pauseUpdates}>
          <ViroImage source={require('../img/Info/peribacalariInfo.png')} rotation={[-90, 0, 0]} scale={[.2, .2, .2]} onClick={()=>Actions.Quiz2({
            email: {
                email:this.props,
              }
          })} />
          <ViroImage source={require('../img/balon1.png')} rotation={[-90, 0, 0]} scale={[.1, .1, .1]} position={[-.15, -.15, 0]} />   
          <ViroImage source={require('../img/balon2.png')} rotation={[-90, 0, 0]} scale={[.1, .1, .1]} position={[.15, .15, 0]}  />
          <ViroImage source={require('../img/balon3.png')} rotation={[-90, 0, 0]} scale={[.1, .1, .1]} position={[.15, -.15, 0]}  />
          <ViroImage source={require('../img/balon4.png')} rotation={[-90, 0, 0]} scale={[.1, .1, .1]} position={[-.15, .15, 0]}  />
        </ViroARImageMarker>
      </ViroARScene>


    );
  },
  _onAnchorFound() {
    ()=>Actions.SignUp()
  },
});



ViroARTrackingTargets.createTargets({ 
  target_001 : {
    source : require('../img/GaziantepKalesi.jpg'),
    orientation : "Up",
    physicalWidth : 0.165 // real world width in meters
  },
  target_002 : {
    source : require('../img/Nemrut.jpg'),
    orientation : "Up",
    physicalWidth : 0.165 // real world width in meters
  },
  target_003 : {
    source : require('../img/PeriBacalari.jpg'),
    orientation : "Up",
    physicalWidth : 0.165 // real world width in meters
  }
});

ViroMaterials.createMaterials({
  white: {
    lightingModel: "PBR",
    diffuseTexture: require('../img/res/tesla/object_car_main_Base_Color.png'),
    metalnessTexture: require('../img/res/tesla/object_car_main_Metallic.png'),
    roughnessTexture: require('../img/res/tesla/object_car_main_Roughness.png'),
  },
  blue: {
    lightingModel: "PBR",
    diffuseTexture: require('../img/res/tesla/object_car_main_Base_Color_blue.png'),
    metalnessTexture: require('../img/res/tesla/object_car_main_Metallic.png'),
    roughnessTexture: require('../img/res/tesla/object_car_main_Roughness.png'),
  },
  grey: {
    lightingModel: "PBR",
    diffuseTexture: require('../img/res/tesla/object_car_main_Base_Color_grey.png'),
    metalnessTexture: require('../img/res/tesla/object_car_main_Metallic.png'),
    roughnessTexture: require('../img/res/tesla/object_car_main_Roughness.png'),
  },
  red: {
    lightingModel: "PBR",
    diffuseTexture: require('../img/res/tesla/object_car_main_Base_Color_red.png'),
    metalnessTexture: require('../img/res/tesla/object_car_main_Metallic.png'),
    roughnessTexture: require('../img/res/tesla/object_car_main_Roughness.png'),
  },
  yellow: {
    lightingModel: "PBR",
    diffuseTexture: require('../img/res/tesla/object_car_main_Base_Color_yellow.png'),
    metalnessTexture: require('../img/res/tesla/object_car_main_Metallic.png'),
    roughnessTexture: require('../img/res/tesla/object_car_main_Roughness.png'),
  },
  white_sphere: {
    lightingModel: "PBR",
    diffuseColor: "rgb(231,231,231)",
  },
  blue_sphere: {
    lightingModel: "PBR",
    diffuseColor: "rgb(19,42,143)",
  },
  grey_sphere: {
    lightingModel: "PBR",
    diffuseColor: "rgb(75,76,79)",
  },
  red_sphere: {
    lightingModel: "PBR",
    diffuseColor: "rgb(168,0,0)",
  },
  yellow_sphere: {
    lightingModel: "PBR",
    diffuseColor: "rgb(200,142,31)",
  },
});

ViroARTrackingTargets.createTargets({
  logo : {
    source : require('../img/res/logo.png'),
    orientation : "Up",
    physicalWidth : 0.165 // real world width in meters
  }
});

ViroAnimations.registerAnimations({
    scaleUp:{properties:{scaleX:1, scaleY:1, scaleZ:1,},
                  duration: 500, easing: "bounce"},
    scaleDown:{properties:{scaleX:0, scaleY:0, scaleZ:0,},
                  duration: 200,},
    scaleCar:{properties:{scaleX:.09, scaleY:.09, scaleZ:.09,},
                  duration: 500, easing: "bounce"},
    scaleSphereUp:{properties:{scaleX:.8, scaleY:.8, scaleZ:.8,},
                  duration: 50, easing: "easeineaseout"},
    scaleSphereDown:{properties:{scaleX:1, scaleY:1, scaleZ:1,},
                  duration: 50, easing: "easeineaseout"},
    tapAnimation:[["scaleSphereUp", "scaleSphereDown"],]
});

module.exports = ARInfo;