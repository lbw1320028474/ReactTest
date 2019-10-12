/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, ActivityIndicator } from 'react-native'
import { observer, inject } from 'mobx-react/native';
import Dpi from '../../../Utils/Dpi'
import MySorage from '../../../Utils/MyStore/MySorage'
import AppUtils from '../../../Utils/AppUtils'
import FastImage from '../../../Components/react-native-fast-image'
import ImageResource from '../../../../Resource/ImageResource'
// import BookReadPage from '../../BookRead/BookReadPage'
import BookIReadPageDraw from '../../BookRead/BookIReadPageDraw'
import BookCaseUtil from '../../BookCase/Utils/BookCaseUtil'
import Toast from '../../../Components/teaset/components/Toast/Toast'
import LoadPage from '../../Load/LoadPage'
import RecordUtil from '../../../Record/RecordUtil'
import RecordVar from '../../../Record/RecordVar'
@inject('appStore')
@observer
export default class BookInfoPage extends Component {
    constructor(props) {
        super(props);
        this.loadViewKey;
    }


    // _renderLastChapter() {
    //     let that = this;
    //     let data = that.props.data;
    //     let bookInfo = that.props.appStore.bookInfoStore;
    //     let appTheme = that.props.appStore.appTheme;
    //     if (bookInfo && bookInfo.lasterChapter) {
    //         return (
    //             <TouchableHighlight
    //                 underlayColor={appTheme.greyBgColor}
    //                 onPress={() => {

    //                 }}
    //             >
    //                 <View style={{ height: Dpi.d(70), borderBottomColor: '#99999950', borderBottomWidth: Dpi.d(1), flexDirection: 'row', alignItems: 'center' }}>
    //                     <Text
    //                         style={{ color: appTheme.greyTextColor, marginLeft: Dpi.d(20), fontSize: Dpi.s(30), width: Dpi.d(500) }}
    //                     >{bookInfo.lasterChapter.chapterName}</Text>
    //                     <FastImage
    //                         style={{ width: Dpi.d(70), height: Dpi.d(30), resizeMode: FastImage.resizeMode.stretch }}
    //                         source={ImageResource.chapterNewIcon}
    //                     ></FastImage>
    //                 </View>
    //             </TouchableHighlight>
    //         )
    //     } else {
    //         return null;
    //     }
    // }

    // _renderOtherChapter(chapterBean) {
    //     let that = this;
    //     let data = that.props.data;
    //     // let bookInfo = that.props.appStore.bookInfoStore;
    //     let appTheme = that.props.appStore.appTheme;
    //     if (chapterBean) {
    //         return (
    //             <TouchableHighlight
    //                 underlayColor={appTheme.greyBgColor}
    //                 onPress={() => {

    //                 }}
    //             >
    //                 <View style={{ height: Dpi.d(70), borderBottomColor: '#99999950', borderBottomWidth: Dpi.d(1), justifyContent: 'center' }}>
    //                     <Text
    //                         style={{ color: appTheme.greyTextColor, fontSize: Dpi.s(28) }}
    //                     >{chapterBean.chapterName}</Text>
    //                 </View>
    //             </TouchableHighlight>
    //         )
    //     } else {
    //         return null;
    //     }
    // }
    showLoadView() {
        let that = this;
        if (that.loadViewKey) return;
        that.loadViewKey = Toast.show({
            text: '加载中...',
            icon: <ActivityIndicator size='large' color={that.props.appStore.appTheme.mainColor} />,
            position: 'center',
            duration: 10000,
        });
    }

    hideLoadView() {
        let that = this;
        if (!that.loadViewKey) return;
        Toast.hide(that.loadViewKey);
        that.loadViewKey = undefined;
    }
    render() {
        let that = this;
        let data = that.props.data;
        let bookInfo = that.props.appStore.bookInfoStore;
        let appTheme = that.props.appStore.appTheme;
        let myPageStore = that.props.appStore.myPageStore;

        if (bookInfo) {
            return (
                <View
                    style={{ backgroundColor: appTheme.mainBgColor, position: 'absolute', bottom: 0, flexDirection: 'row' }}
                >
                    <TouchableHighlight
                        underlayColor={appTheme.greyBgColor}
                        onPress={() => {

                            // bookInfo.isPagBook = !bookInfo.isPagBook;
                            if (myPageStore.isLoaded === true && myPageStore.userId) {
                                if (bookInfo.isPagBook === true) {
                                    if (data) {
                                        RecordUtil.clickRecord(data, RecordVar.click_info_removebag, (new Date()).getTime());
                                    }
                                    that.showLoadView();

                                    BookCaseUtil.bookBagAction(data, myPageStore.userId, 2, (data) => {
                                        that.hideLoadView();
                                        if (data.msgCode === 200) {
                                            bookInfo.isPagBook = false;
                                            Toast.message('移除书架成功', 'short', 'center')
                                        } else {
                                            Toast.message('移除书架失败', 'short', 'center')
                                        }
                                    })

                                } else if (bookInfo.isPagBook === false) {
                                    if (data) {
                                        RecordUtil.clickRecord(data, RecordVar.click_info_addbag, (new Date()).getTime());
                                    }
                                    that.showLoadView();
                                    BookCaseUtil.bookBagAction(data, myPageStore.userId, 1, (data) => {
                                        that.hideLoadView();
                                        if (data.msgCode === 200) {
                                            bookInfo.isPagBook = true;
                                            Toast.message('加入书架成功', 'short', 'center')
                                        } else {
                                            Toast.message('加入书架失败', 'short', 'center')
                                        }
                                    })
                                }
                            } else {
                                LoadPage.open(that.props.navigation);
                            }
                        }}
                    >
                        <View style={{ borderTopColor: appTheme.lowGreyTextColor, height: Dpi.d(96), borderTopWidth: AppUtils.pixel, width: AppUtils.size.width / 2, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: Dpi.s(30), color: appTheme.hightLightTextColor }}>{(bookInfo.isPagBook) ? '移除书架' : '加入书架'}</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={appTheme.greyBgColor}
                        onPress={() => {
                            if (data) {
                                RecordUtil.clickRecord(data, RecordVar.click_info_read, (new Date()).getTime());
                            }

                            MySorage.loadByDefault('bookid' + that.props.data + '', -1, (data) => {
                                if (data && data !== -1) {
                                    let bookId = that.props.data;
                                    let chapterOrder = data.chapterOrder;
                                    let pageIndex = data.pageIndex;
                                    if (bookId && chapterOrder) {
                                        BookIReadPageDraw.open(that.props.navigation, that.props.data + '', chapterOrder, pageIndex);
                                    } else {
                                        BookIReadPageDraw.open(that.props.navigation, that.props.data, 1, 0);
                                    }
                                } else {
                                    BookIReadPageDraw.open(that.props.navigation, that.props.data, 1, 0);
                                }
                            })
                            // BookIReadPageDraw.open(that.props.navigation, that.props.data, 1);
                        }}
                    >
                        <View style={{ backgroundColor: appTheme.hightLightColor, height: Dpi.d(96), width: AppUtils.size.width / 2, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: Dpi.s(30), color: appTheme.mainColor }}>立即阅读</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            )
        }
    }
}

