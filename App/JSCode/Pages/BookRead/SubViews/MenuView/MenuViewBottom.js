/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    FlatList,
    StatusBar,
    TouchableOpacity,
    PixelRatio,
    Animated,
    TouchableHighlight,
    Image
} from 'react-native'
import { observable, reaction, autorun, transaction } from 'mobx'
import { observer, inject } from 'mobx-react/native';
import Dpi from '../../../../Utils/Dpi'
import AppUtils from '../../../../Utils/AppUtils'
import FastImage from '../../../../Components/react-native-fast-image';
import ImageResource from '../../../../../Resource/ImageResource'
import Slider from '../../../../Components/react-native-slider';
import CatchView from '../CatchView/CatchView'
import EventBus from '../../../../Utils/EventBus';
import Drawer from '../../../../Components/teaset/components/Drawer/Drawer'
import CheckBox from '../../../../Components/react-native-check-box'
import GlobleKey from '../../../../Globle/GlobleKey';
import Toast from '../../../../Components/teaset/components/Toast/Toast'
import ChapterDataManager from '../ReadView/Manager/ChapterDataManager';
import CatchChapterBean from '../../../../Catch/Bean/CatchChapterBean'
import ChapterPageManager from '../ReadView/Manager/ChapterPageManager';
import ChapterTrueCount from '../ReadView/Manager/ChapterTrueCount';
import CatchSqlLiteUtil from '../../../../Catch/CatchSqlLiteUtil'
import MyText from '../../../../Components/MyText'
import CatchUtil from '../../../../Catch/CatchUtil'
import RecordVar from '../../../../Record/RecordVar'
import RecordUtil from '../../../../Record/RecordUtil'
import NetInfoUtils from '../../../../Network/NetInfoUtils'
@inject('appStore')
@observer
export default class MenuViewBottom extends Component {
    @observable
    refreshing = false;
    @observable
    currentValue = 0;
    @observable
    maxValue = 0;
    constructor(props) {
        super(props);
        this.firstMount = false;        //第一次渲染
        this.catchPopuKey;
        this.next50Chapter = true;
        this.nextAllChapter = false;
        this.allChapter = false;
        this.next50CheckBox;
        this.lastTouchTime = 0;
        this.nextAllCheckBox;
        this.chapterViewKey;
        this.chapterChoseView;
        this.allCheckBox;
        this.chpaterSliderRef;
        this.state = {
            viewY: new Animated.Value(Dpi.d(280))
        }
    }

    componentDidMount() {
        let that = this;
        let readPageStore = that.props.appStore.readPageStore;
        let readTheme = readPageStore.readTheme;
        autorun(() => {
            if (readPageStore.menuIsOpen === true) {
                that._startAnim(1);
            } else if (readPageStore.menuIsOpen === false) {
                that._startAnim(-1);
            }
        });

        // setInterval(() => {

        // })
    }

    _startAnim(animType) {
        let that = this;
        transaction(() => {
            if (ChapterPageManager.currentData && ChapterPageManager.currentData.chapterOrder) {
                that.currentValue = ChapterPageManager.currentData.chapterOrder - 1;
            }
            if (ChapterTrueCount.chapterCount) {
                that.maxValue = ChapterTrueCount.chapterCount - 1;
            }
        })
        // if (that.chpaterSliderRef) {
        //     if (ChapterPageManager.currentData && ChapterPageManager.currentData.chapterOrder) {
        //         that.chpaterSliderRef.setValue(ChapterPageManager.currentData.chapterOrder - 1);
        //     }
        // }

        if (that.firstMount === true) {//由于autorun第一次会运行，在这里规避，mobx其实还有一个第一次不运行的autorun方法，我暂时没找到，先用着吧
            if (animType && animType === -1) {
                Animated.timing( // 从时间范围映射到渐变的值。
                    that.state.viewY, {
                        toValue: Dpi.d(280),
                        duration: 400,// 动画持续的时间（单位是毫秒），默认为500
                        // delay: 0,// 在一段时间之后开始动画（单位是毫秒），默认为0。
                        useNativeDriver: true, // <-- 加上这一行
                    }).start(() => {

                    });
            } else if (animType && animType === 1) {
                Animated.timing( // 从时间范围映射到渐变的值。
                    that.state.viewY, {
                        toValue: 0,
                        duration: 400,// 动画持续的时间（单位是毫秒），默认为500
                        // delay: 0,// 在一段时间之后开始动画（单位是毫秒），默认为0。
                        useNativeDriver: true, // <-- 加上这一行
                    }).start(() => {

                    });
            }
        } else {
            that.firstMount = true;
        }
    }

