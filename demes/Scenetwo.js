
/**
 * GradientNavigationBarDemo
 * 作者Git：https://github.com/guangqiang-liu
 * 技术交流群：620792950
 * 作者QQ：1126756952
 * Created by guangqiang on 2017/11/5
 */
import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    Dimensions,
    TextInput,
    Button
} from 'react-native'

//import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions, Scene, Router } from 'react-native-router-flux'


export default class Scenetwo extends React.Component {
    render() {
        return (
            <View>
                <Button onPress={()=>{
                    alert('跳转1');
                }} title='跳转'></Button>
            </View>
        )
    }
}

// 或者，在编译期定义你所有的scenes，并在后面的Router里面使用




