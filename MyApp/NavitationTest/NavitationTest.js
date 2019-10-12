import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import HomePage from './HomePage'
import SecondPage from './HomePage'


const HomeScreen = ({ navigation }) => (
  <HomePage navigation={navigation}></HomePage>
);

const DetailsScreen = (navigation) => (
  <SecondPage navigation={navigation}></SecondPage>
);

const NavitationTest = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    }
  },
  {
    initialRouteName: 'Home',
  }
);

export default NavitationTest;