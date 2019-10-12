import React, { Component } from 'react';
import {
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    FlatList,
    ActivityIndicator,
    Platform,
    DeviceEventEmitter,
    ImageBackground,
    StyleSheet
} from 'react-native';
import AppUtils from '../../../../Utils/AppUtils'
import Dpi from '../../../../Utils/Dpi'
import EventBus from '../../../../Utils/EventBus'
import GlobleKey from '../../../../Globle/GlobleKey'
import ChapterPageManager from './Manager/ChapterPageManager'
import FastImage from '../../../../Components/react-native-fast-image'
import ImageResource from '../../../../../Resource/ImageResource'
import { observable, transaction, reaction } from 'mobx'
import PageView from './PageView'
import MeasureText from './MeasureText'
import { observer, inject } from 'mobx-react/native';
import TextInfoStatic from './Utils/TextInfoStatic'
import Toast from '../../../../Components/teaset/components/Toast/Toast'
import MySorage from '../../../../Utils/MyStore/MySorage';
import { Bars } from '../../../../Components/react-native-loader'
import RecordUtil from '../../../../Record/RecordUtil'
import RecordVar from '../../../../Record/RecordVar'
import ChapterChangType from './Utils/ChapterChangType'
import DateUtil from '../../../../Utils/DateUtil'
import MyText from '../../../../Components/MyText'
import Static from '../../Store/Static'
import ReadRecordUtil from './Utils/ReadRecordUtil';
import ChapterTrueCount from './Manager/ChapterTrueCount';
import LogBean from '../../../ReadLogPage/Store/LogBean'
import VolumnUtil from '../../../../NativeModul/VolumModul/VolumnUtil';
import ReadRecordTime from './Utils/ReadRecordTime'
@inject('appStore')
@observer
export default class ReadView extends Component {

