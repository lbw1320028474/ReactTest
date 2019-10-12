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


export default class List extends Component {
    static navigationOptions = ({ navigation }) => ({

    });
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View>
                <Button title='goback' onPress={()=>{this.props.navigation.goBack()}}></Button>
            </View>
        )
    }
}
