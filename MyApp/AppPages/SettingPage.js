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

export default class SettingPage extends Component {
    render() {
        return (
            <View>
                <Text style={styles.container}>SettingPage</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        fontSize:30
    }
})