    @observable
    pageViewsData = [];
    constructor(props) {
        super(props);
        let that = this;
        this.chapterMap = new Map();
        this.addPagView;
        this.loadViewKey;
        this.reRenderData;
        this.timeTimer;
        this.timeRef;
        this.lastVolumnEventTime = 0;
        this.scrollType = this.props.appStore.readPageStore.readTheme.scrollType;
        this.renderIsOver = true;
        /**
        * 当前正在阅读的页面
        */
        this.listViewRef;
        this.nowReadPageIndex = props.data.pageIndex;
        this.nowReadChapterOrder = props.data.chapterOrder;
        this.bookId = props.data.bookId;
        this.state = {
            measureState: 0
        }
        this.showTime;
        this.volumListener = (type) => {
            if (Static.listViewIsOpen === true || that.state.measureState !== 1) {
                return;
            }

            let newTime = (new Date()).getTime();
            if (newTime - that.lastVolumnEventTime > 700) {
                that.lastVolumnEventTime = newTime;
                if (type === 1) {
                    if (that.props.appStore.readPageStore.menuIsOpen === true) {
                        that.props.appStore.readPageStore.menuIsOpen = false;
                    }
                    if (that.props.appStore.readPageStore.settingIsOpen === true) {
                        that.props.appStore.readPageStore.settingIsOpen = false;
                    }
                    EventBus.emit(GlobleKey.EVENT_CLICK_TO_CHANGEPAGE, -1)
                } else if (type === -1) {
                    if (that.props.appStore.readPageStore.menuIsOpen === true) {
                        that.props.appStore.readPageStore.menuIsOpen = false;
                    }
                    if (that.props.appStore.readPageStore.settingIsOpen === true) {
                        that.props.appStore.readPageStore.settingIsOpen = false;
                    }
                    EventBus.emit(GlobleKey.EVENT_CLICK_TO_CHANGEPAGE, 1)
                } else if (type === 2) {
                    if (that.props.appStore.readPageStore.settingIsOpen === true) {
                        that.props.appStore.readPageStore.settingIsOpen = false;
                    } else {
                        that.props.appStore.readPageStore.menuIsOpen = !(that.props.appStore.readPageStore.menuIsOpen);
                    }
                }
            }
        }
        this.reRenderListener = (params) => {
            if (params) {
                this.reRenderData = params;
            }
            that.setState({
                measureState: 0
            })

        };
        this.changePageListener = (changeType) => {
            let pageLength = AppUtils.size.width;
            if (that.scrollType === 1) {
                pageLength = AppUtils.size.width;
            } else {
                pageLength = AppUtils.size.height;
            }

            if (changeType === -1) {
                if (that.listViewRef) {
                    if (that.nowReadPageIndex === 0) {
                        if (that.nowReadChapterOrder - 1 > 0) {
                            that.nowReadChapterOrder = that.nowReadChapterOrder - 1;
                            ReadRecordTime.lastRequestChapterOrder = that.nowReadChapterOrder;
                            ChapterChangType.changeType = -1;
                            EventBus.emit(GlobleKey.EVENT_BOOKREAD_RELOAD, { actionType: 6, chapterOrder: that.nowReadChapterOrder })
                        } else {
                            Toast.message('前面没有了', 'short', 'center');
                        }
                    } else {
                        if (Platform.OS === 'android') {
                            that.nowReadPageIndex -= 1;
                            that.listViewRef.scrollToOffset({ offset: that.nowReadPageIndex * pageLength, animated: true })
                        } else {
                            that.listViewRef.scrollToOffset({ offset: (that.nowReadPageIndex - 1) * pageLength, animated: true })
                        }
                    }
                }
            } else if (changeType === 1) {
                if (that.listViewRef && that.pageViewsData && that.pageViewsData.length > 0) {
                    if (that.nowReadPageIndex === that.pageViewsData.length - 1) {
                        if (ChapterTrueCount.chapterCount > 0 && that.nowReadChapterOrder + 1 < ChapterTrueCount.chapterCount) {
                            that.nowReadChapterOrder = that.nowReadChapterOrder + 1;
                            ReadRecordTime.lastRequestChapterOrder = that.nowReadChapterOrder;
                            EventBus.emit(GlobleKey.EVENT_BOOKREAD_RELOAD, { actionType: 6, chapterOrder: that.nowReadChapterOrder })
                        } else {
                            Toast.message('后面没有了', 'short', 'center')
                        }
                    } else {
                        if (Platform.OS === 'android') {
                            that.nowReadPageIndex += 1;
                            let readPageStore = that.props.appStore.readPageStore;
                            let readTheme = readPageStore.readTheme;
                            that.listViewRef.scrollToOffset({ offset: that.nowReadPageIndex * pageLength, animated: true });
                            if (that.pageViewsData && that.nowReadPageIndex < that.pageViewsData.length && that.pageViewsData[that.nowReadPageIndex]) {
                                let truePageIndex = that.pageViewsData[that.nowReadPageIndex].pageIndex;
                                if (truePageIndex > 0) {
                                    that._addReadLog({
                                        bookId: ChapterPageManager.currentData.bookId,
                                        chapterOrder: ChapterPageManager.currentData.chapterOrder,
                                        pageIndex: truePageIndex - 1
                                    });
                                    MySorage._sava('bookid' + ChapterPageManager.currentData.bookId,
                                        {
                                            bookId: ChapterPageManager.currentData.bookId,
                                            chapterOrder: ChapterPageManager.currentData.chapterOrder,
                                            pageIndex: truePageIndex - 1
                                        }
                                    )
                                }
                            }
                            if (ChapterPageManager.currentData) {
                                ReadRecordUtil.endRead(ChapterPageManager.currentData.bookId, ChapterPageManager.currentData.chapterOrder);
                            }
                            if (that.nowReadPageIndex < that.pageViewsData.length) {
                                let pageChapterOrder = that.pageViewsData[that.nowReadPageIndex].chapterOrder;
                                // //console.log('准备切换章节' + that.nowReadChapterOrder)
                                if (that.nowReadChapterOrder !== pageChapterOrder) {
                                    that.nowReadChapterOrder = pageChapterOrder;
                                    // //console.log('开始切换章节' + that.nowReadChapterOrder)
                                    ReadRecordTime.lastRequestChapterOrder = that.nowReadChapterOrder;
                                    ChapterPageManager.getPages(that.bookId, that.nowReadChapterOrder, readTheme.lineTextCount, readTheme.lineHeight, (callBack) => {
                                        // //console.log('结束切换章节' + that.nowReadChapterOrder)
                                        if (ChapterPageManager.currentData
                                            && ChapterPageManager.currentData.chapterData
                                        ) {
                                            readPageStore.readChapterName = ChapterPageManager.currentData.chapterData.chapterName;
                                            readPageStore.readChapterUrl = ChapterPageManager.currentData.chapterUrl;
                                        }
                                    })
                                }
                            }
                        } else {
                            that.listViewRef.scrollToOffset({ offset: (that.nowReadPageIndex + 1) * pageLength, animated: true })
                        }
                        if (that.pageViewsData.length < 100
                            && ChapterPageManager.nextData
                            && ChapterPageManager.nextData !== null
                            && ChapterPageManager.nextData.chapterPages
                            && ChapterPageManager.nextData.chapterPages !== null
                            && (ChapterPageManager.nextData.bookId + '') === that.bookId + ''
                            && ChapterPageManager.nextData.chapterPages.length > 0
                            && ChapterPageManager.nextData.chapterOrder === that.nowReadChapterOrder + 1) {
                            // //console.log('event' + ChapterPageManager.nextData.chapterPages.length)
                            if (!that.chapterMap.has(ChapterPageManager.nextData.chapterOrder)) {
                                // //console.log('that.pageViewsData.length = ' + that.pageViewsData.length)
                                // that.pageViewsData.push(ChapterPageManager.nextData.chapterPages);
                                that.pageViewsData = that.pageViewsData.concat(ChapterPageManager.nextData.chapterPages);
                                that.chapterMap.set(ChapterPageManager.nextData.chapterOrder, ChapterPageManager.nextData.chapterOrder);
                                // //console.log('that.pageViewsData.length = ' + that.pageViewsData.length)
                            }
                        }
                    }
                } else {

                }
            }
        }
    }



