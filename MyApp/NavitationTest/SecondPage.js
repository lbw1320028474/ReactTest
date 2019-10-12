import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';


export default class SecondPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>收到的数据${this.props.navigation.state.params.textStr}</Text>
            </View>
        )
    }
}