/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, TouchableOpacity, ActivityIndicator, FlatList, ScrollView } from 'react-native'
import { observer, inject } from 'mobx-react/native';
import Dpi from '../../Utils/Dpi'
import AppUtils from '../../Utils/AppUtils'
import EventBus from '../../Utils/EventBus'
import FastImage from '../../Components/react-native-fast-image'
import ImageResource from '../../../Resource/ImageResource'
import GlobleVar from '../../Globle/GlobleVar';
import GlobleKey from '../../Globle/GlobleKey';
import { LargeList } from '../../Components/react-native-largelist'
import GetChapterListRequest from '../../Protocol/GetChapterListRequest'
import NetWorkUtil from '../../Network/NetWorkUtil'
import Toast from '../../Components/teaset/components/Toast/Toast'
import StoreUtil from './Store/StoreUtil'
import GlobleUrl from '../../Globle/GlobleUrl'
import ReadPageChapterItem from './ReadPageChapterItem'
import { observable, transaction } from 'mobx';
import ChapterPageManager from '../BookRead/SubViews/ReadView/Manager/ChapterPageManager';
import NetInfoUtils from '../../Network/NetInfoUtils'
import CatchSqlLiteUtil from '../../Catch/CatchSqlLiteUtil';
import ChapterStatic from './Store/ChapterStatic'
import ChapterTrueCount from '../BookRead/SubViews/ReadView/Manager/ChapterTrueCount';
@inject('appStore')
@observer
export default class BookInfoPage extends Component {
    @observable
    dataLoadState = 0;
    constructor(props) {
        super(props);
        // this._recommendItemClick.bind(this);
        let that = this;
        this.bookId;
        this.loadViewKey;
        this.bookData;
        this.largeListRef;
        this.loadNewBookListener = (newBookId) => {
            if (newBookId && newBookId !== null) {
                that.dataLoadState = 0;
                that._toLoadChapterList(newBookId);
            }
        };
        this.openListener = () => {
            try {
                if (that.largeListRef && ChapterPageManager.currentData && ChapterPageManager.currentData.bookId === that.bookId) {
                    if (ChapterPageManager.currentData.chapterOrder && ChapterPageManager.currentData.chapterOrder - 1 >= 0 && ChapterPageManager.currentData.chapterOrder - 4 > 0) {
                        // alert('滑动到:' + ChapterPageManager.currentData.chapterOrder - 4)
                        that.largeListRef.scrollToIndexPath({ section: 0, row: ChapterPageManager.currentData.chapterOrder - 4 }, false);

                    } else if (ChapterPageManager.currentData.chapterOrder - 1 >= 0) {
                        // alert('滑动到' + 0)
                        that.largeListRef.scrollToIndexPath({ section: 0, row: 0 }, false);
                    }
                    let chapterListStore = that.props.appStore.chapterListStore;
                    if (chapterListStore && chapterListStore.chapterList.length > 0 && ChapterPageManager.currentData.chapterOrder - 1 >= 0) {
                        let chapterList = Array.from(chapterListStore.chapterList)
                        for (let i = 0; i < chapterList.length; ++i) {
                            //console.log('修改第 ' + i + '个')
                            if (i + 1 === ChapterPageManager.currentData.chapterOrder) {
                                chapterList[i].readState = 1;
                            } else {
                                chapterList[i].readState = 0;
                            }
                        }
                    }
                } else {
                    // alert('不满足条件, ' + (ChapterPageManager.currentData.bookId === that.bookId))
                }
            } catch (err) {
                //console.log('error = ' + err)
            }

        }
    }


    _renderItem(itemData, index) {

        return (
            <ReadPageChapterItem data={itemData} key={index}></ReadPageChapterItem>
        )
    }

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

    componentWillUnmount() {
        EventBus.removeListener(GlobleKey.EVENT_BOOKINFO_LOAD_NEWBOOK, this.loadNewBookListener);
        EventBus.removeListener(GlobleKey.EVENT_READPAGE_OPENCHAPTERLIST, this.openListener);
    }

    //   componentDidMount() {
    //     let that = this;
    //     that.showLoadView();
    //     that._toLoadData(that.props.data)
    //     EventBus.on(GlobleKey.EVENT_BOOKINFO_LOAD_NEWBOOK, this.loadNewBookListener)
    //     // InteractionManager.runAfterInteractions(() => {
    //     //   that.dataLoadState = 1;
    //     // })
    //   }


    componentDidMount() {
        this.bookData = this.props.data;
        this.bookId = this.bookData.novelId;
        this._toLoadChapterList(this.bookId);
        // this._loadChapterListFromLocal(this.bookId);
        EventBus.on(GlobleKey.EVENT_BOOKINFO_LOAD_NEWBOOK, this.loadNewBookListener)
        EventBus.on(GlobleKey.EVENT_READPAGE_OPENCHAPTERLIST, this.openListener)
    }

