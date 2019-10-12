/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
    Button,
    ScrollView,
    Text,
    Image
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import TabNavigator from 'react-native-tab-navigator';
import HomePage from './AppPages/HomePage'
import ReadPage from './AppPages/ReadPage'
import SettingPage from './AppPages/SettingPage'
import WetherPage from './AppPages/WetherPage'

export default class AppEntry extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedTab: "home" };
    }
    render() {
        return (
            <TabNavigator
                tabBarStyle={{ height: 70, overflow: 'hidden' }}
            >
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'home'}
                    title="Home"
                    renderIcon={() => <Image source={require('../pages/app_image/my_icon.png')} />}
                    renderSelectedIcon={() => <Image source={require('../pages/app_image/my_icon.png')} />}
                    onPress={() => this.setState({ selectedTab: 'home' })}>
                    {this._renderMyView('home')}
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'read'}
                    title="read"
                    renderIcon={() => <Image source={require('../pages/app_image/my_icon.png')} />}
                    renderSelectedIcon={() => <Image source={require('../pages/app_image/my_icon.png')} />}
                    onPress={() => this.setState({ selectedTab: 'read' })}>
                    {this._renderMyView('read')}
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'wether'}
                    title="wether"
                    renderIcon={() => <Image source={require('../pages/app_image/my_icon.png')} />}
                    renderSelectedIcon={() => <Image source={require('../pages/app_image/my_icon.png')} />}
                    onPress={() => this.setState({ selectedTab: 'wether' })}>
                    {this._renderMyView('wether')}
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'setting'}
                    title="setting"
                    renderIcon={() => <Image source={require('../pages/app_image/my_icon.png')} />}
                    renderSelectedIcon={() => <Image source={require('../pages/app_image/my_icon.png')} />}
                    onPress={() => this.setState({ selectedTab: 'setting' })}>
                    {this._renderMyView('setting')}
                </TabNavigator.Item>
            </TabNavigator>
        )
    }

    _renderMyView(name) {
        let myView = <HomePage></HomePage>;
        switch (name) {
            case 'home':
                myView = <HomePage></HomePage>;
                break;
            case 'read':
                myView = <ReadPage navigator={this.props.navigation}></ReadPage>
                break;
            case 'wether':
                myView = <WetherPage></WetherPage>
                break;
            case 'setting':
                myView = <SettingPage></SettingPage>
                break;
        }
        return (
            myView
        );
    }
}