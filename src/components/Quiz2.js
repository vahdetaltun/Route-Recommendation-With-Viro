import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PlayQuiz from './PlayQuiz';
import Animbutton from './animbutton'
import { Actions } from 'react-native-router-flux';
const { width, height } = Dimensions.get('window')
let arrnew = []
const jsonData = {"quiz" : {
  "quiz1" : {
    "question1" : {
      "correctoption" : "option3",
      "options" : {
        "option1" : "İnce kısa",
        "option2" : "Kalın uzun",
        "option3" : "İnce uzun",
        "option4" : "Kalın kısa"
      },
      "question" : "Peri bacalarının şekli nasıldır?"
    },
    "question2" : {
      "correctoption" : "option4",
      "options" : {
          "option1" : "Havadaki oksijenin oksitlenmesiyle",
          "option2" : "Erozyonla",
          "option3" : "Zanaatkar insanların yardımıyla",
          "option4" : "Sel sularının yeri aşındırmasıyla"
        },
      "question" : "Peri bacaları nasıl oluşmuştur ?"
    },
    "question3" : {
      "correctoption" : "option1",
      "options" : {
          "option1" : "Gövdesi mineral, tepesi sert kaya",
          "option2" : "Gövdesi sert kaya, Tepesi Mineral",
          "option3" : "Gövdesi ve tepesi sert kaya",
          "option4" : "Gövdesi ve tepesi mineral"
        },
      "question" : "Peri bacalarının gövdesi ve tepesi nasıl oluşmuştur ?"
    },
    "question4" : {
      "correctoption" : "option2",
      "options" : {
          "option1" : "Üçgenimsi ",
          "option2" : "Konik",
          "option3" : "Dikdörtgen",
          "option4" : "Küp"
        },
      "question" : "Peri bacaları şekli nasıldır ?"
    },
    "question5" : {
      "correctoption" : "option3",
      "options" : {
          "option1" : "Niğde",
          "option2" : "Sivas",
          "option3" : "Nevşehir",
          "option4" : "Konya"
        },
      "question" : "Peri bacaları hangi ilimizdedir ?"
    }
  }
}
}
export default class Quiz2 extends Component {
  constructor(props){
    super(props);
    this.qno = 0
    this.score = 0

    const jdata = jsonData.quiz.quiz1
    arrnew = Object.keys(jdata).map( function(k) { return jdata[k] });
    this.state = {
      question : arrnew[this.qno].question,
      options : arrnew[this.qno].options,
      correctoption : arrnew[this.qno].correctoption,
      countCheck : 0
    }

  }
  prev(){
    if(this.qno > 0){
      this.qno--
      this.setState({ question: arrnew[this.qno].question, options: arrnew[this.qno].options, correctoption : arrnew[this.qno].correctoption})
    }
  }
  next(){
    if(this.qno < arrnew.length-1){
      this.qno++

      this.setState({ countCheck: 0, question: arrnew[this.qno].question, options: arrnew[this.qno].options, correctoption : arrnew[this.qno].correctoption})
    }else{
      const {email} = this.props.email;
      //const {yourGPSLocation} = this.props.data
      //console.log(yourGPSLocation,"quiz")
      console.log(email,"dış");
      Actions.PlayQuiz({
        data: {
          score:this.score*100/5,          
        },
        email: {
          email:email,
         },
         /*
         location: {
           location:yourGPSLocation,
         }
         */
      })
      
     }
  }
  _answer(status,ans){
    this.next()
    if(status == true){
      console.log(status)
        const count = this.state.countCheck + 1
        this.setState({ countCheck: count })
        if(ans == this.state.correctoption ){
          this.score += 1
        }
      }else{
        console.log(status)
        const count = this.state.countCheck - 1
        this.setState({ countCheck: count })
        if(this.state.countCheck < 1 || ans == this.state.correctoption){
        this.score -= 1
       }
      }

  }
  render() {
    let _this = this
    const currentOptions = this.state.options
    const options = Object.keys(currentOptions).map( function(k) {
      return (  <View key={k} style={{margin:10}}>

        <Animbutton countCheck={_this.state.countCheck} onColor={"green"} effect={"tada"} _onPress={(status) => _this._answer(status,k)} text={currentOptions[k]} />
        
      </View>)
    });

    return (
      <ScrollView style={{backgroundColor: '#F5FCFF',paddingTop: 10}}>
      <View style={styles.container}>

      <View style={{ flex: 1,flexDirection: 'column', justifyContent: "space-between", alignItems: 'center',}}>

      <View style={styles.oval} >
        <Text style={styles.welcome}>
          {this.state.question}
        </Text>
     </View>
        <View>
        { options }
        </View>
        </View>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  oval: {
  width: width * 90/100,
  borderRadius: 20,
  backgroundColor: 'green'
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    margin: 15,
    color: "white"
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});