import React, { Component } from 'react';
import {
    Button,
    ScrollView,
    Text,
    Image,
    StyleSheet,
    View
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';

export default class WetherPage extends Component {
    render() {
        return (
            <Text>WetherPage</Text>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
})
