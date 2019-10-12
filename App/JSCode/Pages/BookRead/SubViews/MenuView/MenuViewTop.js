/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    BackHandler,
    TouchableHighlight
} from 'react-native'
import { observable, autorun } from 'mobx'
import { observer, inject } from 'mobx-react/native';
import FastImage from '../../../../Components/react-native-fast-image'
import Dpi from '../../../../Utils/Dpi'
import AppUtils from '../../../../Utils/AppUtils'
import ImageResource from '../../../../../Resource/ImageResource'
import Slider from '../../../../Components/react-native-slider';
import Toast from '../../../../Components/teaset/components/Toast/Toast'
import LoadPage from '../../../Load/LoadPage'
import Drawer from '../../../../Components/teaset/components/Drawer/Drawer'
import BookCaseUtil from '../../../BookCase/Utils/BookCaseUtil'
import CheckBox from '../../../../Components/react-native-check-box'
import RecordUtil from '../../../../Record/RecordUtil'
import WebViewPage from '../../../WebPage/WebViewPage'
import RecordVar from '../../../../Record/RecordVar'
import ReadRecordTime from '../ReadView/Utils/ReadRecordTime'
@inject('appStore')
@observer
export default class MenuViewTop extends Component {
    @observable refreshing = false;
    constructor(props) {
        super(props);
        this.firstMount = false;        //第一次渲染
        this.catchViewKey;
        let that = this;
        this.addBagView;
        this.errRecordView;
        this.lastTouchTime = 0;
        this.state = {
            viewY: new Animated.Value(Dpi.d(-157))
        };

        this.backHandler = () => {

            if (that.props.appStore.readPageStore.settingIsOpen === true) {
                that.props.appStore.readPageStore.settingIsOpen = false;
                return true;
            } else if (that.props.appStore.readPageStore.menuIsOpen === true) {
                that.props.appStore.readPageStore.menuIsOpen = false;
                return true;
            } else {
                if (that.props.appStore.myPageStore.isLoaded == true) {
                    if (that.props.appStore.bookInfoStore
                        && that.props.appStore.bookInfoStore != null
                        && that.props.appStore.bookInfoStore.bookId == that.props.data
                        && that.props.appStore.bookInfoStore.isPagBook == false) {
                        that._showAddPagPopu();
                        return true;
                    } else {
                        if (that.props.appStore.bookCaseStore.checkIsPagBook(that.props.data) == true) {
                            return false;
                        } else {
                            that._showAddPagPopu();
                            return true;
                        }
                    }
                } else {
                    that._showAddPagPopu();
                    return true;
                }
            }
        }
    }