    componentDidMount() {
        let that = this;
        if (this.timeTimer && this.timeTimer != null) {

        } else {
            this.timeTimer = setInterval(() => {
                if (that.timeRef && that.timeRef != null) {
                    that.timeRef.setText(DateUtil.format('hh:mm'));
                }
            }, 10000);
        }
        EventBus.on(GlobleKey.EVENT_BOOKREAD_RELOAD, this.reRenderListener);
        EventBus.on(GlobleKey.EVENT_CLICK_TO_CHANGEPAGE, this.changePageListener);
        VolumnUtil.volumnListenerOn();
        DeviceEventEmitter.addListener('volumnKeyEvent', this.volumListener);
    }

    // @observable
    // bookId = '';

    // @observable
    // bookName = '';

    // @observable
    // bookCoverUrl = '';

    // @observable
    // bookAuthor = '';

    // @observable
    // lastReadTime = '';

    // @observable
    // lastReadChapterId = '';

    // @observable
    // lastReadChapterName = '';

    // @observable
    // lastReadChapterOrder = '';
    _addReadLog(log) {
        // try {
        try {
            let that = this;
            let readLogStore = that.props.appStore.readLogStore;
            let readPageStore = that.props.appStore.readPageStore;
            let chapterListStore = that.props.appStore.chapterListStore;
            let bean = new LogBean();
            bean.bookId = log.bookId;
            bean.bookName = chapterListStore.bookName;
            bean.bookCoverUrl = chapterListStore.bookCover;
            bean.bookAuthor = chapterListStore.bookAuthor;
            if (that.props.appStore.bookInfoStore && that.props.appStore.bookInfoStore.bookId == bean.bookId && that.props.appStore.bookInfoStore.isPagBook === true) {
                bean.isPagBook = 1;
            } else {
                bean.isPagBook = 0;
            }
            let dateObj = new Date();
            bean.lastReadTime = DateUtil.format("yyyy-MM-dd HH:mm:ss");
            bean.lastReadChapterId = log.chapterOrder;
            bean.lastReadChapterName = readPageStore.readChapterName;
            bean.lastReadChapterOrder = log.chapterOrder;
            bean.lastReadPage = log.pageIndex;
            readLogStore.addLogBean(bean);
        } catch (error) {
            console.log("添加阅读记录异常：" + error);
        }

        // } catch (error) {
        //     console.log("添加日志异常：" + error);
        // }
    }

