import React from 'react'
import {
    Button,
    Image,
    View,
    Text
} from 'react-native'
import {
    StackNavigator
} from 'react-navigation';
import TabNavigator from 'react-native-tab-navigator';
import BookCase from './BookCase';
import BookRoom from './BookRoom';
import BookCircle from './BookCircle';
import Me from './Me';
import SimpleStack from './StackNavigatorRoute'


export default class TabNavigatorDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedTab: 'bookRoom' };
    }

    render() {
        return (
            <TabNavigator
                tabBarStyle={{ height: 70, overflow: 'hidden' }}
                sceneStyle={{ paddingBottom: 0 }}
            >
                <TabNavigator.Item
                    renderIcon={() => <Image source={require('../app_images/my_icon.png')}></Image>}
                    title="书架"
                    selected={this.state.selectedTab === 'bookCase'}
                    allowFontScaling={true}
                    onPress={() => { this.setState({ selectedTab: 'bookCase' }) }}
                >
                    <SimpleStack></SimpleStack>
                </TabNavigator.Item>
                <TabNavigator.Item
                    renderIcon={() => <Image source={require('../app_images/my_icon.png')}></Image>}
                    title="书库"
                    selected={this.state.selectedTab === 'bookRoom'}
                    allowFontScaling={true}
                    onPress={() => { this.setState({ selectedTab: 'bookRoom' }) }}
                >
                    <BookRoom></BookRoom>

                </TabNavigator.Item>
                <TabNavigator.Item
                    renderIcon={() => <Image source={require('../app_images/my_icon.png')}></Image>}
                    title="圈子"
                    selected={this.state.selectedTab === 'bookCircle'}
                    allowFontScaling={true}
                    onPress={() => { this.setState({ selectedTab: 'bookCircle' }) }}
                >
                    <BookCircle></BookCircle>

                </TabNavigator.Item>
                <TabNavigator.Item
                    renderIcon={() => <Image source={require('../app_images/my_icon.png')}></Image>}
                    title="我"
                    selected={this.state.selectedTab === 'me'}
                    allowFontScaling={true}
                    onPress={() => { this.setState({ selectedTab: 'me' }) }}
                >
                    <Me></Me>
                </TabNavigator.Item>
            </TabNavigator>

        )
    }
}