    _loadChapterListFromLocal(bookId) {
        let that = this;
        if (bookId) {
            // alert('失败3')
            CatchSqlLiteUtil.queueChapterListByBookId(bookId, (msgCode, data) => {
                //console.log('查询完成')
                if (msgCode === 200 && data && data.length > 0) {
                    transaction(() => {
                        that.props.appStore.chapterListStore.bookAuthor = that.bookData.bookAuthor;
                        that.props.appStore.chapterListStore.bookCover = that.bookData.bookCover;
                        that.props.appStore.chapterListStore.bookName = that.bookData.bookName;
                        that.props.appStore.chapterListStore.bookId = bookId;
                        that.props.appStore.chapterListStore.chapterList = data;
                        that.props.appStore.chapterListStore.chapterCount = data.length;
                        that.dataLoadState = 1;
                        ChapterStatic.bookId = bookId;
                        ChapterStatic.chapterList = Array.from(data);
                        if (ChapterStatic.chapterList && ChapterStatic.chapterList.length > 0) {
                            ChapterTrueCount.chapterCount = ChapterStatic.chapterList.length
                        }
                        // alert('完成')
                    })
                } else {
                    // alert('失败1')
                    that.dataLoadState = 2;
                }
            })
        } else {
            // alert('失败2')
            that.dataLoadState = 2;
        }
    }

    _toLoadChapterList(bookId) {
        let that = this;
        if (bookId) {
            if (that.props.appStore.chapterListStore
                && that.props.appStore.chapterListStore.bookId === bookId
                && that.props.appStore.chapterListStore.chapterList
                && that.props.appStore.chapterListStore.chapterList.length > 0) {
                that.dataLoadState = 1;
            } else {
                let chapterRequest = new GetChapterListRequest();
                chapterRequest.bookId = bookId;
                NetWorkUtil.getJsonByPost(
                    GlobleUrl.URL_BASE_URL + GlobleUrl.URL_CHAPTER_LIST,
                    JSON.stringify(chapterRequest),
                    (data) => {
                        if (data && data.msgCode === 200) {
                            StoreUtil.formatStore(data, (msgCode, store) => {
                                let newStore = store;
                                if (newStore && newStore !== null) {
                                    that.bookId = bookId;
                                    that.props.appStore.chapterListStore = newStore;
                                    that.dataLoadState = 1;

                                    // if (that.largeListRef) {
                                    //     that.largeListRef.reloadAll();
                                    // }
                                } else {
                                    // that.dataLoadState = 2;
                                    that._loadChapterListFromLocal(bookId);
                                }
                            });
                        } else {
                            // that.dataLoadState = 2;
                            that._loadChapterListFromLocal(bookId);
                        }
                    },
                    (err) => {
                        // that.dataLoadState = 2;
                        that._loadChapterListFromLocal(bookId);
                    }
                )
            }
        } else {
            that.dataLoadState = 2;
        }
    }

