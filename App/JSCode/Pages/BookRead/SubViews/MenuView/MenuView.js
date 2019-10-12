/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    FlatList,
    StatusBar,
    Button
} from 'react-native'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react/native';
import Dpi from '../../../../Utils/Dpi'
import AppUtils from '../../../../Utils/AppUtils'
import MenuViewBottom from './MenuViewBottom'
import SettingView from './SettingView'
import MenuViewTop from './MenuViewTop'
@inject('appStore')
@observer
export default class MenuView extends Component {
    @observable refreshing = false;
    constructor(props) {
        super(props);

    }

    render() {
        let that = this;
        let appTheme = this.props.appStore.appTheme;
        return (
            <View
                onStartShouldSetResponder={false}
                style={{ position: 'absolute', width: AppUtils.size.width, height: AppUtils.size.height }}
            >
                

            </View>
        );

    }
}

