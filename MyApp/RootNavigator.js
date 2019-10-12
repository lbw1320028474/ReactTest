import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import List from './AppPages/ReadPageView/List'
import Category from './AppPages/ReadPageView/Category'
import TestPage from './AppPages/ReadPageView/TestPage'
import AppEntry from './AppEntry'

const ListScreen = (navigation) => (
    <List navigation={navigation}></List>
);
const AppEntryScreen =(navigation)=>(
    <AppEntry navigation={navigation}></AppEntry>
);

const RootNavigator = StackNavigator({
    AppEntryScreen: {
        screen: AppEntryScreen,
        navigationOptions: {
            headerTitle: 'MainTitle',
        },
    },
    ListScreen: {
        screen: ListScreen,
        navigationOptions: {
            headerTitle: 'List Title',
        },
    },
});

