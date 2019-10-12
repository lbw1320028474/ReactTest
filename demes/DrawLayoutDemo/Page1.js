import React from 'react'
import {
    View,
    Button,
    Text,
    StyleSheet
} from 'react-native';
export default class Page1 extends React.Component {
    render() {
        return (
            <View style={BookCaseStyles.containerSytle}>
                <Button
                    onPress={() => {

                    }}
                    title='页面1'></Button>
            </View>
        )
    }
}


var BookCaseStyles = StyleSheet.create({
    pageTitleStyle: {
        flexDirection: 'column',
        padding: 5,
        marginLeft: 20,
        marginRight: 20
    },
    containerSytle: {
        flex: 1,
        backgroundColor: '#ff0000',
        flexDirection: "column"
    }
})