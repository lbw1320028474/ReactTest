
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
import { EventEmitter } from 'events'
import EventBean from '../Novel/novelJs/Utils/EventBus';
const listener = function (params) {
    let newCount = this.state.count + params.data;
    this.setState({
        count: newCount
    });
};
export default class Scenetwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };

    };  //对应了原生端的名字  

    componentWillMount() {
        this.listener = EventBean.addListener('addCounter', this.listener);  //对应了原生端的名字  
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View>
                <Button onPress={() => {
                    EventBean.emit('addCounter', { data: 33 });
                }} title='发送监听'></Button>
                <Button onPress={() => {
                    EventBean.removeListener('addCounter', this.listener);
                    // this.listener && this.listener.removeListener('addCounter');  //记得remove哦  
                    // this.listener = null;
                }} title='移除监听'></Button>
                <Text>{this.state.count}</Text>
            </View>
        )
    }
}

// 或者，在编译期定义你所有的scenes，并在后面的Router里面使用




