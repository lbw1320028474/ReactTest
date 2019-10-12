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
    TextInput
} from 'react-native'

//import Icon from 'react-native-vector-icons/FontAwesome'
import one from './Sceneone'
import two from './Scenetwo'
import three from './Scenethree'
import { Actions, Scene, Router } from 'react-native-router-flux'
const { width } = Dimensions.get('window')

export default class App extends React.Component {
    render() {
        return <Router>
            <Scene key="root">
                <Scene key="scen1" component={<one></one>} title="Login" />
                <Scene key="scen2" component={<two></two>} title="Register" />
                <Scene key="scen3" component={<three></three>} />
            </Scene>
        </Router>
    }
}

