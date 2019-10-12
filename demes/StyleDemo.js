import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import {
    Button,
    ScrollView,
    Text,
    Image,
    StyleSheet,
    View
} from 'react-native';
import AppUtils from '../MyApp/Uitls/AppUtils'
/* <Image source={require('../pages/app_image/app_bg.jpg')} style={styles.bgImageStyle}>
               </Image>
               <Text style={styles.viewOneStyle}>样式测试</Text> */
export default class StyleDemo extends React.Component {
    render() {
        return (
            <View style={styles.containerStyle}>
                <Image source={require('../pages/app_image/app_bg.jpg')} style={styles.bgImageStyle}>
                </Image>
                <Text style={styles.viewOneStyle}>样式测试1</Text>
                <Text style={styles.viewTwoStyle}>样式测试2</Text>
                <Text style={styles.viewThreeStyle}>样式测试3</Text>
                <Text style={styles.viewThreeStyle}>样式测试4</Text>
                <Text style={styles.viewThreeStyle}>样式测试5</Text>
            </View>
        )
    }
}

var styles = StyleSheet.create({

    containerStyle: {
        flex: 1,
        flexDirection: 'column'
    },
    testViewStyle: {
        backgroundColor: '#cecece'
    },
    viewOneStyle: {
        height: 200,
        width: 100,
        position: 'absolute',
        backgroundColor: '#00ff00'
    },
    viewTwoStyle: {
        position: 'absolute',
        width: 200,
        marginTop:30,
        backgroundColor: '#0000ff'
    },
    viewThreeStyle: {
        width: 200,
        marginTop:30,
        backgroundColor: '#0000ff'
    },
    bgImageStyle: {
        position: 'absolute',
        width: AppUtils.size.width,
        height: AppUtils.size.height
    },
})

