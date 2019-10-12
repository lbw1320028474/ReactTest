/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native'
import { observer, inject } from 'mobx-react/native';
import Dpi from '../../../Utils/Dpi'
import AppUtils from '../../../Utils/AppUtils'
import EventBus from '../../../Utils/EventBus'
import FastImage from '../../../Components/react-native-fast-image'
import BookReadPage from '../../BookRead/BookReadPage'
import BookIReadPageDraw from '../../BookRead/BookIReadPageDraw'
import ImageResource from '../../../../Resource/ImageResource'
import GlobleKey from '../../../Globle/GlobleKey';
import RecordUtil from '../../../Record/RecordUtil'
import RecordVar from '../../../Record/RecordVar'
@inject('appStore')
@observer
export default class BookInfoPage extends Component {
    constructor(props) {
        super(props);
        this._itemClick.bind(this);
    }

    _itemClick(bookId, item) {
        if (item) {
            RecordUtil.clickRecord(item.chapterOrder, RecordVar.click_info_menu, (new Date()).getTime())
            BookIReadPageDraw.open(this.props.navigation, bookId, item.chapterOrder);
        }
    }


    _renderLastChapter() {
        let that = this;
        let data = that.props.data;
        let bookInfo = that.props.appStore.bookInfoStore;
        let appTheme = that.props.appStore.appTheme;
        if (bookInfo && bookInfo.lasterChapter) {
            return (
                <TouchableHighlight
                    underlayColor={appTheme.greyBgColor}
                    onPress={() => {
                        try {
                            if (bookInfo && bookInfo.lasterChapter) {
                                RecordUtil.clickRecord(bookInfo.lasterChapter.chapterOrder, RecordVar.click_info_menu, (new Date()).getTime())
                                BookIReadPageDraw.open(that.props.navigation, bookInfo.bookId, bookInfo.lasterChapter.chapterOrder)
                            }
                        } catch (err) {
                        }
                    }}
                >
                    <View style={{ height: Dpi.d(70), borderBottomColor: '#99999950', borderBottomWidth: Dpi.d(1), flexDirection: 'row', alignItems: 'center' }}>
                        <Text
                            style={{ color: appTheme.greyTextColor, marginLeft: Dpi.d(20), fontSize: Dpi.s(30), width: Dpi.d(500) }}
                        >{bookInfo.lasterChapter.chapterName}</Text>
                        <FastImage
                            style={{ width: Dpi.d(70), height: Dpi.d(30), resizeMode: FastImage.resizeMode.stretch }}
                            source={ImageResource.chapterNewIcon}
                        ></FastImage>
                    </View>
                </TouchableHighlight>
            )
        } else {
            return null;
        }
    }

    _renderOtherChapter(chapterBean) {
        let that = this;
        let data = that.props.data;
        let bookInfo = that.props.appStore.bookInfoStore;
        let appTheme = that.props.appStore.appTheme;
        if (chapterBean) {
            return (
                <TouchableHighlight
                    underlayColor={appTheme.greyBgColor}
                    onPress={() => {
                        that._itemClick(bookInfo.bookId, chapterBean);
                    }}
                >
                    <View style={{ height: Dpi.d(70), borderBottomColor: '#99999950', borderBottomWidth: Dpi.d(1), justifyContent: 'center' }}>
                        <Text
                            style={{ color: appTheme.greyTextColor, fontSize: Dpi.s(28) }}
                        >{chapterBean.chapterName}</Text>
                    </View>
                </TouchableHighlight>
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
        if (bookInfo && bookInfo.lasterChapter) {
            let chapter_01View = that._renderOtherChapter(bookInfo.chapter_01);
            let chapter_02View = that._renderOtherChapter(bookInfo.chapter_02);
            let chapter_03View = that._renderOtherChapter(bookInfo.chapter_03);
            return (
                <View
                    style={{ marginTop: Dpi.d(20), padding: Dpi.d(30), backgroundColor: appTheme.mainBgColor }}
                >
                    <Text style={{
                        color: appTheme.groupTitleTextColor,
                        fontSize: Dpi.s(36),
                        paddingBottom: Dpi.d(30),
                    }}>目录</Text>
                    {
                        that._renderLastChapter()
                    }
                    {chapter_01View}
                    {chapter_02View}
                    {chapter_03View}
                    <TouchableHighlight
                        underlayColor={appTheme.greyBgColor}
                        onPress={() => {
                            if (bookInfo) {
                                RecordUtil.clickRecord(bookInfo.bookId, RecordVar.click_info_morelist, (new Date()).getTime());
                            }
                            EventBus.emit(GlobleKey.EVENT_BOOKINFO_OPENCHAPTERLIST);
                        }}
                    >
                        <View style={{ height: Dpi.d(70), alignItems: 'center', justifyContent: 'center' }}>
                            <Text
                                style={{ color: appTheme.greyTextColor, fontSize: Dpi.s(33) }}
                            >查看全部目录</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            )
        } else {
            return (
                <View
                    style={{ marginTop: Dpi.d(20), padding: Dpi.d(30), backgroundColor: appTheme.mainBgColor }}
                >
                    <TouchableHighlight
                        underlayColor={appTheme.greyBgColor}
                        onPress={() => {
                            EventBus.emit(GlobleKey.EVENT_BOOKINFO_LOAD_NEWBOOK, bookInfo.bookId)
                        }}
                    >
                        <View style={{ height: Dpi.d(70), alignItems: 'center', justifyContent: 'center' }}>
                            <Text
                                style={{ color: appTheme.greyTextColor, fontSize: Dpi.s(33) }}
                            >加载失败，点击重新加载</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            )
        }
    }
}

