import React, { Component } from 'react';
import {
    Button,
    ScrollView,
    Text,
    Image,
    StyleSheet,
    View,
    TextInput
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import AppUtil from '../../Uitls/AppUtils'


export default class Search extends Component {
    render() {
        return (
            <View style={styles.containerStyle}>
                <TextInput underlineColorAndroid="transparent" placeholder='搜索' style={styles.textInputStyle}></TextInput>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    containerStyle: {
        paddingLeft:10,
        paddingRight:10,
        marginTop:10
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF',
    },
    textInputStyle: {
        fontSize: 15,
        height:40,
        borderWidth:AppUtil.pixel,
        borderColor: 'gray',
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF',
    }
})
