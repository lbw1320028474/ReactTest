/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react/native';
import AppUtils from '../../../../Utils/AppUtils'
@inject('appStore')
@observer
export default class BackgroundView extends Component {
    render() {
        let that = this;
        let readTheme = that.props.appStore.readPageStore.readTheme;
        return (
            <View style={{ position: 'absolute', backgroundColor: readTheme.mainBgColor, width: AppUtils.size.width, height: AppUtils.size.height }}>
            </View>
        );
    }
}

