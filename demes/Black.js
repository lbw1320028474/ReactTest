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

export default class TabNavigatorDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedpage: 'bookCase' };
    }

    render() {
        return (
            <TabNavigator>
                <TabNavigator.Item
                    renderIcon={() => <Image source={require('../app_images/my_icon.png')}></Image>}
                    title="书架"
                    selected={this.state.selectedpage === 'bookCase'}
                    allowFontScaling={true}
                    onPress={() => { this.setstate = { selectedpage: 'bookCase' } }}
                >
                    {BookCase}
                </TabNavigator.Item>
                <TabNavigator.Item
                    renderIcon={() => <Image source={require('../app_images/my_icon.png')}></Image>}
                    title="书库"
                    selected={this.state.selectedpage === 'bookRoom'}
                    allowFontScaling={true}
                    onPress={() => { this.setstate = { selectedpage: 'bookRoom' } }}
                >
                    {BookRoom}
                </TabNavigator.Item>
                <TabNavigator.Item
                    renderIcon={() => <Image source={require('../app_images/my_icon.png')}></Image>}
                    title="圈子"
                    selected={this.state.selectedpage === 'bookCircle'}
                    allowFontScaling={true}
                    onPress={() => { this.setstate = { selectedpage: 'bookCircle' } }}
                >
                    {BookCircle}
                </TabNavigator.Item>
                <TabNavigator.Item
                    renderIcon={() => <Image source={require('../app_images/my_icon.png')}></Image>}
                    title="我"
                    selected={this.state.selectedpage === 'me'}
                    allowFontScaling={true}
                    onPress={() => { this.setstate = { selectedpage: 'me' } }}
                >
                    {Me}
                </TabNavigator.Item>
            </TabNavigator>

        )
    }
}