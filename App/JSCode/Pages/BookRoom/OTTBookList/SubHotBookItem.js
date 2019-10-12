/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import AppUtils from '../../../Utils/AppUtils'
import Dpi from '../../../Utils/Dpi'
import FastImage from '../../../Components/react-native-fast-image'
import { observer, inject } from 'mobx-react/native';
import { BoxShadow } from '../../../Components/react-native-shadow'
import ImageResource from '../../../../Resource/ImageResource';
import EventBus from '../../../Utils/EventBus'
import GlobleKey from '../../../Globle/GlobleKey'
import BookInfoDraw from '../../BookInfo/BookInfoDraw'
import RecordUtil from '../../../Record/RecordUtil'
import RecordVar from '../../../Record/RecordVar'
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
export default class SubHotBookItem extends Component {
    constructor(props) {
        super(props);
        this._itemLongClick.bind(this);
    }

    _itemLongClick(itemData) {
        EventBus.emit(GlobleKey.EVENT_BOOKCASEITEM_LONGCLICK, itemData);
    }
    render() {
        let that = this;
        that.itemData = that.props.data;
        let appTheme = that.props.appStore.appTheme;
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    RecordUtil.clickRecord(that.itemData.bookId, RecordVar.click_room_13_bookitem, (new Date()).getTime());
                    BookInfoDraw.open(that.props.navigation, that.itemData.bookId);
                }}
                style={{ alignItems: 'center', paddingBottom: Dpi.d(40) }}
            >
                {/* <BoxShadow
                    setting={shadowOpt}
                > */}
                <FastImage
                    style={{
                        backgroundColor: '#f5f5f5',
                        resizeMode: FastImage.resizeMode.stretch,
                        width: Dpi.d(192),
                        height: Dpi.d(255),
                    }}
                    source={{ uri: that.itemData.bookCoverUrl }}
                >
                </FastImage>
                {/* </BoxShadow> */}
                <Text numberOfLines={2} style={{ width: Dpi.d(192), marginTop: Dpi.d(20), fontSize: Dpi.d(26), color: appTheme.mainTextColor }}>{that.itemData.bookName}</Text>
            </TouchableOpacity >
        )
    }
}

