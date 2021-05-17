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
        "option1" : "Adana",
        "option2" : "Hatay",
        "option3" : "Adıyaman",
        "option4" : "Mardin"
      },
      "question" : "Nemrut heykelleri nerede bulunur ?"
    },
    "question2" : {
      "correctoption" : "option4",
      "options" : {
          "option1" : "Constantine",
          "option2" : "İmparator Neron",
          "option3" : "Midas",
          "option4" : "Kral I. Antiochos"
        },
      "question" : "Nemrut heykellerini kim yaptırmıştır ?"
    },
    "question3" : {
      "correctoption" : "option1",
      "options" : {
          "option1" : "Kireçtaşı",
          "option2" : "Kehribar",
          "option3" : "Mermer",
          "option4" : "Kuka"
        },
      "question" : "Heykellerin hammadesi nedir ?"
    },
    "question4" : {
      "correctoption" : "option2",
      "options" : {
          "option1" : "1-2 metre",
          "option2" : "8-10 metre",
          "option3" : "15-20 metre",
          "option4" : "30-35 metre"
        },
      "question" : "Nemrut heykellerinin ortalama yükseklikleri ne kadardır ?"
    },
    "question5" : {
      "correctoption" : "option3",
      "options" : {
          "option1" : "Kuzey Terası",
          "option2" : "Güney Terası",
          "option3" : "Doğu Terası",
          "option4" : "Batı Terası"
        },
      "question" : "Nemrut heykellerinin en önemli kalıntıları nerededir ?"
    }
  }
}
}
export default class Quiz1 extends Component {
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