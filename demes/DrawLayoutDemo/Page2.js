import React from 'react'
import {
    View,
    Button,
    Text,
    StyleSheet
} from 'react-native';
export default class Page2 extends React.Component {
    render() {
        return (
            <View style={BookCaseStyles.containerSytle}>
                <Button
                    onPress={() => {

                    }}
                    title='页面2'></Button>
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
        flexDirection: "column"
    }
})