    componentWillUnmount() {
        this.addBagView = null;
        this.errRecordView = null
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler)
    }


    _showErrorRecord() {
        let that = this;
        // data={novelId}
        let bookId = that.props.data;
        let appTheme = that.props.appStore.appTheme;
        let chapterOrder = ReadRecordTime.lastRequestChapterOrder;
        // alert(chapterOrder)
        if (that.errRecordView && that.errRecordView !== null) {

        } else {
            that.errRecordView = (
                <View style={{ width: AppUtils.size.width, height: Dpi.d(630), backgroundColor: 'transparent' }}>

                    <View
                        style={{ width: AppUtils.size.width, height: Dpi.d(550), backgroundColor: appTheme.mainBgColor }}
                    >
                        <View
                            style={{
                                borderBottomWidth: Dpi.d(1),
                                borderBottomColor: appTheme.devideLineColor,
                            }}
                        >
                            <Text style={{ fontSize: Dpi.s(32), marginTop: Dpi.d(30), marginBottom: Dpi.d(40), color: appTheme.groupTitleTextColor, textAlign: 'center', backgroundColor: 'transparent' }}>请选择错误类型</Text>
                        </View>

                        <TouchableHighlight
                            underlayColor={appTheme.greyBgColor}
                            onPress={() => {
                                RecordUtil.clickRecord(bookId, RecordVar.click_error_01, (new Date()).getTime(), chapterOrder + '');
                                that.catchPopuKey.close();
                                Toast.message('反馈提交成功', 'short', 'center');
                            }}
                        >
                            <View
                                style={{
                                    borderBottomColor: appTheme.greyBgColor,
                                    borderBottomWidth: Dpi.d(1),
                                    justifyContent: 'center',

                                    justifyContent: 'space-between',
                                    height: Dpi.d(85),
                                }}
                            >
                                <View
                                    style={{ alignItems: 'center', width: AppUtils.size.width, height: Dpi.d(85), justifyContent: 'center', borderRadius: Dpi.d(7) }}
                                >
                                    <Text
                                        style={{ fontSize: Dpi.s(30), color: appTheme.mainTextColor }}
                                    >章节顺序错乱</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={appTheme.greyBgColor}
                            onPress={() => {
                                RecordUtil.clickRecord(bookId, RecordVar.click_error_02, (new Date()).getTime(), chapterOrder + '');
                                that.catchPopuKey.close();
                                Toast.message('反馈提交成功', 'short', 'center');
                            }}
                        >
                            <View
                                style={{
                                    borderBottomColor: appTheme.greyBgColor,
                                    borderBottomWidth: Dpi.d(1),
                                    justifyContent: 'center',

                                    justifyContent: 'space-between',
                                    height: Dpi.d(85),
                                }}
                            >
                                <View
                                    style={{ alignItems: 'center', width: AppUtils.size.width, height: Dpi.d(85), justifyContent: 'center', borderRadius: Dpi.d(7) }}
                                >
                                    <Text
                                        style={{ fontSize: Dpi.s(30), color: appTheme.mainTextColor }}
                                    >内容缺失</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={appTheme.greyBgColor}
                            onPress={() => {
                                RecordUtil.clickRecord(bookId, RecordVar.click_error_03, (new Date()).getTime(), chapterOrder + '');
                                that.catchPopuKey.close();
                                Toast.message('反馈提交成功', 'short', 'center');
                            }}
                        >
                            <View
                                style={{
                                    borderBottomColor: appTheme.greyBgColor,
                                    borderBottomWidth: Dpi.d(1),
                                    justifyContent: 'center',

                                    justifyContent: 'space-between',
                                    height: Dpi.d(85),
                                }}
                            >
                                <View
                                    style={{ alignItems: 'center', width: AppUtils.size.width, height: Dpi.d(85), justifyContent: 'center', borderRadius: Dpi.d(7) }}
                                >
                                    <Text
                                        style={{ fontSize: Dpi.s(30), color: appTheme.mainTextColor }}
                                    >没有更新</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={appTheme.greyBgColor}
                            onPress={() => {
                                RecordUtil.clickRecord(bookId, RecordVar.click_error_04, (new Date()).getTime(), chapterOrder + '');
                                that.catchPopuKey.close();
                                Toast.message('反馈提交成功', 'short', 'center');
                            }}
                        >
                            <View
                                style={{
                                    borderBottomColor: appTheme.greyBgColor,
                                    borderBottomWidth: Dpi.d(1),
                                    justifyContent: 'center',

                                    justifyContent: 'space-between',
                                    height: Dpi.d(85),
                                }}
                            >
                                <View
                                    style={{ alignItems: 'center', width: AppUtils.size.width, height: Dpi.d(85), justifyContent: 'center', borderRadius: Dpi.d(7) }}
                                >
                                    <Text
                                        style={{ fontSize: Dpi.s(30), color: appTheme.mainTextColor }}
                                    >乱码错别字</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={appTheme.greyBgColor}
                            onPress={() => {
                                RecordUtil.clickRecord(bookId, RecordVar.click_error_05, (new Date()).getTime(), chapterOrder + '');
                                that.catchPopuKey.close();
                                Toast.message('反馈提交成功', 'short', 'center');
                            }}
                        >
                            <View
                                style={{

                                    justifyContent: 'center',
                                    justifyContent: 'space-between',
                                    height: Dpi.d(85),
                                }}
                            >
                                <View
                                    style={{ alignItems: 'center', width: AppUtils.size.width, height: Dpi.d(85), justifyContent: 'center', borderRadius: Dpi.d(7) }}
                                >
                                    <Text
                                        style={{ fontSize: Dpi.s(30), color: appTheme.mainTextColor }}
                                    >排版混乱</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <TouchableHighlight
                        style={{
                            backgroundColor: 'transparent'
                        }}
                        underlayColor={appTheme.greyBgColor}
                        onPress={() => {
                            RecordUtil.clickRecord(bookId, RecordVar.click_error_06, (new Date()).getTime(), chapterOrder + '');
                            that.catchPopuKey.close();
                        }}
                    >
                        <View
                            style={{
                                borderRadius: Dpi.d(10),
                                justifyContent: 'center',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                height: Dpi.d(85),
                            }}
                        >
                            <View
                                style={{ backgroundColor: appTheme.greyBgColor, width: AppUtils.size.width, height: Dpi.d(85), alignItems: 'center', justifyContent: 'center', borderRadius: Dpi.d(7) }}
                            >
                                <Text
                                    style={{ fontSize: Dpi.s(30), color: appTheme.groupTitleTextColor }}
                                >取消</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
            );
        }
        that.catchPopuKey = Drawer.open(that.errRecordView, 'bottom');
    }



    _showAddPagPopu() {
        let that = this;
        // data={novelId}
        let bookId = that.props.data;
        let appTheme = that.props.appStore.appTheme;
        if (that.addBagView && that.addBagView !== null) {

        } else {
            that.addBagView = (
                <View style={{ width: AppUtils.size.width, height: Dpi.d(368), backgroundColor: appTheme.mainBgColor, alignItems: 'center' }}>
                    <View
                        style={{
                            width: AppUtils.size.width,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderBottomColor: appTheme.devideLineColor,
                            borderBottomWidth: Dpi.d(1),
                            height: Dpi.d(114),
                        }}
                    >
                        <Text
                            style={{
                                color: appTheme.groupTitleTextColor,
                                fontSize: Dpi.s(32)
                            }}
                        >放入书架</Text>
                    </View>
                    <View
                        style={{
                            width: AppUtils.size.width,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderBottomColor: appTheme.devideLineColor,
                            borderBottomWidth: Dpi.d(1),
                            height: Dpi.d(170),
                        }}
                    >
                        <Text
                            style={{
                                color: appTheme.groupTitleTextColor,
                                fontSize: Dpi.s(30)
                            }}
                        >喜欢这本书就加入书架吧？</Text>
                    </View>
                    <View
                        style={{
                            width: AppUtils.size.width,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            borderBottomColor: appTheme.devideLineColor,
                            borderBottomWidth: Dpi.d(1),
                            height: Dpi.d(90),
                        }}
                    >
                        <TouchableHighlight
                            onPress={() => {
                                if (that.addPagView) {
                                    that.addPagView.close();
                                }
                                if (that.props.navigation) {
                                    that.props.navigation.goBack();
                                }
                            }}
                            underlayColor={appTheme.greyBgColor}
                            style={{
                                height: Dpi.d(90),
                                width: AppUtils.size.width / 2,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    color: appTheme.groupTitleTextColor,
                                    fontSize: Dpi.s(30)
                                }}
                            >取消</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => {
                                if (that.addPagView) {
                                    that.addPagView.close();
                                }
                                if (that.props.appStore.myPageStore.isLoaded === true) {
                                    // let bookInfoStore = that.props.appStore.bookInfoStore;
                                    BookCaseUtil.bookBagAction(that.props.data, that.props.appStore.myPageStore.userId, 1, (callBack) => {
                                        if (callBack && callBack.msgCode === 200) {
                                            that.props.appStore.bookInfoStore.isPagBook = true;
                                            Toast.message('加入书架成功', 'short', 'center');
                                        } else {
                                            Toast.message('加入书架失败', 'short', 'center');
                                        }
                                        if (that.props.navigation) {
                                            that.props.navigation.goBack();
                                        }
                                    })
                                } else {
                                    LoadPage.open(that.props.navigation);
                                }
                            }}
                            underlayColor={appTheme.greyBgColor}
                            style={{
                                height: Dpi.d(90),
                                width: AppUtils.size.width / 2,
                                backgroundColor: appTheme.hightLightColor,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    color: appTheme.mainColor,
                                    fontSize: Dpi.s(30)
                                }}
                            >确定</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            );
        }
        that.addPagView = Drawer.open(that.addBagView, 'bottom');
    }

    componentDidMount() {
        let that = this;
        BackHandler.addEventListener('hardwareBackPress', that.backHandler);
        let readPageStore = that.props.appStore.readPageStore;
        let readTheme = readPageStore.readTheme;
        autorun(() => {
            if (readPageStore.menuIsOpen === true) {
                that._startAnim(1);
            } else if (readPageStore.menuIsOpen === false) {
                that._startAnim(-1);
            }
        })
    }

    _startAnim(animType) {
        let that = this;
        if (that.firstMount === true) {//由于autorun第一次会运行，在这里规避，mobx其实还有一个第一次不运行的autorun方法，我暂时没找到，先用着吧
            if (animType && animType === -1) {
                Animated.timing( // 从时间范围映射到渐变的值。
                    that.state.viewY, {
                        toValue: Dpi.d(-157),
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


    _showPopu(itemData) {
        let appTheme = this.props.appStore.appTheme;
        let that = this;
        let view = (
            <View style={{ backgroundColor: appTheme.mainBgColor, height: Dpi.d(511) }}>

            </View>
        );
        that.catchViewKey = Drawer.open(view, 'bottom');
    }

    render() {
        let that = this;
        let appTheme = this.props.appStore.appTheme;
        let readPageStore = this.props.appStore.readPageStore;
        let bookCaseStore = this.props.appStore.bookCaseStore;
        let myPageStore = this.props.appStore.myPageStore;
        let readTheme = readPageStore.readTheme;
        return (
            <Animated.View
                style={{
                    transform: [
                        { translateY: that.state.viewY }, // x轴移动
                    ],
                    justifyContent: 'space-between',
                    backgroundColor: readTheme.mainBgColor,
                    width: AppUtils.size.width,
                    alignItems: 'center',
                    height: Dpi.d(157),
                    paddingHorizontal: Dpi.d(20),
                    position: 'absolute',
                }}>
                <View
                    style={{
                        justifyContent: 'space-between',
                        backgroundColor: readTheme.mainBgColor,
                        width: AppUtils.size.width,
                        alignItems: 'center',
                        height: Dpi.d(97),
                        paddingHorizontal: Dpi.d(20),
                        flexDirection: 'row'
                    }}
                >

                    <TouchableOpacity
                        onPress={() => {
                            let curTime = (new Date()).getTime();
                            if (curTime - that.lastTouchTime < 1000) {
                                return;
                            }
                            that.lastTouchTime = curTime;
                            if (myPageStore.isLoaded == true) {
                                if (that.props.appStore.bookInfoStore
                                    && that.props.appStore.bookInfoStore != null
                                    && that.props.appStore.bookInfoStore.bookId == that.props.data
                                    && that.props.appStore.bookInfoStore.isPagBook === false) {
                                    that._showAddPagPopu();
                                } else {
                                    if (bookCaseStore.checkIsPagBook(that.props.data) == true) {
                                        if (that.props.navigation) {
                                            that.props.navigation.goBack();
                                        }
                                    } else {
                                        that._showAddPagPopu();
                                    }
                                }
                            } else {
                                that._showAddPagPopu();
                            }
                        }}
                    >
                        <FastImage style={{ tintColor: readTheme.mainTextColor, marginHorizontal: Dpi.d(20), height: Dpi.d(39), width: Dpi.d(24), resizeMode: 'stretch' }} source={ImageResource.backIcon}></FastImage>
                    </TouchableOpacity>

                    <View
                        style={{
                            flex: 1,
                            marginHorizontal: Dpi.d(20)
                        }}
                    >
                        <Text numberOfLines={1} style={{ maxWidth: Dpi.d(450), color: readTheme.mainTextColor, fontSize: Dpi.s(30) }}>{readPageStore.readChapterName}</Text>
                    </View>

                    <TouchableOpacity
                        style={{ borderWidth: Dpi.d(1), borderColor: readTheme.mainTextColor, borderRadius: Dpi.d(5), paddingHorizontal: Dpi.d(10), paddingVertical: Dpi.d(6) }}
                        onPress={() => {
                            let curTime = (new Date()).getTime();
                            if (curTime - that.lastTouchTime < 1000) {
                                return;
                            }
                            that.lastTouchTime = curTime;
                            that._showErrorRecord();
                        }}
                    >
                        <Text style={{ backgroundColor: 'transparent', color: readTheme.mainTextColor, fontSize: Dpi.s(24) }}>报错</Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        padding: Dpi.d(7),
                        width: AppUtils.size.width,
                        height: Dpi.d(60),
                        alignItems: 'center',
                        backgroundColor: readTheme.stressColor,
                    }}
                >
                    <Text numberOfLines={1} style={{ color: readTheme.mainTextColor, fontSize: Dpi.s(27) }}>{readPageStore.readChapterUrl}</Text>
                </View>
            </Animated.View>
        );
    }
}

