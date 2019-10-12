/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react/native';
import Dpi from '../../../../Utils/Dpi'
import AppUtils from '../../../../Utils/AppUtils'
import CheckBox from '../../../../Components/react-native-check-box'
@inject('appStore')
@observer
export default class CatchChoseView extends Component {
    @observable refreshing = false;
    constructor(props) {
        super(props);
        // this.state = {
        //     animValue: new Animated.Value(Dpi.d(0))
        // }
    }

    render() {
        let that = this;
        let appTheme = this.props.appStore.appTheme;
        let readPageStore = this.props.appStore.readPageStore;
        let readTheme = readPageStore.readTheme;
        // var opacity = 0;
        // spin = this.state.animValue.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: [-1 * Dpi.d(95), 0]
        // })
        return (
            <View style={{ position: 'absolute', bottom: 0, width: AppUtils.size.width, height: Dpi.d(445), backgroundColor: appTheme.mainBgColor }}>
                <View
                    style={{
                        borderBottomWidth: Dpi.d(1),
                        borderBottomColor: appTheme.devideLineColor,
                    }}
                >
                    <Text style={{ fontSize: Dpi.s(32), marginTop: Dpi.d(30), marginBottom: Dpi.d(40), color: appTheme.groupTitleTextColor, textAlign: 'center', backgroundColor: 'transparent' }}>缓存多少章？</Text>
                </View>
                <View
                    style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: Dpi.d(85),
                        borderBottomWidth: Dpi.d(1),
                        borderBottomColor: appTheme.devideLineColor,
                    }}
                >
                    <Text style={{ marginLeft: Dpi.d(41), fontSize: Dpi.s(32), color: appTheme.groupTitleTextColor, backgroundColor: 'transparent' }}>后面五十章</Text>
                    <CheckBox
                        style={{ marginRight: Dpi.d(41) }}
                        checkBoxColor={appTheme.hightLightTextColor}
                        onClick={() => {
                        }}
                        isChecked={true}
                    ></CheckBox>
                </View>
                <View
                    style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: Dpi.d(85),
                        borderBottomWidth: Dpi.d(1),
                        borderBottomColor: appTheme.devideLineColor,
                    }}
                >
                    <Text style={{ marginLeft: Dpi.d(41), fontSize: Dpi.s(32), color: appTheme.groupTitleTextColor, backgroundColor: 'transparent' }}>后面全部</Text>
                    <CheckBox
                        style={{ marginRight: Dpi.d(41) }}
                        checkBoxColor={appTheme.hightLightTextColor}
                        onClick={() => {
                        }}
                        isChecked={false}
                    ></CheckBox>
                </View>
                <View
                    style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: Dpi.d(85),
                        borderBottomWidth: Dpi.d(1),
                        borderBottomColor: appTheme.devideLineColor,
                    }}
                >
                    <Text style={{ marginLeft: Dpi.d(41), fontSize: Dpi.s(32), color: appTheme.groupTitleTextColor, backgroundColor: 'transparent' }}>全部</Text>
                    <CheckBox
                        style={{ marginRight: Dpi.d(41) }}
                        checkBoxColor={appTheme.hightLightTextColor}
                        onClick={() => {
                        }}
                        isChecked={false}
                    ></CheckBox>
                </View>
                <View
                    style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: Dpi.d(80),
                    }}
                >
                    <TouchableHighlight
                        underlayColor={appTheme.greyBgColor}
                        onPress={() => {
                            alert('取消')
                        }}
                    >
                        <View
                            style={{ width: AppUtils.size.width / 2, height: Dpi.d(85), alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Text
                                style={{ fontSize: Dpi.s(30), color: appTheme.groupTitleTextColor }}
                            >取消</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight

                        onPress={() => {
                            alert('取消')
                        }}
                    >
                        <View
                            style={{ backgroundColor: appTheme.hightLightColor, width: AppUtils.size.width / 2, height: Dpi.d(80), alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Text style={{ fontSize: Dpi.s(30), color: appTheme.mainColor }}>确定</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

