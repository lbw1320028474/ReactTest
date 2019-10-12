/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, TouchableOpacity } from 'react-native'
import { observer, inject } from 'mobx-react/native';
import Dpi from '../../../Utils/Dpi'
import AppUtils from '../../../Utils/AppUtils'
import EventBus from '../../../Utils/EventBus'
import FastImage from '../../../Components/react-native-fast-image'
import ImageResource from '../../../../Resource/ImageResource'
import GlobleKey from '../../../Globle/GlobleKey';
import RecordUtil from '../../../Record/RecordUtil'
import RecordVar from '../../../Record/RecordVar'
@inject('appStore')
@observer
export default class BookInfoPage extends Component {
    constructor(props) {
        super(props);
        this._recommendItemClick.bind(this);
    }

    _recommendItemClick(itemData) {
        RecordUtil.clickRecord(itemData.id, RecordVar.click_info_like, (new Date()).getTime())
        EventBus.emit(GlobleKey.EVENT_BOOKINFO_LOAD_NEWBOOK, itemData.id)
    }


    _renderRecommendItem() {
        let that = this;
        let data = that.props.data;
        let bookInfo = that.props.appStore.bookInfoStore;
        let appTheme = that.props.appStore.appTheme;
        if (bookInfo && bookInfo.reCommendList && bookInfo.reCommendList.length > 0) {
            let viewWidth = AppUtils.size.width / 5;
            let viewHeight = viewWidth * 1.3;
            let recommendViews = bookInfo.reCommendList.map((item, index) => {
                if (index < 4) {
                    return (
                        <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => {
                            that._recommendItemClick(item);
                        }}>
                            <View style={{ width: viewWidth }}>
                                <FastImage style={{ width: viewWidth, height: viewHeight, resizeMode: FastImage.resizeMode.stretch }} source={{ uri: item.bookCover }}></FastImage>
                                <Text numberOfLines={2} style={{ marginTop: Dpi.d(10), fontSize: Dpi.s(26), color: appTheme.subTextColor }}>{item.bookName}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
            })
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: Dpi.d(20) }}>
                    {
                        recommendViews
                    }
                </View>
            )
        } else {
            return null;
        }
    }



    render() {
        let that = this;
        let data = that.props.data;
        let bookInfo = that.props.appStore.bookInfoStore;
        let appTheme = that.props.appStore.appTheme;
        if (bookInfo && bookInfo.reCommendList && bookInfo.reCommendList.length > 0) {
            return (
                <View
                    style={{ marginTop: Dpi.d(20), padding: Dpi.d(30), backgroundColor: appTheme.mainBgColor }}
                >
                    <Text numberOfLines={1} style={{ fontSize: Dpi.s(28), color: appTheme.mainTextColor }}>喜欢<Text numberOfLines={1} style={{ maxWidth: Dpi.d(323), fontSize: Dpi.s(28), color: appTheme.hightLightTextColor }}>{bookInfo.bookName}</Text>的人还看过</Text>
                    {
                        that._renderRecommendItem()
                    }
                </View>
            )
        } else {
            return <View></View>
        }
    }
}