    render() {
        let that = this;
        let data = that.props.data;
        let chapterListStore = that.props.appStore.chapterListStore;
        let appTheme = that.props.appStore.appTheme;
        let readTheme = that.props.appStore.readPageStore.readTheme;
        that.hideLoadView();
        if (that.dataLoadState === 1) {
            if (chapterListStore && chapterListStore.chapterList.length > 0) {
                let chapterList = Array.from(chapterListStore.chapterList);
                return (
                    <View
                        style={{ flex: 1, backgroundColor: readTheme.mainBgColor }}
                    >
                        <View
                            style={{ flex: 1, paddingHorizontal: Dpi.d(30), }}
                        >
                            <View style={{ flexDirection: 'row', height: Dpi.d(210), alignItems: 'center' }}>
                                <FastImage
                                    style={{
                                        width: Dpi.d(110),
                                        height: Dpi.d(140),
                                        resizeMode: FastImage.resizeMode.stretch
                                    }}
                                    source={{ uri: chapterListStore.bookCover }}
                                ></FastImage>
                                <View style={{ height: Dpi.d(140), marginLeft: Dpi.d(18), justifyContent: 'space-around' }}>
                                    <Text
                                        numberOfLines={2}
                                        style={{ fontSize: Dpi.s(36), color: readTheme.mainTextColor, maxWidth: Dpi.d(400) }}
                                    >{chapterListStore.bookName}</Text>
                                    <Text
                                        style={{ fontSize: Dpi.s(28), color: readTheme.mainTextColor }}
                                    >{chapterListStore.bookAuthor}</Text>
                                </View>

                            </View>
                            <TouchableHighlight
                                underlayColor={appTheme.greyBgColor}
                                onPress={() => {
                                    EventBus.emit(GlobleKey.EVENT_READPAGE_OPENCHAPTERLIST);
                                    let timer = setInterval(() => {
                                        if (chapterListStore) {
                                            EventBus.emit(GlobleKey.EVENT_BOOKREAD_RELOAD, { actionType: 6, chapterOrder: chapterListStore.chapterCount })
                                        }
                                        if (timer) {
                                            clearInterval(timer);
                                        }
                                    }, 300)
                                }}
                            >
                                <View
                                    style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', height: Dpi.d(87), borderBottomColor: appTheme.lowGreyTextColor, borderBottomWidth: Dpi.d(1) }}
                                >
                                    <Text numberOfLines={1} style={{ maxWidth: Dpi.d(500), fontSize: Dpi.s(26), color: readTheme.mainTextColor }}>{'共 ' + chapterListStore.chapterCount + ' 章'}</Text>
                                    <Image
                                        style={{
                                            opacity: 0.5,
                                            tintColor: readTheme.mainTextColor,
                                            width: Dpi.d(15),
                                            height: Dpi.d(25),
                                            resizeMode: FastImage.resizeMode.stretch
                                        }}
                                        source={ImageResource.toNextIcon}
                                    ></Image>
                                </View>
                            </TouchableHighlight >
                            <LargeList
                                ref={ref => that.largeListRef = ref}
                                style={{ flex: 1 }}
                                bounces={false}
                                numberOfRowsInSection={section => chapterList.length}
                                numberOfSections={() => 1}
                                safeMargin={600}
                                heightForCell={(section, row) => Dpi.d(87)}
                                renderCell={
                                    (section, row) => that._renderItem(chapterList[row], row)
                                }
                            />
                            {/* <View
                                style={{
                                    flex: 'row',
                                    flex: 1
                                }}
                            >
                                <LargeList
                                    ref={ref => that.largeListRef = ref}
                                    style={{ flex: 1 }}
                                    bounces={false}
                                    numberOfRowsInSection={section => chapterList.length}
                                    numberOfSections={() => 1}
                                    safeMargin={2000}
                                    heightForCell={(section, row) => Dpi.d(87)}
                                    renderCell={
                                        (section, row) => that._renderItem(chapterList[row], row)
                                    }
                                />
                                <ScrollView
                                    style={{
                                        width: Dpi.d(5),
                                    }}
                                >
                                    <Image
                                        style={{
                                            width: Dpi.d(5),
                                            height: Dpi.d(10)
                                        }}
                                        source={ImageResource.authorIcon}
                                    ></Image>
                                </ScrollView>
                            </View> */}
                        </View>
                    </View>
                )
            } else {
                return (
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: readTheme.mainBgColor
                        }}
                    >
                        <View
                            style={{ alignItems: 'center', marginTop: Dpi.d(146) }}
                        >
                            <FastImage
                                source={ImageResource.networkIserror}
                                style={{
                                    width: Dpi.d(326),
                                    height: Dpi.d(223),
                                    resizeMode: FastImage.resizeMode.stretch
                                }}
                            >
                            </FastImage>
                            <Text
                                style={{ fontSize: Dpi.s(30), color: readTheme.hightTextColor, marginTop: Dpi.d(44) }}
                            >章节列表为空</Text>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                    that.showLoadView();
                                    that._toLoadChapterList(that.bookId);
                                }}
                                style={{
                                    marginTop: Dpi.d(40)
                                }}
                            >
                                <View
                                    style={{ height: Dpi.d(80), width: Dpi.d(250), paddingVertical: Dpi.d(21), borderRadius: Dpi.d(8), justifyContent: 'center', alignItems: 'center', backgroundColor: appTheme.hightLightColor }}
                                >
                                    <Text style={{ color: appTheme.mainColor, fontSize: Dpi.d(30) }}>重新加载</Text>
                                </View>
                            </TouchableOpacity>
                        </View >
                    </View>
                )
            }
        } else if (that.dataLoadState === 2) {
            return (
                <View
                    style={{
                        flex: 1,
                        backgroundColor: readTheme.mainBgColor
                    }}
                >
                    <View
                        style={{ alignItems: 'center', marginTop: Dpi.d(146) }}
                    >
                        <FastImage
                            source={ImageResource.networkIserror}
                            style={{
                                width: Dpi.d(326),
                                height: Dpi.d(223),
                                resizeMode: FastImage.resizeMode.stretch
                            }}
                        >
                        </FastImage>
                        <Text
                            style={{ fontSize: Dpi.s(30), color: readTheme.hightTextColor, marginTop: Dpi.d(44) }}
                        >加载失败，点击重试</Text>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => {
                                that.showLoadView();
                                that._toLoadChapterList(that.bookId);
                            }}
                            style={{
                                marginTop: Dpi.d(40)
                            }}
                        >
                            <View
                                style={{ paddingHorizontal: Dpi.d(44), paddingVertical: Dpi.d(21), borderRadius: Dpi.d(8), borderWidth: Dpi.d(3), borderColor: readTheme.hightTextColor }}
                            >
                                <Text style={{ color: readTheme.hightTextColor }}>重新加载</Text>
                            </View>
                        </TouchableOpacity>
                    </View >
                </View>
            )
        } else {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        backgroundColor: appTheme.greyBgColor,
                        alignItems: 'center'
                    }}
                >
                    <ActivityIndicator size='large' color={appTheme.hightLightTextColor} />
                </View>
            )
        }
    }
}

