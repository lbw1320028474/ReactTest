/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight } from 'react-native'
import AppUtils from '../../../Utils/AppUtils'
import Dpi from '../../../Utils/Dpi'
import FastImage from '../../../Components/react-native-fast-image'
import { observer, inject } from 'mobx-react/native';
import { BoxShadow } from '../../../Components/react-native-shadow'
import ImageResource from '../../../../Resource/ImageResource'
import EventBus from '../../../Utils/EventBus'
import MySorage from '../../../Utils/MyStore/MySorage'
import GlobleKey from '../../../Globle/GlobleKey'
import BookIReadPageDraw from '../../BookRead/BookIReadPageDraw'
import RecordUtil from '../../../Record/RecordUtil'
import RecordVar from '../../../Record/RecordVar'
import BookMenuBean from '../../BookRoom/BookMenu/Store/BookMenuBean'
import BookMenuInfoView from '../../BookMenuInfoPage/BookMenuInfoView';
import BookCaseUtil from '../Utils/BookCaseUtil'
/**
 * 分类页面
 */

const shadowOpt = {
    height: Dpi.d(148),
    width: Dpi.d(118),
    border: 5,
    radius: 1,
    opacity: 0.05,
    y: 1,
}

@inject('appStore')
@observer
export default class ListItem extends Component {
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
            <TouchableHighlight
                underlayColor={appTheme.greyBgColor}
                style={{
                    backgroundColor: appTheme.mainColor,
                }}
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
                        })

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
            >
                <View
                    style={{ borderBottomColor: appTheme.bgHightColor, borderBottomWidth: Dpi.d(2), flexDirection: 'row', alignItems: 'center', height: Dpi.d(200), paddingHorizontal: Dpi.d(34) }}
                >

                    {/* <BoxShadow
                        setting={shadowOpt}
                    > */}
                    <View>

                        <FastImage
                            style={{
                                resizeMode: FastImage.resizeMode.stretch,
                                height: Dpi.d(148),
                                width: Dpi.d(118),
                            }}
                            source={{ uri: that.itemData.bookCoverUrl }}
                        >
                        </FastImage>

                        {//that.itemData.hasNewChapter
                            (that.itemData.itemType === 1) ? <FastImage
                                style={{
                                    position: 'absolute',
                                    resizeMode: FastImage.resizeMode.stretch,
                                    width: Dpi.d(65),
                                    height: Dpi.d(26),
                                }}
                                source={ImageResource.bookcaseListBookMenuIcon}
                            ></FastImage> :
                                null

                        }
                    </View>
                    {/* </BoxShadow> */}
                    <View style={{ marginLeft: Dpi.d(22) }}>

                        <Text numberOfLines={2} style={{ maxWidth: Dpi.d(540), marginVertical: Dpi.d(15), fontSize: Dpi.d(32), color: appTheme.groupTitleTextColor }}>{that.itemData.bookName}</Text>
                        <Text numberOfLines={2} style={{ maxWidth: Dpi.d(540), marginVertical: Dpi.d(15), fontSize: Dpi.d(28), color: appTheme.greyTextColor }}>{(that.itemData.itemType === 0) ? ('最新章节：' + that.itemData.lastChapterName) : ('共' + that.itemData.lastChapterOrder) + '本'}</Text>

                    </View>
                    {//that.itemData.hasNewChapter
                        (that.itemData.hasNewChapter) ? <FastImage
                            style={{
                                right: Dpi.d(20),
                                top: Dpi.d(50),
                                position: 'absolute',
                                resizeMode: FastImage.resizeMode.stretch,
                                width: Dpi.d(65),
                                height: Dpi.d(26),
                            }}
                            source={ImageResource.bookcaseListNewIcon}
                        ></FastImage> :
                            null

                    }
                </View>

            </TouchableHighlight>
        )
    }
}

