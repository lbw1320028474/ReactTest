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
    ScrollView,
    Platform
} from 'react-native'
import { observable, autorun } from 'mobx'
import { observer, inject } from 'mobx-react/native';
import FastImage from '../../../../Components/react-native-fast-image'
import Dpi from '../../../../Utils/Dpi'
import AppUtils from '../../../../Utils/AppUtils'
import EventBus from '../../../../Utils/EventBus'
import Slider from '../../../../Components/react-native-slider';
import ImageResource from '../../../../../Resource/ImageResource'
import BGLight from '../../../../NativeModul/BGLight'
import ReadTheme from '../../Theme/ReadTheme'
import GlobleKey from '../../../../Globle/GlobleKey';
import Static from '../../Store/Static'
@inject('appStore')
@observer
export default class SettingView extends Component {
    @observable refreshing = false;
    @observable
    lightValue = 0;
    @observable
    textSizeValue = 20;
    constructor(props) {
        super(props);
        this.firstMount = false;        //第一次渲染
        this.state = {
            viewY: new Animated.Value(Dpi.d(500))
        }
        this._themeItemClick.bind(this)
    }

    componentDidMount() {
        let that = this;
        let readPageStore = that.props.appStore.readPageStore;
        let readTheme = readPageStore.readTheme;
        that.textSizeValue = readTheme.lineTextCount;
        autorun(() => {
            if (readPageStore.settingIsOpen === true) {
                that._startAnim(1);
            } else if (readPageStore.settingIsOpen === false) {
                that._startAnim(-1);
            }
        })
    }

