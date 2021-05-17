import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import ARScene from './components/ARScene';
import ARInfo from './components/ARInfo';
import SignUp from './components/SignUp';
import Login from './components/Login';
import MainPage from './components/MainPage';
import CreateLoctionManual from './components/CreateLoctionManual';
import RouteRecommendation from './components/RouteRecommendation';
import Quiz from './components/Quiz';
import Quiz1 from './components/Quiz1';
import Quiz2 from './components/Quiz2';
import PlayQuiz from './components/PlayQuiz';
import RedirectPage from './components/RedirectPage';
import calendar from './components/calendar';

class Root extends Component {
  render() {
    return (
      <Router>
        <Scene key="Root">
        <Scene key="SignUp" component={SignUp} hideNavBar />   
          <Scene key="RedirectPage" component={RedirectPage} hideNavBar />  
          <Scene key="calendar" component={calendar} hideNavBar  />       
          <Scene key="ARScene" component={ARScene} hideNavBar />
          <Scene key="ARInfo" component={ARInfo} hideNavBar />
          <Scene key="Quiz" component={Quiz} hideNavBar />
          <Scene key="Quiz1" component={Quiz1} hideNavBar />
          <Scene key="Quiz2" component={Quiz2} hideNavBar />
          <Scene key="PlayQuiz" component={PlayQuiz} hideNavBar />
          <Scene key="login" component={Login} hideNavBar initial/>
          <Scene key="MainPage" component={MainPage} hideNavBar />
          <Scene key="CreateLoctionManual" component={CreateLoctionManual} hideNavBar  />
          <Scene key="RouteRecommendation" component={RouteRecommendation} hideNavBar  />
        </Scene>
      </Router>
    );
  }
}

export default Root;