    componentWillUnmount() {
        let that = this;
        if (this.timeTimer && this.timeTimer != null) {
            clearInterval(this.timeTimer);
        }
        EventBus.removeListener(GlobleKey.EVENT_BOOKREAD_RELOAD, this.reRenderListener);
        EventBus.removeListener(GlobleKey.EVENT_CLICK_TO_CHANGEPAGE, this.changePageListener);
        VolumnUtil.volumnListenerOff();
        DeviceEventEmitter.removeListener('volumnKeyEvent', that.volumListener);
        if (ChapterPageManager.currentData && this.state.measureState == 1) {
            if (that.pageViewsData && that.nowReadPageIndex < that.pageViewsData.length && that.pageViewsData[that.nowReadPageIndex]) {
                let truePageIndex = that.pageViewsData[that.nowReadPageIndex].pageIndex;
                if (truePageIndex > 0) {
                    that._addReadLog({
                        bookId: ChapterPageManager.currentData.bookId,
                        chapterOrder: ChapterPageManager.currentData.chapterOrder,
                        pageIndex: truePageIndex - 1
                    });
                    MySorage._sava('bookid' + ChapterPageManager.currentData.bookId,
                        {
                            bookId: ChapterPageManager.currentData.bookId,
                            chapterOrder: ChapterPageManager.currentData.chapterOrder,
                            pageIndex: truePageIndex - 1
                        }
                    )
                }
            }

        }
        this.hideLoadView();
        if (this.state.measureState === 1) {
            if (ChapterPageManager.currentData) {
                ReadRecordUtil.endRead(ChapterPageManager.currentData.bookId, ChapterPageManager.currentData.chapterOrder);
            }
        }
        pageViewsData = null;
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
        this.renderIsOver = true;
        let that = this;
        if (!that.loadViewKey) return;
        Toast.hide(that.loadViewKey);
        that.loadViewKey = undefined;
    }


