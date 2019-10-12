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
import AppUtils from '../Uitls/AppUtils'
import NetWorkUtil from '../NetWorkUtils/NetWorkUtil'

export default class HomePage extends Component {
    render() {
        return (
            <View>
                <Text>MyHomePage</Text>
            </View>
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
