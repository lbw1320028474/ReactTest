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

export default class HDivideLine extends Component {
    // getDefaultProps() {
    //     // this.props.lineColor = 'gray';
    //     // this.props.lineWidth = AppUtils.pixel;
    // }
    render() {
        return (
            <View style={styles.lineStyle}>
            </View>
        )
    }


}

var styles = StyleSheet.create({
    lineStyle: {
        backgroundColor: 'gray',
        height: 1
    }
});