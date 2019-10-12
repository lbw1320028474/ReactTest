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
export default class HuyanView extends Component {


    onStartShouldSetResponderCapture() {
        return false;
    }
    render() {
        let that = this;
        let readTheme = that.props.appStore.readPageStore.readTheme;
        return (
            <View pointerEvents='none' style={{ position: 'absolute', backgroundColor: (readTheme.isHuyan === true) ? '#FFE4B540' : 'transparent', width: AppUtils.size.width, height: AppUtils.size.height }}>
            </View>
        );
    }
}

