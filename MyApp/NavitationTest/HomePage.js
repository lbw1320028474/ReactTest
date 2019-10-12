import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';


export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('Details')}
                    title="Go to details"
                />
            </View>
        )
    }
}