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
        "option1" : "1998",
        "option2" : "1999",
        "option3" : "2000",
        "option4" : "2001"
      },
      "question" : "Kale son halini ne zaman almıştır ?"
    },
    "question2" : {
      "correctoption" : "option4",
      "options" : {
          "option1" : "Savunma",
          "option2" : "Şehir",
          "option3" : "Haber Kulesi",
          "option4" : "Gözlem Kulesi"
        },
      "question" : "Kale, Roma döneminde ne amaçla kullanılmıştır ?"
    },
    "question3" : {
      "correctoption" : "option1",
      "options" : {
          "option1" : "Gaziantep",
          "option2" : "Adana",
          "option3" : "Kahramanmaraş",
          "option4" : "Şanlıurfa"
        },
      "question" : "Gaziantep Kalesi hangi illerin sınırları içerisindedir ?"
    },
    "question4" : {
      "correctoption" : "option2",
      "options" : {
          "option1" : "Antiochia",
          "option2" : "Ayıntap",
          "option3" : "Antakya",
          "option4" : "Hantap"
        },
      "question" : "Gaziantep'in eski adı nedir ?"
    },
    "question5" : {
      "correctoption" : "option3",
      "options" : {
          "option1" : "Ankara",
          "option2" : "İzmir",
          "option3" : "Gaziantep",
          "option4" : "İstanbul"
        },
      "question" : "Mustafa Kemal Atatürk'ün kütüğü hangi ildedir ?"
    }
  }
}
}
export default class Quiz extends Component {
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