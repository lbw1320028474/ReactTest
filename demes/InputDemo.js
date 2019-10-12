import React from 'react'
import {
    View,
    Button,
    Text,
    StyleSheet,
    TextInput
} from 'react-native';

export default class BookCircle extends React.Component {
    render() {
        let map = new Map();
        map.set(1, '1');
        map.set(2, '2');
        map.set(3, '3');
        map.set(4, '4');
        map.set(5, '5');
        map.set(2, '6');

        return (
            <View>
                <Text>
                    {map.get(2) + " + " + map.size}
                </Text>
            </View>
        )
    }
}


var BookCaseStyles = StyleSheet.create({
    pageTitleStyle: {
        "flex": 1,
        "flexDirection": 'row',
        "padding": 5,
        "marginLeft": 20,
        "marginRight": 20
    }
})