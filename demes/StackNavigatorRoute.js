import React from 'react';
import {
    StackNavigator,
} from 'react-navigation';
import BookInfoPage from './BookInfoPage'
import BookCase from './BookCase'

const bookCase = ({ navigation }) => {
    return (
        <BookCase navigation={navigation}></BookCase>
    )
}

bookCase.navigationOptions = {
    title: '书架',
};


const bookInfo = ({ navigation }) => {
    return (
        <BookInfoPage navigation={navigation}></BookInfoPage>
    )
}
bookInfo.navigationOptions = {
    title: '图书详情',
};

const SimpleStack = StackNavigator(
    {
        BookInfoPages: {
            screen: bookInfo,
        },
        BookCasePages: {
            screen: bookCase,
        },
    },
    {
        initialRouteName: 'BookCasePages',
    }
);

export default SimpleStack; 