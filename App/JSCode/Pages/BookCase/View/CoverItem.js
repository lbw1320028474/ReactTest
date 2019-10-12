/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import AppUtils from '../../../Utils/AppUtils'
import MySorage from '../../../Utils/MyStore/MySorage'
import Dpi from '../../../Utils/Dpi'
import FastImage from '../../../Components/react-native-fast-image'
import { observer, inject } from 'mobx-react/native';
import { BoxShadow } from '../../../Components/react-native-shadow'
import ImageResource from '../../../../Resource/ImageResource';
import BookIReadPageDraw from '../../BookRead/BookIReadPageDraw'
import EventBus from '../../../Utils/EventBus'
import GlobleKey from '../../../Globle/GlobleKey'
import RecordUtil from '../../../Record/RecordUtil'
import BookMenuBean from '../../BookRoom/BookMenu/Store/BookMenuBean'
import RecordVar from '../../../Record/RecordVar'
import BookMenuInfoView from '../../BookMenuInfoPage/BookMenuInfoView';
import BookCaseUtil from '../Utils/BookCaseUtil';
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
export default class CoverItem extends Component {
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
        let bookCaseStore = this.props.appStore.bookCaseStore;
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onLongPress={() => {
                    that._itemLongClick(that.itemData);
                }}
                onPress={() => {

                    if (that.itemData) {
                        RecordUtil.clickRecord(that.itemData.bookId, RecordVar.click_bag_bookitem, (new Date()).getTime());
                    }

                    bookCaseStore.addNewUpdataBean({
                        bookId: that.itemData.bookId + '',
                        nowChapterOrder: that.itemData.lastChapterOrder + ''
                    })

                    if (that.itemData.itemType === 0) {
                        MySorage.loadByDefault('bookid' + that.itemData.bookId + '', -1, (data) => {
                            if (data && data !== -1) {
                                let bookId = data.bookId;
                                let chapterOrder = data.chapterOrder;
                                let pageIndex = data.pageIndex;
                                if (bookId && chapterOrder) {
                                    BookIReadPageDraw.open(that.props.navigation, that.itemData.bookId + '', chapterOrder, pageIndex, that.itemData.bookName, '', that.itemData.bookCoverUrl);
                                } else {
                                    BookIReadPageDraw.open(that.props.navigation, that.itemData.bookId, 1, 0, that.itemData.bookName, '', that.itemData.bookCoverUrl);
                                }
                            } else {
                                BookIReadPageDraw.open(that.props.navigation, that.itemData.bookId, 1, 0, that.itemData.bookName, '', that.itemData.bookCoverUrl);
                            }
                        });
                        let timer = setInterval(() => {
                            BookCaseUtil.bookBagAction(that.itemData.bookId, that.props.appStore.myPageStore.userId, 4, (callback) => {
                            })
                            if (timer) {
                                clearInterval(timer);
                            }
                        }, 1000);
                    } else {
                        // let bookMenuBean = new BookMenuBean();
                        // bookMenuBean.bookCount = that.itemData.lastChapterOrder;
                        // bookMenuBean.bookMenuCover = that.itemData.bookCoverUrl;
                        // bookMenuBean.bookMenuDescript = that.itemData.describe;
                        // bookMenuBean.bookMenuId = that.itemData.bookId;
                        // bookMenuBean.bookMenuName = that.itemData.bookName;
                        // bookMenuBean.isBagBook = true;
                        // BookMenuInfoView.open(that.props.navigation, bookMenuBean);
                        BookMenuInfoView.open(that.props.navigation, that.itemData.bookId);

                        let timer = setInterval(() => {
                            BookCaseUtil.bookMenuBagAction(that.itemData.bookId, that.props.appStore.myPageStore.userId, 4, (callback) => {
                            })
                            if (timer) {
                                clearInterval(timer);
                            }
                        }, 1000);
                    }

                }}
                style={{ alignItems: 'center', paddingVertical: Dpi.d(20) }}
            >
                {/* <BoxShadow
                    setting={shadowOpt}
                > */}
                <View>

                    <FastImage
                        style={{
                            resizeMode: FastImage.resizeMode.stretch,
                            width: Dpi.d(192),
                            height: Dpi.d(255),
                        }}
                        source={{ uri: that.itemData.bookCoverUrl }}
                    >
                    </FastImage>
                    {
                        (that.itemData.hasNewChapter) ? <FastImage
                            style={{
                                resizeMode: FastImage.resizeMode.stretch,
                                position: 'absolute',
                                width: Dpi.d(94),
                                height: Dpi.d(39),
                            }}
                            source={ImageResource.newTipIcon}
                        ></FastImage> :
                            null
                    }
                    {
                        (that.itemData.itemType === 1) ?
                            <View
                                style={{
                                    width: Dpi.d(192),
                                    height: Dpi.d(32),
                                    backgroundColor: '#00000070',
                                    position: 'absolute',
                                    bottom: 0,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Text style={{ fontSize: Dpi.s(20), color: appTheme.mainColor }}>书单{that.itemData.lastChapterOrder}本</Text>
                            </View>
                            : null
                    }
                </View>
                {/* </BoxShadow> */}
                <Text numberOfLines={2} style={{ textAlign: 'left', width: Dpi.d(192), marginTop: Dpi.d(20), fontSize: Dpi.d(26), color: appTheme.mainTextColor }}>{that.itemData.bookName}</Text>
            </TouchableOpacity >
        )
    }
}

