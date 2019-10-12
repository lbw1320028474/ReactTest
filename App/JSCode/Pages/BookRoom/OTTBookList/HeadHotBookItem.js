/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, TouchableHighlight } from 'react-native'
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
export default class BookMenuItem extends Component {
    constructor(props) {
        super(props);
    }

    // _itemLongClick(itemData) {
    //     EventBus.emit(GlobleKey.EVENT_BOOKCASEITEM_LONGCLICK, itemData);
    // }
    render() {
        let that = this;
        that.itemData = that.props.data;
        let appTheme = that.props.appStore.appTheme;
        return (
            <TouchableHighlight
                underlayColor={appTheme.greyBgColor}

                onPress={() => {
                    RecordUtil.clickRecord(that.itemData.bookId, RecordVar.click_room_13_bookitem, (new Date()).getTime());
                    BookInfoDraw.open(that.props.navigation, that.itemData.bookId);
                    //that.itemData.hasNewChapter = true;
                }}
                style={{ alignItems: 'center', flexDirection: 'row', paddingBottom: Dpi.d(40) }}
            >
                <View
                    style={{ flexDirection: 'row' }}
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
                    <View style={{ marginLeft: Dpi.d(19), height: Dpi.d(255), width: Dpi.d(443), justifyContent: 'space-around', paddingVertical: Dpi.d(15) }}>
                        <Text numberOfLines={1} style={{ fontWeight: 'bold', color: appTheme.groupTitleTextColor, fontSize: Dpi.s(29) }}>{that.itemData.bookName}</Text>
                        <Text numberOfLines={3} style={{ lineHeight: Dpi.d(40), fontSize: Dpi.s(25), color: appTheme.greyTextColor }}>{that.itemData.bookDescript}</Text>
                        <View style={{ flexDirection: 'row', width: Dpi.d(443), justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', width: Dpi.d(221), alignItems: 'center' }}>
                                <FastImage source={ImageResource.authorIcon} style={{ width: Dpi.d(24), height: Dpi.d(25), resizeMode: 'stretch' }}></FastImage>
                                <Text style={{ marginLeft: Dpi.d(10), fontSize: Dpi.s(25), color: appTheme.lowGreyTextColor }}>{that.itemData.bookAuthor}</Text>
                            </View>
                            <Text style={{ maxWidth: Dpi.d(221), marginRight: Dpi.d(5), fontSize: Dpi.s(22), color: appTheme.lowGreyTextColor, borderRadius: Dpi.d(2), borderWidth: Dpi.d(1), borderColor: appTheme.lowGreyTextColor, padding: Dpi.d(5) }}>{(that.itemData.bookCategory && that.itemData.bookCategory != '') ? that.itemData.bookCategory : '其它'}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight >
        )
    }
}