    render() {
        let that = this;
        // //console.log(JSON.stringify(this.pageData))

        let appTheme = that.props.appStore.appTheme;
        let readPageStore = that.props.appStore.readPageStore;
        let readTheme = readPageStore.readTheme;
        if (that.state.measureState === 0) {
            if (that.reRenderData && that.reRenderData !== null) {
                if (that.reRenderData.actionType === 2 && that.reRenderData.textCount > 0) {    //字体大小改变重新加载
                    // { actionType: 2, textCount: 26 - value }
                    readTheme.setLineTextCount(that.reRenderData.textCount);
                } else if (that.reRenderData.actionType === 3) {        //行高改变重新加载
                    readPageStore.setLineHightType(that.reRenderData.lineHightType)
                } else if (that.reRenderData.actionType === 4) {        //主题背景改变重新加载
                    that.props.appStore.readPageStore.readTheme.setThemeType(that.reRenderData.bgType);
                } else if (that.reRenderData.actionType === 5) {        //滑动类型改变重新加载
                    that.scrollType = that.reRenderData.type;
                } else if (that.reRenderData.actionType === 6) {        //新章节重新加载
                    that.nowReadChapterOrder = that.reRenderData.chapterOrder;
                    ReadRecordTime.lastRequestChapterOrder = that.nowReadChapterOrder;
                    that.nowReadPageIndex = 0;
                }
            }
            that.reRenderData = null;
            that.showLoadView();
            that.chapterMap.clear();
            return (
                <View >
                    <MeasureText data={readTheme.textSize} measureCallBack={(info) => {
                        //console.log(JSON.stringify(info));
                        TextInfoStatic.textInfo = info;
                        ChapterPageManager.getPages(that.bookId, that.nowReadChapterOrder, readTheme.lineTextCount, readTheme.lineHeight, (callBack) => {
                            if (callBack.msgCode === 200) {
                                if (ChapterPageManager.currentData && ChapterPageManager.currentData.chapterPages.length > 0) {
                                    if (!that.chapterMap.has(ChapterPageManager.currentData.chapterOrder)) {
                                        transaction(() => {
                                            if (ChapterPageManager.currentData
                                                && ChapterPageManager.currentData.chapterData
                                            ) {
                                                readPageStore.readChapterName = ChapterPageManager.currentData.chapterData.chapterName;
                                                readPageStore.readChapterUrl = ChapterPageManager.currentData.chapterUrl;
                                            }
                                            readPageStore.bookId = that.bookId;
                                            that.pageViewsData = []
                                            that.pageViewsData = that.pageViewsData.concat(ChapterPageManager.currentData.chapterPages);
                                        })
                                        that.chapterMap.set(ChapterPageManager.currentData.chapterOrder, ChapterPageManager.currentData.chapterOrder)
                                        // that.chapterMap.push(ChapterPageManager.currentData.chapterOrder, ChapterPageManager.currentData.chapterOrder)
                                    }
                                    that.setState({ measureState: 1 });
                                }
                            } else if (callBack.msgCode === 2) {
                                that.hideLoadView();
                                that.setState({ measureState: 2 });
                            }
                        })
                    }}></MeasureText>
                </View>
            )
        } else if (that.state.measureState === 1) {
            if (ChapterPageManager.currentData && ChapterPageManager.currentData.chapterOrder) {
                that.nowReadChapterOrder = ChapterPageManager.currentData.chapterOrder;
                ReadRecordTime.lastRequestChapterOrder = that.nowReadChapterOrder;
            }
            let pageLength = AppUtils.size.width;
            if (that.scrollType === 1) {
                pageLength = AppUtils.size.width;
            } else {
                pageLength = AppUtils.size.height;
            }
            this.renderIsOver = false;
            ReadRecordUtil.startRead();
            if (ChapterChangType.changeType === -1) {
                if (that.pageViewsData) {
                    that.nowReadPageIndex = that.pageViewsData.length - 1;
                    ChapterChangType.changeType = 0;
                }
            }
            return (
                <View
                    style={{ flex: 1 }}
                >
                    <FlatList
                        ref={ref => that.listViewRef = ref}
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={(event) => {
                            // alert(ChapterChangType.scrollDistance)
                            let pageIndex = Math.round(event.nativeEvent.contentOffset.x / AppUtils.size.width);
                            if (that.scrollType === 1) {
                                pageIndex = Math.round(event.nativeEvent.contentOffset.x / AppUtils.size.width);
                            } else if (that.scrollType === 2) {
                                pageIndex = Math.round(event.nativeEvent.contentOffset.y / AppUtils.size.height);
                            }
                            // alert(pageIndex + ' + ' + that.nowReadPageIndex + ' + ' + that.pageViewsData.length + ' + ' + ChapterTrueCount.chapterCount + ' + ' + ChapterChangType.scrollDistance)
                            // if (pageIndex === that.nowReadPageIndex && pageIndex === 0 && that.pageViewsData.length === 1) {
                            //     if (ChapterChangType.scrollDistance < 0) {
                            //         if (that.renderIsOver === false) {
                            //             return;
                            //         }
                            //         if (that.nowReadChapterOrder + 1 > ChapterTrueCount.chapterCount) {
                            //             Toast.message('后面没有了', 'short', 'center');
                            //             return;
                            //         }
                            //         that.showLoadView();
                            //         that.nowReadChapterOrder = that.nowReadChapterOrder + 1;
                            //         EventBus.emit(GlobleKey.EVENT_BOOKREAD_RELOAD, { actionType: 6, chapterOrder: that.nowReadChapterOrder })
                            //     } else if (ChapterChangType.scrollDistance > 0) {
                            //         if (that.renderIsOver === false) {
                            //             return;
                            //         }
                            //         if (that.nowReadChapterOrder - 1 < 1) {
                            //             Toast.message('前面没有了')
                            //             return;
                            //         }
                            //         ChapterChangType.changeType = -1;
                            //         that.nowReadChapterOrder = that.nowReadChapterOrder - 1;
                            //         EventBus.emit(GlobleKey.EVENT_BOOKREAD_RELOAD, { actionType: 6, chapterOrder: that.nowReadChapterOrder })
                            //     }
                            //     ChapterChangType.scrollDistance = 0;
                            // } else
                            if (pageIndex === that.nowReadPageIndex && pageIndex === that.pageViewsData.length - 1 && ChapterChangType.scrollDistance <= 0) {//最后一页下翻页
                                ChapterChangType.scrollDistance = 0;
                                if (that.renderIsOver === false) {
                                    return;
                                }
                                if (that.nowReadChapterOrder + 1 > ChapterTrueCount.chapterCount) {
                                    Toast.message('后面没有了', 'short', 'center');
                                    return;
                                }
                                that.showLoadView();
                                that.nowReadChapterOrder = that.nowReadChapterOrder + 1;
                                ReadRecordTime.lastRequestChapterOrder = that.nowReadChapterOrder;
                                EventBus.emit(GlobleKey.EVENT_BOOKREAD_RELOAD, { actionType: 6, chapterOrder: that.nowReadChapterOrder })

                            } else if (pageIndex === that.nowReadPageIndex && pageIndex === 0 && ChapterChangType.scrollDistance >= 0) {    //第一页上翻页
                                ChapterChangType.scrollDistance = 0;
                                if (that.renderIsOver === false) {
                                    return;
                                }
                                if (that.nowReadChapterOrder - 1 < 1) {
                                    Toast.message('前面没有了')
                                    return;
                                }
                                ChapterChangType.changeType = -1;
                                that.nowReadChapterOrder = that.nowReadChapterOrder - 1;
                                ReadRecordTime.lastRequestChapterOrder = that.nowReadChapterOrder;
                                EventBus.emit(GlobleKey.EVENT_BOOKREAD_RELOAD, { actionType: 6, chapterOrder: that.nowReadChapterOrder })

                            } else {
                                that.nowReadPageIndex = pageIndex;
                                if (that.pageViewsData && that.nowReadPageIndex < that.pageViewsData.length && that.pageViewsData[that.nowReadPageIndex]) {
                                    let truePageIndex = that.pageViewsData[that.nowReadPageIndex].pageIndex;
                                    if (truePageIndex > 0) {
                                        that._addReadLog({
                                            bookId: ChapterPageManager.currentData.bookId,
                                            chapterOrder: ChapterPageManager.currentData.chapterOrder,
                                            pageIndex: truePageIndex - 1
                                        });
                                        MySorage._sava('bookid' + ChapterPageManager.currentData.bookId,
                                            {
                                                bookId: ChapterPageManager.currentData.bookId,
                                                chapterOrder: ChapterPageManager.currentData.chapterOrder,
                                                pageIndex: truePageIndex - 1
                                            }
                                        )
                                    }
                                }
                                if (ChapterPageManager.currentData) {
                                    ReadRecordUtil.endRead(ChapterPageManager.currentData.bookId, ChapterPageManager.currentData.chapterOrder);
                                }
                                if (that.nowReadPageIndex < that.pageViewsData.length) {
                                    let pageChapterOrder = that.pageViewsData[that.nowReadPageIndex].chapterOrder;
                                    // //console.log('准备切换章节' + that.nowReadChapterOrder)
                                    if (that.nowReadChapterOrder !== pageChapterOrder) {
                                        that.nowReadChapterOrder = pageChapterOrder;
                                        ReadRecordTime.lastRequestChapterOrder = that.nowReadChapterOrder;
                                        // //console.log('开始切换章节' + that.nowReadChapterOrder)
                                        ChapterPageManager.getPages(that.bookId, that.nowReadChapterOrder, readTheme.lineTextCount, readTheme.lineHeight, (callBack) => {
                                            // //console.log('结束切换章节' + that.nowReadChapterOrder)
                                            if (ChapterPageManager.currentData
                                                && ChapterPageManager.currentData.chapterData
                                            ) {
                                                readPageStore.readChapterName = ChapterPageManager.currentData.chapterData.chapterName;
                                                readPageStore.readChapterUrl = ChapterPageManager.currentData.chapterUrl;
                                            }
                                        })
                                    }
                                }
                            }
                        }
                        }
                        onScrollBeginDrag={(event) => {
                            if (that.props.appStore.readPageStore.menuIsOpen === true) {
                                that.props.appStore.readPageStore.menuIsOpen = false;
                            }
                            if (that.props.appStore.readPageStore.settingIsOpen === true) {
                                that.props.appStore.readPageStore.settingIsOpen = false;
                            }
                        }}
                        removeClippedSubviews={true}
                        initialScrollIndex={(that.nowReadPageIndex < that.pageViewsData.length) ? that.nowReadPageIndex : that.pageViewsData.length - 1}
                        onScrollEndDrag={(event) => {
                            if (that.pageViewsData.length < 100
                                && ChapterPageManager.nextData
                                && ChapterPageManager.nextData !== null
                                && ChapterPageManager.nextData.chapterPages
                                && ChapterPageManager.nextData.chapterPages !== null
                                && ChapterPageManager.nextData.chapterPages.length > 0
                                && (ChapterPageManager.nextData.bookId + '') === that.bookId + ''
                                && ChapterPageManager.nextData.chapterOrder === that.nowReadChapterOrder + 1
                            ) {
                                // //console.log('event' + ChapterPageManager.nextData.chapterPages.length)
                                if (that.pageViewsData.length === 1) {
                                    return;
                                }
                                if (!that.chapterMap.has(ChapterPageManager.nextData.chapterOrder)) {
                                    // //console.log('that.pageViewsData.length = ' + that.pageViewsData.length)
                                    // that.pageViewsData.push(ChapterPageManager.nextData.chapterPages);
                                    that.pageViewsData = that.pageViewsData.concat(ChapterPageManager.nextData.chapterPages);
                                    that.chapterMap.set(ChapterPageManager.nextData.chapterOrder, ChapterPageManager.nextData.chapterOrder);
                                    // //console.log('that.pageViewsData.length = ' + that.pageViewsData.length)
                                }
                            }
                        }}
                        horizontal={(that.scrollType === 1) ? true : false}
                        style={{ height: AppUtils.size.height, width: AppUtils.size.width }}
                        data={that.pageViewsData.slice()}
                        pagingEnabled={true}
                        // let pageData = itemProps.data;
                        // let appTheme = itemProps.appStore.appTheme;
                        // let readPageStore = itemProps.appStore.readPageStore;
                        // let readTheme = readPageStore.readTheme;
                        // let textCount = itemProps.textCount;
                        // let lineheight = itemProps.lineHeight;
                        // let textSize = itemProps.textSize;
                        renderItem={({ item }) => <PageView navigation={that.props.navigation} data={item} textCount={readTheme.lineTextCount} lineHeight={readTheme.lineHeight} textSize={readTheme.textSize}></PageView>}
                        // renderItem={({ item }) => ConstPageView({ data: item, appStore: that.props.appStore, textCount: readTheme.lineTextCount, lineHeight: readTheme.lineHeight, textSize: readTheme.textSize })}
                        getItemLayout={(item, index) => ({ length: pageLength, offset: pageLength * index, index: index })}
                    />
                    {
                        that.hideLoadView()
                    }
                    <MyText
                        ref={ref => that.timeRef = ref}
                        text={DateUtil.format('hh:mm')}
                        style={{
                            color: readTheme.readTextColor,
                            backgroundColor: '#00000000',
                            position: 'absolute',
                            right: Dpi.d(20),
                            opacity: 0.7,
                            bottom: Dpi.d(10),
                            fontSize: readTheme.textSize * 0.7
                        }}></MyText>
                </View>
                // <PageView data={ChapterPageManager.currentData.chapterPages[1]}></PageView>
            )
        } else {
            return (
                <TouchableOpacity
                    onPress={() => {
                        if (readPageStore && readPageStore.settingIsOpen) {
                            readPageStore.settingIsOpen = false;
                        } else {
                            readPageStore.menuIsOpen = !(readPageStore.menuIsOpen)
                        }
                    }}
                    activeOpacity={1}
                    style={{ alignItems: 'center', marginTop: Dpi.d(146), flex: 1 }}
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
                        style={{ backgroundColor: 'transparent', fontSize: Dpi.s(30), color: readTheme.readTextColor, marginTop: Dpi.d(44) }}
                    >加载失败，点击重试</Text>
                    <TouchableHighlight
                        underlayColor={appTheme.greyBgColor}
                        onPress={() => {
                            that.showLoadView();
                            ChapterPageManager.getPages(that.bookId, that.nowReadChapterOrder, readTheme.lineTextCount, readTheme.lineHeight, (callBack) => {
                                if (callBack.msgCode === 200) {
                                    if (ChapterPageManager.currentData && ChapterPageManager.currentData.chapterPages.length > 0) {
                                        if (!that.chapterMap.has(ChapterPageManager.currentData.chapterOrder)) {
                                            transaction(() => {
                                                if (ChapterPageManager.currentData
                                                    && ChapterPageManager.currentData.chapterData
                                                ) {
                                                    readPageStore.readChapterName = ChapterPageManager.currentData.chapterData.chapterName;
                                                    readPageStore.readChapterUrl = ChapterPageManager.currentData.chapterUrl;
                                                }
                                                readPageStore.bookId = that.bookId;
                                                that.pageViewsData = []
                                                that.pageViewsData = that.pageViewsData.concat(ChapterPageManager.currentData.chapterPages);
                                            })
                                            that.chapterMap.set(ChapterPageManager.currentData.chapterOrder, ChapterPageManager.currentData.chapterOrder)
                                            // that.chapterMap.push(ChapterPageManager.currentData.chapterOrder, ChapterPageManager.currentData.chapterOrder)
                                        }
                                        that.setState({ measureState: 1 });
                                    }
                                } else if (callBack.msgCode === 2) {
                                    that.hideLoadView();
                                    that.setState({ measureState: 2 });
                                }
                            })
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
                    </TouchableHighlight>
                </TouchableOpacity >
            )
        }
    }
}


