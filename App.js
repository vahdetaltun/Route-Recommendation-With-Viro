import React from 'react';
import Root from './src/Root';

import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  StatusBar,
} from 'react-native';

const App: () => React$Node = () => {
  return (
    <View style={styles.container}>
      <Root />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;