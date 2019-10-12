import React from 'react'
import {
    View,
    Button,
    Text,
    StyleSheet
} from 'react-native';

export default class BookCircle extends React.Component {
    render() {
        return (
            <View>
                <Button title='看看'></Button>
            </View>
        )
    }
}


var BookCaseStyles = StyleSheet.create({
    pageTitleStyle: {
        "flex": 1,
        "flexDirection": 'row',
        "padding": 5,
        "marginLeft":20,
        "marginRight":20
    }
})