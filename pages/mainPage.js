/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

export default class mainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
    }
  }
  render() {
    var homeView = (
      <View>
        <Text>我是主页</Text>
      </View>
    );
    var settingView = (
      <View>
        <Text>我是设置页面</Text>
      </View>
    );
    var findView = (
      <View>
        <Text>我是发现页面</Text>
      </View>
    );
    var moreView = (
      <View>
        <Text>我是更多页面</Text>
      </View>
    );
    return (
      <TabNavigator
        tabBarStyle={{ height: 70, overflow: 'hidden' }}
        sceneStyle={{ paddingBottom: 20 }}>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          title="Home"
          renderIcon={() => <Image source={require('./app_image/my_icon.png')} />}
          renderSelectedIcon={() => <Image source={require('./app_image/my_icon.png')} />}
          badgeText="1"
          onPress={() => this.setState({ selectedTab: 'home' })}>
          {homeView}
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'profile'}
          title="Profile"
          renderIcon={() => <Image source={require('./app_image/setting_icon.png')} />}
          renderSelectedIcon={() => <Image source={require('./app_image/setting_icon.png')} />}
          onPress={() => this.setState({ selectedTab: 'profile' })}>
          {settingView}
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'find'}
          title="find"
          renderIcon={() => <Image source={require('./app_image/setting_icon.png')} />}
          renderSelectedIcon={() => <Image source={require('./app_image/setting_icon.png')} />}
          onPress={() => this.setState({ selectedTab: 'find' })}>
          {findView}
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'more'}
          title="more"
          renderIcon={() => <Image source={require('./app_image/setting_icon.png')} />}
          renderSelectedIcon={() => <Image source={require('./app_image/setting_icon.png')} />}
          onPress={() => this.setState({ selectedTab: 'more' })}>
          {moreView}
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}
















const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
