/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import AppUtils from '../../../Utils/AppUtils'
import Dpi from '../../../Utils/Dpi'
import FastImage from '../../../Components/react-native-fast-image'
import { observer, inject } from 'mobx-react/native';
import { BoxShadow } from '../../../Components/react-native-shadow'
import ImageResource from '../../../../Resource/ImageResource';
import EventBus from '../../../Utils/EventBus'
import GlobleKey from '../../../Globle/GlobleKey'
/**
 * 分类页面
 */

const shadowOpt = {
    width: Dpi.d(192),
    height: Dpi.d(255),
    border: 5,
    radius: 1,
    opacity: 0.05,
    y: 1,
}

@inject('appStore')
@observer
export default class CoverAddItem extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        let that = this;
        that.itemData = that.props.data;
        let appTheme = that.props.appStore.appTheme;
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    that.props.appStore.tabData.selectedPage = 'BookRoomPage';
                }}
                style={{ alignItems: 'center', paddingVertical: Dpi.d(20) }}
            >
                {/* <BoxShadow
                    setting={shadowOpt}
                > */}
                <FastImage
                    style={{
                        resizeMode: FastImage.resizeMode.stretch,
                        width: Dpi.d(192),
                        height: Dpi.d(255),
                    }}
                    source={ImageResource.coverlistAddbook}
                >
                </FastImage>
                {/* </BoxShadow> */}
                <Text numberOfLines={2} style={{ textAlign: 'center', width: Dpi.d(192), marginTop: Dpi.d(20), fontSize: Dpi.d(23), color: appTheme.mainTextColor }}>添加喜欢的小说</Text>
            </TouchableOpacity >
        )
    }
}

