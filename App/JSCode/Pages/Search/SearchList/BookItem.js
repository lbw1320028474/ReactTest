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
import RecordUtil from '../../../Record/RecordUtil'
import RecordVar from '../../../Record/RecordVar'
import BookInfoDraw from '../../BookInfo/BookInfoDraw'
/**
 * 分类页面
 */

const shadowOpt = {
    width: Dpi.d(157),
    height: Dpi.d(215),
    border: 5,
    radius: 1,
    opacity: 0.05,
    y: 1,
}

@inject('appStore')
@observer
export default class BookItem extends Component {
    constructor(props) {
        super(props);
        this._itemClick.bind(this);
    }

    _itemClick(itemData) {
        let that = this;
        if (itemData) {
            RecordUtil.clickRecord(itemData.bookId, RecordVar.click_search_item, (new Date()).getTime());
            BookInfoDraw.open(that.props.navigation, itemData.bookId);
        }
    }
    render() {
        let that = this;
        let itemData = that.props.data;
        let appTheme = that.props.appStore.appTheme;
        return (
            <TouchableOpacity
                activeOpacity={0.8}

                onPress={() => {
                    that._itemClick(itemData)
                }}
                style={{ alignItems: 'center', flexDirection: 'row', padding: Dpi.d(39) }}
            >
                {/* <BoxShadow
                    setting={shadowOpt}
                > */}
                <FastImage
                    style={{
                        backgroundColor: '#f5f5f5',
                        resizeMode: FastImage.resizeMode.stretch,
                        width: Dpi.d(157),
                        height: Dpi.d(215),
                    }}
                    source={{ uri: itemData.bookCoverUrl }}
                >
                </FastImage>
                {/* </BoxShadow> */}
                <View style={{ marginLeft: Dpi.d(19), height: Dpi.d(215), width: Dpi.d(470), justifyContent: 'space-around', paddingVertical: Dpi.d(15) }}>
                    <Text numberOfLines={1} style={{ color: appTheme.groupTitleTextColor, fontSize: Dpi.s(29) }}>{itemData.bookName}</Text>
                    <Text numberOfLines={2} style={{ fontSize: Dpi.d(25), color: appTheme.greyTextColor }}>{itemData.bookDescript}</Text>
                    <View style={{ flexDirection: 'row', width: Dpi.d(470), justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', width: Dpi.d(235), alignItems: 'center' }}>
                            <FastImage source={ImageResource.authorIcon} style={{ width: Dpi.d(24), height: Dpi.d(25), resizeMode: 'stretch' }}></FastImage>
                            <Text style={{ marginLeft: Dpi.d(10), fontSize: Dpi.s(25), color: appTheme.lowGreyTextColor }}>{itemData.bookAuthor}</Text>
                        </View>
                        <Text numberOfLines={1} style={{ fontSize: Dpi.s(22), maxWidth: Dpi.d(235), color: appTheme.lowGreyTextColor, borderRadius: Dpi.d(2), borderWidth: Dpi.d(1), borderColor: appTheme.lowGreyTextColor, padding: Dpi.d(5) }}>玄幻魔法</Text>
                    </View>
                </View>
            </TouchableOpacity >
        )
    }
}