    _renderChapterView() {
        let that = this;
        let readTheme = that.props.appStore.readPageStore.readTheme;
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: Dpi.d(-40),
                    backgroundColor: readTheme.stressColor,
                    fontSize: Dpi.d(30),
                    height: Dpi.d(80),
                    width: Dpi.d(350),
                    borderRadius: Dpi.d(10),
                }}
            >
                <MyText
                    style={{
                        color: readTheme.mainTextColor,
                        fontSize: Dpi.d(30),
                    }}
                    ref={ref => that.chapterChoseView = ref}
                    text='当前章节' />
            </View>
        )
    }

    showChapterView() {
        let that = this;
        if (that.chapterViewKey) return;

        that.chapterViewKey = Toast.show({
            icon: that._renderChapterView(),
            position: 'center',
            duration: 10000,
            color: 'transparent'
        });
    }

    hideChapterView() {
        let that = this;
        if (!that.chapterViewKey) return;
        Toast.hide(that.chapterViewKey);
        that.chapterViewKey = undefined;
    }

    _showCatchPopu() {
        let that = this;
        // data={novelId}
        let bookId = that.props.data;
        if (ChapterPageManager.currentData && ChapterPageManager.currentData.bookId === bookId) {
        } else {
            Toast.message('当前章节尚未加载完成，请稍候再试');
            return;
        }
        let appTheme = that.props.appStore.appTheme;
        let view = (
            <View style={{ width: AppUtils.size.width, height: Dpi.d(445), backgroundColor: appTheme.mainBgColor }}>
                <View
                    style={{
                        borderBottomWidth: Dpi.d(1),
                        borderBottomColor: appTheme.devideLineColor,
                    }}
                >
                    <Text style={{ fontSize: Dpi.s(32), marginTop: Dpi.d(30), marginBottom: Dpi.d(40), color: appTheme.groupTitleTextColor, textAlign: 'center', backgroundColor: 'transparent' }}>缓存多少章？</Text>
                </View>
                <TouchableHighlight
                    underlayColor={appTheme.greyBgColor}
                    onPress={() => {
                        transaction(() => {
                            that.next50Chapter = true;
                            that.nextAllChapter = false;
                            that.allChapter = false;
                            that.allCheckBox.setChecked(false)
                            that.next50CheckBox.setChecked(true)
                            that.nextAllCheckBox.setChecked(false)
                        })
                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            height: Dpi.d(85),
                            borderBottomWidth: Dpi.d(1),
                            borderBottomColor: appTheme.devideLineColor,
                        }}
                    >
                        <Text style={{ marginLeft: Dpi.d(41), fontSize: Dpi.s(32), color: appTheme.groupTitleTextColor, backgroundColor: 'transparent' }}>后面五十章</Text>
                        <CheckBox
                            checkedImage={<Image style={{ width: Dpi.d(34), height: Dpi.d(34), resizeMode: 'stretch' }} source={ImageResource.checkBoxSelected}></Image>}
                            unCheckedImage={<Image style={{ width: Dpi.d(34), height: Dpi.d(34), resizeMode: 'stretch' }} source={ImageResource.checkBoxNormal}></Image>}
                            ref={ref => that.next50CheckBox = ref}
                            style={{ marginRight: Dpi.d(41) }}
                            checkBoxColor={appTheme.hightLightTextColor}
                            onClick={() => {
                                transaction(() => {
                                    that.next50Chapter = true;
                                    that.nextAllChapter = false;
                                    that.allChapter = false;
                                    that.allCheckBox.setChecked(false)
                                    that.next50CheckBox.setChecked(true)
                                    that.nextAllCheckBox.setChecked(false)
                                })
                            }}
                            isChecked={that.next50Chapter}
                        ></CheckBox>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor={appTheme.greyBgColor}
                    onPress={() => {
                        transaction(() => {
                            that.next50Chapter = false;
                            that.nextAllChapter = true;
                            that.allChapter = false;
                            that.allCheckBox.setChecked(false)
                            that.next50CheckBox.setChecked(false)
                            that.nextAllCheckBox.setChecked(true)
                        })
                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            height: Dpi.d(85),
                            borderBottomWidth: Dpi.d(1),
                            borderBottomColor: appTheme.devideLineColor,
                        }}
                    >
                        <Text style={{ marginLeft: Dpi.d(41), fontSize: Dpi.s(32), color: appTheme.groupTitleTextColor, backgroundColor: 'transparent' }}>后面全部</Text>
                        <CheckBox
                            ref={ref => that.nextAllCheckBox = ref}
                            style={{ marginRight: Dpi.d(41) }}
                            checkedImage={<Image style={{ width: Dpi.d(34), height: Dpi.d(34), resizeMode: 'stretch' }} source={ImageResource.checkBoxSelected}></Image>}
                            unCheckedImage={<Image style={{ width: Dpi.d(34), height: Dpi.d(34), resizeMode: 'stretch' }} source={ImageResource.checkBoxNormal}></Image>}
                            checkBoxColor={appTheme.hightLightTextColor}
                            onClick={() => {
                                transaction(() => {
                                    that.next50Chapter = false;
                                    that.nextAllChapter = true;
                                    that.allChapter = false;
                                    that.allCheckBox.setChecked(false)
                                    that.next50CheckBox.setChecked(false)
                                    that.nextAllCheckBox.setChecked(true)
                                })
                            }}
                            isChecked={that.nextAllChapter}
                        ></CheckBox>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor={appTheme.greyBgColor}
                    onPress={() => {
                        transaction(() => {
                            that.next50Chapter = false;
                            that.nextAllChapter = false;
                            that.allChapter = true;
                            that.allCheckBox.setChecked(true)
                            that.next50CheckBox.setChecked(false)
                            that.nextAllCheckBox.setChecked(false)
                        })
                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            height: Dpi.d(85),
                            borderBottomWidth: Dpi.d(1),
                            borderBottomColor: appTheme.devideLineColor,
                        }}
                    >
                        <Text style={{ marginLeft: Dpi.d(41), fontSize: Dpi.s(32), color: appTheme.groupTitleTextColor, backgroundColor: 'transparent' }}>全部</Text>
                        <CheckBox
                            ref={ref => that.allCheckBox = ref}
                            style={{ marginRight: Dpi.d(41) }}
                            checkedImage={<Image style={{ width: Dpi.d(34), height: Dpi.d(34), resizeMode: 'stretch' }} source={ImageResource.checkBoxSelected}></Image>}
                            unCheckedImage={<Image style={{ width: Dpi.d(34), height: Dpi.d(34), resizeMode: 'stretch' }} source={ImageResource.checkBoxNormal}></Image>}
                            checkBoxColor={appTheme.hightLightTextColor}
                            onClick={() => {
                                transaction(() => {
                                    that.next50Chapter = false;
                                    that.nextAllChapter = false;
                                    that.allChapter = true;
                                    that.allCheckBox.setChecked(true)
                                    that.next50CheckBox.setChecked(false)
                                    that.nextAllCheckBox.setChecked(false)
                                })
                            }}
                            isChecked={that.allChapter}
                        ></CheckBox>
                    </View>
                </TouchableHighlight>
                <View
                    style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: Dpi.d(80),
                    }}
                >
                    <TouchableHighlight
                        underlayColor={'#a3a3a3'}
                        onPress={() => {
                            that.catchPopuKey.close();
                        }}
                    >
                        <View
                            style={{ backgroundColor: appTheme.greyBgColor, width: AppUtils.size.width / 2, height: Dpi.d(85), alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Text
                                style={{ fontSize: Dpi.s(30), color: appTheme.groupTitleTextColor }}
                            >取消</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() => {
                            try {
                                if (ChapterPageManager.currentData) {
                                    let chapterListStore = that.props.appStore.chapterListStore;
                                    let chapterSize = ChapterTrueCount.chapterCount;
                                    let hasTrueChapter = false;     //是否已章节列表为准
                                    let chapterList = Array.from(chapterListStore.chapterList)
                                    if (chapterListStore && chapterListStore.bookId == bookId && chapterList.length > 0) {
                                        chapterSize = chapterList.length;
                                        hasTrueChapter = true;
                                    } else {
                                        Toast.message('章节列表未加载完成，请稍后重试');
                                        return;
                                    }
                                    let catchChapterList = [];
                                    if (that.next50Chapter === true && that.nextAllChapter === false && that.allChapter === false) {
                                        // alert(ChapterTrueCount.chapterCount)
                                        for (let i = 1; i <= chapterSize; ++i) {
                                            try {
                                                let catchBean = new CatchChapterBean();
                                                catchBean.bookId = bookId;
                                                catchBean.catchIsSuccess = false;
                                                catchBean.chapterContent = '';
                                                catchBean.chapterId = '';
                                                catchBean.chapterName = '';
                                                catchBean.chapterOrder = i;
                                                catchBean.chapterUrl = '';
                                                catchBean.wordCount = ChapterPageManager.currentData.chapterCount;

                                                if (hasTrueChapter === true && i - 1 >= 0 && i - 1 < chapterList.length) {
                                                    let chapterBean = chapterList[i - 1];
                                                    catchBean.chapterId = chapterBean.chapterId;
                                                    catchBean.chapterName = chapterBean.chapterName;
                                                }
                                                if (i >= ChapterPageManager.currentData.chapterOrder && i <= (ChapterPageManager.currentData.chapterOrder + 50)) {
                                                    catchBean.needCatch = 200;
                                                }
                                                catchChapterList.push(catchBean);
                                            } catch (error) {

                                            }

                                        }
                                        RecordUtil.clickRecord(bookId, RecordVar.click_catch_50, (new Date()).getTime());
                                        CatchUtil.addToCatchQueue(bookId, catchChapterList);
                                    } else if (that.next50Chapter === false && that.nextAllChapter === true && that.allChapter === false) {
                                        // for (let i = ChapterPageManager.currentData.chapterOrder; i <= ChapterTrueCount.chapterCount; ++i) {
                                        //     let catchBean = new CatchChapterBean();
                                        //     catchBean.bookId = bookId;
                                        //     catchBean.catchIsSuccess = false;
                                        //     catchBean.chapterContent = '';
                                        //     catchBean.chapterId = '';
                                        //     catchBean.chapterName = '';
                                        //     catchBean.chapterOrder = i;
                                        //     catchBean.chapterUrl = '';
                                        //     catchBean.wordCount = ChapterPageManager.currentData.chapterCount;
                                        //     catchChapterList.push(catchBean);
                                        // }

                                        for (let i = 1; i <= chapterSize; ++i) {
                                            try {
                                                let catchBean = new CatchChapterBean();
                                                catchBean.bookId = bookId;
                                                catchBean.catchIsSuccess = false;
                                                catchBean.chapterContent = '';
                                                catchBean.chapterId = '';
                                                catchBean.chapterName = '';
                                                catchBean.chapterOrder = i;
                                                catchBean.chapterUrl = '';
                                                catchBean.wordCount = ChapterPageManager.currentData.chapterCount;

                                                if (hasTrueChapter === true && i - 1 >= 0 && i - 1 < chapterList.length) {
                                                    let chapterBean = chapterList[i - 1];
                                                    catchBean.chapterId = chapterBean.chapterId;
                                                    catchBean.chapterName = chapterBean.chapterName;
                                                }
                                                if (i >= ChapterPageManager.currentData.chapterOrder && i <= chapterSize) {
                                                    catchBean.needCatch = 200;
                                                }
                                                catchChapterList.push(catchBean);
                                            } catch (error) {

                                            }

                                        }
                                        RecordUtil.clickRecord(bookId, RecordVar.click_catch_nextall, (new Date()).getTime());
                                        CatchUtil.addToCatchQueue(bookId, catchChapterList);
                                    } else if (that.next50Chapter === false && that.nextAllChapter === false && that.allChapter === true) {
                                        // for (let i = 1; i <= ChapterTrueCount.chapterCount; ++i) {
                                        //     let catchBean = new CatchChapterBean();
                                        //     catchBean.bookId = bookId;
                                        //     catchBean.catchIsSuccess = false;
                                        //     catchBean.chapterContent = '';
                                        //     catchBean.chapterId = '';
                                        //     catchBean.chapterName = '';
                                        //     catchBean.chapterOrder = i;
                                        //     catchBean.chapterUrl = '';
                                        //     catchBean.wordCount = ChapterPageManager.currentData.chapterCount;
                                        //     catchChapterList.push(catchBean);
                                        // }
                                        for (let i = 1; i <= chapterSize; ++i) {
                                            try {
                                                let catchBean = new CatchChapterBean();
                                                catchBean.bookId = bookId;
                                                catchBean.catchIsSuccess = false;
                                                catchBean.chapterContent = '';
                                                catchBean.chapterId = '';
                                                catchBean.chapterName = '';
                                                catchBean.chapterOrder = i;
                                                catchBean.chapterUrl = '';
                                                catchBean.wordCount = ChapterPageManager.currentData.chapterCount;

                                                if (hasTrueChapter === true && i - 1 >= 0 && i - 1 < chapterList.length) {
                                                    let chapterBean = chapterList[i - 1];
                                                    catchBean.chapterId = chapterBean.chapterId;
                                                    catchBean.chapterName = chapterBean.chapterName;
                                                }
                                                if (i >= 1 && i <= chapterSize) {
                                                    catchBean.needCatch = 200;
                                                }
                                                catchChapterList.push(catchBean);
                                            } catch (error) {

                                            }

                                        }
                                        RecordUtil.clickRecord(bookId, RecordVar.click_catch_all, (new Date()).getTime());
                                        CatchUtil.addToCatchQueue(bookId, catchChapterList);
                                    }
                                    that.catchPopuKey.close();
                                }
                            } catch (error) {
                                Toast.message('章节列表未加载完成，请稍后重试' + error);
                                return;
                            }

                        }}
                    >
                        <View
                            style={{ backgroundColor: appTheme.hightLightColor, width: AppUtils.size.width / 2, height: Dpi.d(80), alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Text style={{ fontSize: Dpi.s(30), color: appTheme.mainColor }}>确定</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
        that.catchPopuKey = Drawer.open(view, 'bottom');
    }

    render() {
        let that = this;
        let appTheme = this.props.appStore.appTheme;
        let readPageStore = this.props.appStore.readPageStore;
        let readTheme = readPageStore.readTheme;
        return (
            <Animated.View

                style={{


                    transform: [
                        { translateY: that.state.viewY }, // x轴移动
                    ],
                    bottom: 0,
                    width: AppUtils.size.width,
                    position: 'absolute',
                    height: Dpi.d(46 + 2 + 100 + 132)
                }}>
                <CatchView ></CatchView>
                <View
                    style={{
                        backgroundColor: readTheme.mainBgColor,
                    }}
                >

                    <View style={{
                        height: Dpi.d(1),
                        backgroundColor: readTheme.mainTextColor,
                        opacity: 0.1
                    }}>
                    </View>
                    <View
                        style={{
                            alignItems: 'center',

                            height: Dpi.d(100),
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                let curTime = (new Date()).getTime();
                                if (curTime - that.lastTouchTime < 1000) {
                                    return;
                                }
                                that.lastTouchTime = curTime;
                                if (ChapterPageManager.currentData && ChapterPageManager.currentData.chapterOrder && ChapterPageManager.currentData.chapterOrder - 1 > 0) {
                                    EventBus.emit(GlobleKey.EVENT_BOOKREAD_RELOAD, { actionType: 6, chapterOrder: ChapterPageManager.currentData.chapterOrder - 1 })
                                } else {
                                    Toast.message('前面没有了', 'short', 'center');
                                }
                            }}
                            style={{
                                padding: Dpi.d(10),
                                marginLeft: Dpi.d(20),
                                width: Dpi.d(),
                                height: Dpi.d(),
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <Text
                                style={{
                                    color: readTheme.mainTextColor,
                                    fontSize: Dpi.d(24)
                                }}
                            >上一章</Text>
                        </TouchableOpacity>
                        <Slider
                            ref={ref => that.chpaterSliderRef = ref}
                            onSlidingStart={() => {
                                that.showChapterView();
                            }}
                            onSlidingComplete={(value) => {
                                that.hideChapterView();
                                if (value + 1 <= ChapterTrueCount.chapterCount && value >= 0) {
                                    EventBus.emit(GlobleKey.EVENT_BOOKREAD_RELOAD, { actionType: 6, chapterOrder: value + 1 })
                                }
                            }}
                            step={1}
                            onValueChange={(value) => {
                                if (that.chapterChoseView) {
                                    that.chapterChoseView.setText('第' + (value + 1) + '章')
                                }
                            }}
                            maximumValue={that.maxValue}
                            minimumValue={0}
                            value={that.currentValue}
                            maximumTrackTintColor={readTheme.mainTextColor}
                            trackStyle={{ height: Dpi.d(5) }}
                            minimumTrackTintColor={readTheme.hightBgColor}
                            thumbTintColor={readTheme.hightBgColor}
                            style={{ flex: 1 }}
                        >

                        </Slider>
                        <TouchableOpacity
                            onPress={() => {
                                let curTime = (new Date()).getTime();
                                if (curTime - that.lastTouchTime < 1000) {
                                    return;
                                }
                                that.lastTouchTime = curTime;
                                if (ChapterPageManager.currentData && ChapterPageManager.currentData.chapterOrder && ChapterPageManager.currentData.chapterOrder + 1 <= ChapterTrueCount.chapterCount) {
                                    EventBus.emit(GlobleKey.EVENT_BOOKREAD_RELOAD, { actionType: 6, chapterOrder: ChapterPageManager.currentData.chapterOrder + 1 })
                                } else {
                                    Toast.message('后面没有了', 'short', 'center');
                                }
                            }}
                            style={{
                                padding: Dpi.d(10),
                                marginRight: Dpi.d(20),
                                width: Dpi.d(),
                                height: Dpi.d(),
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <Text
                                style={{
                                    color: readTheme.mainTextColor,
                                    fontSize: Dpi.d(24)
                                }}
                            >下一章</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        height: Dpi.d(1),
                        backgroundColor: readTheme.mainTextColor,
                        opacity: 0.1
                    }}>

                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            backgroundColor: readTheme.mainBgColor,
                            height: Dpi.d(132),
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}
                    >

                        <TouchableOpacity
                            onPress={() => {
                                let curTime = (new Date()).getTime();
                                if (curTime - that.lastTouchTime < 1000) {
                                    return;
                                }
                                that.lastTouchTime = curTime;
                                readPageStore.menuIsOpen = false;
                                EventBus.emit(GlobleKey.EVENT_READPAGE_OPENCHAPTERLIST);
                            }}
                            style={{
                                width: Dpi.d(),
                                height: Dpi.d(),
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <FastImage style={{
                                tintColor: readTheme.mainTextColor,
                                marginHorizontal: Dpi.d(20),
                                height: Dpi.d(46),
                                width: Dpi.d(46),
                                resizeMode: 'stretch'
                            }}
                                source={ImageResource.menuChapterListIcon}>
                            </FastImage>
                            <Text
                                style={{
                                    color: readTheme.mainTextColor,
                                    fontSize: Dpi.d(24)
                                }}
                            >目录</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                let curTime = (new Date()).getTime();
                                if (curTime - that.lastTouchTime < 1000) {
                                    return;
                                }
                                that.lastTouchTime = curTime;
                                readTheme.setIsHuyan(!(readTheme.isHuyan));
                            }}
                            style={{
                                width: Dpi.d(),
                                height: Dpi.d(),
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <FastImage style={{
                                tintColor: (readTheme.isHuyan === true) ? readTheme.hightTextColor : readTheme.mainTextColor,
                                marginHorizontal: Dpi.d(20),
                                height: Dpi.d(46),
                                width: Dpi.d(46),
                                resizeMode: 'stretch'
                            }}
                                source={ImageResource.menuHuyangIcon}>
                            </FastImage>
                            <Text
                                style={{
                                    color: (readTheme.isHuyan === true) ? readTheme.hightTextColor : readTheme.mainTextColor,
                                    fontSize: Dpi.d(24)
                                }}
                            >护眼</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: Dpi.d(),
                            height: Dpi.d(),
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                            onPress={() => {
                                let curTime = (new Date()).getTime();
                                if (curTime - that.lastTouchTime < 1000) {
                                    return;
                                }
                                that.lastTouchTime = curTime;
                                if (readTheme.themeType === 1) {
                                    // readTheme.setThemeType(0)
                                    EventBus.emit(GlobleKey.EVENT_BOOKREAD_RELOAD, { actionType: 4, bgType: 0 });
                                } else {
                                    // readTheme.setThemeType(1)
                                    EventBus.emit(GlobleKey.EVENT_BOOKREAD_RELOAD, { actionType: 4, bgType: 1 });
                                }
                            }}
                        >
                            <FastImage style={{
                                tintColor: (readTheme.themeType === 1) ? readTheme.hightTextColor : readTheme.mainTextColor,
                                marginHorizontal: Dpi.d(20),
                                height: Dpi.d(46),
                                width: Dpi.d(46),
                                resizeMode: 'stretch'
                            }}
                                source={ImageResource.menuYanjieIcon}>
                            </FastImage>
                            <Text
                                style={{
                                    color: (readTheme.themeType === 1) ? readTheme.hightTextColor : readTheme.mainTextColor,
                                    fontSize: Dpi.d(24)
                                }}
                            >夜间</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                let curTime = (new Date()).getTime();
                                if (curTime - that.lastTouchTime < 1000) {
                                    return;
                                }
                                that.lastTouchTime = curTime;
                                if (NetInfoUtils.isConnected) {
                                    that._showCatchPopu();
                                } else {
                                    Toast.message('网络不可用，请检测网络', 'long', 'center')
                                }
                            }}
                            style={{
                                width: Dpi.d(),
                                height: Dpi.d(),
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <FastImage style={{
                                tintColor: readTheme.mainTextColor,
                                marginHorizontal: Dpi.d(20),
                                height: Dpi.d(46),
                                width: Dpi.d(46),
                                resizeMode: 'stretch'
                            }}
                                source={ImageResource.menuCatchIcon}>
                            </FastImage>
                            <Text
                                style={{
                                    color: readTheme.mainTextColor,
                                    fontSize: Dpi.d(24)
                                }}
                            >缓存</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                let curTime = (new Date()).getTime();
                                if (curTime - that.lastTouchTime < 1000) {
                                    return;
                                }
                                that.lastTouchTime = curTime;
                                readPageStore.settingIsOpen = !(readPageStore.settingIsOpen);
                                readPageStore.menuIsOpen = !(readPageStore.menuIsOpen);
                            }}
                            style={{
                                width: Dpi.d(),
                                height: Dpi.d(),
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <FastImage style={{
                                tintColor: readTheme.mainTextColor,
                                marginHorizontal: Dpi.d(20),
                                height: Dpi.d(46),
                                width: Dpi.d(46),
                                resizeMode: 'stretch'
                            }}
                                source={ImageResource.menuSettingIcon}>
                            </FastImage>
                            <Text
                                style={{
                                    color: readTheme.mainTextColor,
                                    fontSize: Dpi.d(24)
                                }}
                            >设置</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View >
        );
    }
}

