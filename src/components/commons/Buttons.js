/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

class Buttons extends React.Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.ButtonStyle}
                onPress={() => this.props.onPress()}>
                <Text style={{ color: 'white' }}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    ButtonStyle: {
        width: width * 0.71,
        height: height * 0.07,
        backgroundColor: '#008C7B',
        opacity: 0.9,
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Buttons;
