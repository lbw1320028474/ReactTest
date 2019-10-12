import React from 'react'
import {
    View,
    Button,
    Text,
    StyleSheet
} from 'react-native';
export default class BookCase extends React.Component {
    render() {
        return (
            <View style={BookCaseStyles.containerSytle}>
                <Button
                    onPress={()=>{this.props.navigation.navigate('BookInfoPages')}}
                    title='打开图书详情'></Button>
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
        flexDirection: "column"
    }
})