import React from 'react';
import {
    Button,
    ScrollView,
    Text,
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';

export default class BookInfoPage extends React.Component {
    static navigationOptions = {
        title: '图书详情页'
    };

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.goBack()}
                title="Go to Lucy's profile"
            />
        );
    }
}