    _startAnim(animType) {
        let that = this;
        if (that.firstMount === true) {//由于autorun第一次会运行，在这里规避，mobx其实还有一个第一次不运行的autorun方法，我暂时没找到，先用着吧
            if (animType === -1) {
                Animated.timing( // 从时间范围映射到渐变的值。
                    that.state.viewY, {
                        toValue: Dpi.d(500),
                        duration: 400,// 动画持续的时间（单位是毫秒），默认为500
                        // delay: 0,// 在一段时间之后开始动画（单位是毫秒），默认为0。
                        useNativeDriver: true, // <-- 加上这一行
                    }).start(() => {

                    });
            } else if (animType === 1) {
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

    // _renderBgView(item, index) {
    //     let that = this;
    //     let appTheme = this.props.appStore.appTheme;
    //     let readPageStore = this.props.appStore.readPageStore;
    //     let readTheme = readPageStore.readTheme;
    // }

    _themeItemClick(index) {
        let that = this;
        let readPageStore = that.props.appStore.readPageStore;
        let readTheme = readPageStore.readTheme;
        if (index == readTheme.themeType) {
            return;
        }
        EventBus.emit(GlobleKey.EVENT_BOOKREAD_RELOAD, { actionType: 4, bgType: index });
        // that.props.appStore.readPageStore.readTheme.setThemeType(index);
    }

    render() {
        let that = this;
        let appTheme = that.props.appStore.appTheme;
        let readPageStore = that.props.appStore.readPageStore;
        let readTheme = readPageStore.readTheme;
        let bgPreViews = ReadTheme.themes.map((item, index) => {
            return (
                <TouchableOpacity
                    onPress={() => {

                        that._themeItemClick(index);
                    }}
                >
                    <View
                        style={{
                            backgroundColor: item.readBgColor,
                            borderRadius: Dpi.d(8),
                            borderWidth: Dpi.d(3),
                            borderColor: (index === readTheme.themeType) ? readTheme.hightBgColor : readTheme.mainTextColor,
                            width: Dpi.d(100),
                            marginHorizontal: Dpi.d(10),
                            height: Dpi.d(60),
                        }}
                    ></View>
                </TouchableOpacity>
            )

        });
        return (
            <Animated.View
                style={{
                    transform: [
                        { translateY: that.state.viewY }, // x轴移动
                    ],
                    backgroundColor: readTheme.mainBgColor,
                    width: AppUtils.size.width,
                    position: 'absolute',
                    bottom: 0,
                    paddingHorizontal: Dpi.d(20),
                }}>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        height: Dpi.d(100),
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text style={{ color: readTheme.mainTextColor, fontSize: Dpi.s(28) }}>明暗</Text>
                    <FastImage
                        style={{
                            marginLeft: Dpi.d(30),
                            tintColor: readTheme.mainTextColor,
                            height: Dpi.d(50),
                            width: Dpi.d(50),
                            resizeMode: 'stretch'
                        }}
                        source={ImageResource.settingLightSmallIcon}
                    >
                    </FastImage>
                    <Slider
                        value={readTheme.bgLightRate}
                        minimumValue={0}
                        maximumValue={1}
                        onSlidingComplete={(value) => {
                            readTheme.setLightRate(value)
                        }}
                        onValueChange={(value) => {
                            if (Platform.OS === 'android') {
                                BGLight.setBGLigth(value);
                            } else if (Platform.OS === 'ios') {
                                BGLight.setBGLight(value);
                            }
                        }}
                        maximumTrackTintColor={readTheme.mainTextColor}
                        trackStyle={{ height: Dpi.d(5) }}
                        minimumTrackTintColor={readTheme.hightBgColor}
                        thumbTintColor={readTheme.hightBgColor}
                        style={{ flex: 1, marginHorizontal: Dpi.d(20) }}
                    >

                    </Slider>
                    <FastImage
                        style={{
                            marginRight: Dpi.d(30),
                            tintColor: readTheme.mainTextColor,
                            height: Dpi.d(50),
                            width: Dpi.d(50),
                            resizeMode: 'stretch'
                        }}
                        source={ImageResource.settingLightBigIcon}
                    >
                    </FastImage>
                    <TouchableOpacity
                        onPress={() => {
                            if (Platform.OS === 'android') {
                                BGLight.setBGLigth(Static.systemList);
                            } else if (Platform.OS === 'ios') {
                                BGLight.setBGLight(Static.systemList);
                            }
                            readTheme.bgLightRate = Static.systemList;
                        }}
                    >
                        <Text style={{ color: readTheme.mainTextColor, borderRadius: Dpi.d(5), padding: Dpi.d(5), fontSize: Dpi.s(28), borderColor: readTheme.mainTextColor, borderWidth: Dpi.d(1) }}>系统</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        height: Dpi.d(100),
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text style={{ color: readTheme.mainTextColor, fontSize: Dpi.s(28) }}>背景</Text>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        style={{ marginLeft: Dpi.d(30), flex: 1 }}
                    >
                        {
                            bgPreViews
                        }
                    </ScrollView>
                </View>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        height: Dpi.d(100),
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text style={{ color: readTheme.mainTextColor, fontSize: Dpi.s(28) }}>字体</Text>
                    <FastImage
                        style={{
                            marginLeft: Dpi.d(30),
                            tintColor: readTheme.mainTextColor,
                            height: Dpi.d(50),
                            width: Dpi.d(50),
                            resizeMode: 'stretch'
                        }}
                        source={ImageResource.settingTextToSmallIcon}
                    >
                    </FastImage>
                    <Slider
                        value={24 - readTheme.lineTextCount}
                        minimumValue={0}
                        maximumValue={8}
                        step={1}
                        onSlidingComplete={(value) => {
                            // readTheme.setLineTextCount(26 - value)
                            if (24 - value == readTheme.lineTextCount) {
                                return;
                            }
                            EventBus.emit(GlobleKey.EVENT_BOOKREAD_RELOAD, { actionType: 2, textCount: 24 - value });
                        }}
                        maximumTrackTintColor={readTheme.mainTextColor}
                        trackStyle={{ height: Dpi.d(5) }}
                        minimumTrackTintColor={readTheme.hightBgColor}
                        thumbTintColor={readTheme.hightBgColor}
                        style={{ flex: 1, marginHorizontal: Dpi.d(20) }}
                    >

                    </Slider>
                    <FastImage
                        style={{
                            marginRight: Dpi.d(30),
                            tintColor: readTheme.mainTextColor,
                            height: Dpi.d(50),
                            width: Dpi.d(50),
                            resizeMode: 'stretch'
                        }}
                        source={ImageResource.settingTextToBigIcon}
                    >
                    </FastImage>
                    <TouchableOpacity
                        onPress={() => {
                            if (readTheme.lineTextCount == 20) {
                                return;
                            }
                            EventBus.emit(GlobleKey.EVENT_BOOKREAD_RELOAD, { actionType: 2, textCount: 20 });
                        }}
                    >
                        <Text style={{ color: readTheme.mainTextColor, borderRadius: Dpi.d(5), padding: Dpi.d(5), fontSize: Dpi.s(28), borderColor: readTheme.mainTextColor, borderWidth: Dpi.d(1) }}>系统</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        height: Dpi.d(100),
                        flexDirection: 'row',
                    }}
                >
                    <Text style={{ color: readTheme.mainTextColor, fontSize: Dpi.s(28) }}>翻页</Text>
                    <View
                        style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginLeft: Dpi.d(30), }}
                    >
                        {/* <TouchableOpacity
                            onPress={() => {
                                readPageStore.scrollType = 0;
                            }}
                        >
                            <Text style={{ textAlign: 'center', color: (readPageStore.scrollType === 0) ? readTheme.hightTextColor : readTheme.mainTextColor, borderRadius: Dpi.d(5), padding: Dpi.d(10), fontSize: Dpi.s(28), borderColor: (readPageStore.scrollType === 0) ? readTheme.hightTextColor : readTheme.mainTextColor, borderWidth: Dpi.d(1) }}>无    </Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            onPress={() => {
                                if (readTheme.scrollType == 1) {
                                    return;
                                }
                                readTheme.setScrollType(1);
                                EventBus.emit(GlobleKey.EVENT_BOOKREAD_RELOAD, { actionType: 5, type: 1 });
                            }}
                        >
                            <Text style={{ textAlign: 'center', color: (readTheme.scrollType === 1) ? readTheme.hightTextColor : readTheme.mainTextColor, borderRadius: Dpi.d(5), padding: Dpi.d(10), fontSize: Dpi.s(28), borderColor: (readTheme.scrollType === 1) ? readTheme.hightTextColor : readTheme.mainTextColor, borderWidth: Dpi.d(1) }}>水平</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                if (readTheme.scrollType == 2) {
                                    return;
                                }
                                readTheme.setScrollType(2);
                                EventBus.emit(GlobleKey.EVENT_BOOKREAD_RELOAD, { actionType: 5, type: 2 });
                            }}
                        >
                            <Text style={{ textAlign: 'center', color: (readTheme.scrollType === 2) ? readTheme.hightTextColor : readTheme.mainTextColor, borderRadius: Dpi.d(5), padding: Dpi.d(10), fontSize: Dpi.s(28), borderColor: (readTheme.scrollType === 2) ? readTheme.hightTextColor : readTheme.mainTextColor, borderWidth: Dpi.d(1) }}>竖直</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        height: Dpi.d(100),
                        flexDirection: 'row',
                    }}
                >
                    <Text style={{ color: readTheme.mainTextColor, fontSize: Dpi.s(28) }}>间距</Text>
                    <View
                        style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginLeft: Dpi.d(30), }}
                    >
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onPress={() => {
                                if (readPageStore.lineHightType === 0) {
                                    return;
                                }
                                EventBus.emit(GlobleKey.EVENT_BOOKREAD_RELOAD, { actionType: 3, lineHightType: 0 });
                            }}
                        >
                            <FastImage
                                style={{
                                    marginRight: Dpi.d(30),
                                    tintColor: (readPageStore.lineHightType === 0) ? readTheme.hightTextColor : readTheme.mainTextColor,
                                    height: Dpi.d(70),
                                    width: Dpi.d(80),
                                    resizeMode: 'stretch'
                                }}
                                source={ImageResource.settingLineBigIcon}
                            >
                            </FastImage>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onPress={() => {
                                if (readPageStore.lineHightType === 1) {
                                    return;
                                }
                                EventBus.emit(GlobleKey.EVENT_BOOKREAD_RELOAD, { actionType: 3, lineHightType: 1 });
                            }}
                        >
                            <FastImage
                                style={{
                                    marginRight: Dpi.d(30),
                                    tintColor: (readPageStore.lineHightType === 1) ? readTheme.hightTextColor : readTheme.mainTextColor,
                                    height: Dpi.d(70),
                                    width: Dpi.d(80),
                                    resizeMode: 'stretch'
                                }}
                                source={ImageResource.settingLineMidIcon}
                            >
                            </FastImage>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onPress={() => {
                                if (readPageStore.lineHightType === 2) {
                                    return;
                                }
                                EventBus.emit(GlobleKey.EVENT_BOOKREAD_RELOAD, { actionType: 3, lineHightType: 2 });
                            }}
                        >
                            <FastImage
                                style={{
                                    marginRight: Dpi.d(30),
                                    tintColor: (readPageStore.lineHightType === 2) ? readTheme.hightTextColor : readTheme.mainTextColor,
                                    height: Dpi.d(70),
                                    width: Dpi.d(80),
                                    resizeMode: 'stretch'
                                }}
                                source={ImageResource.settingLineSmallIcon}
                            >
                            </FastImage>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        );
    }
}

