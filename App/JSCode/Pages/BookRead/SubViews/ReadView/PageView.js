import React, { Component } from 'react';
import {
    Button,
    ScrollView,
    Text,
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    ImageBackground,
    Platform
} from 'react-native';
import AppUtils from '../../../../Utils/AppUtils'
import Dpi from '../../../../Utils/Dpi'
import EventBus from '../../../../Utils/EventBus'
import GlobleKey from '../../../../Globle/GlobleKey'
import CommunityPage from '../../../CommunityPage/CommunityPage'
import DeviceInfo from 'react-native-device-info'
import TextInfoStatic from './Utils/TextInfoStatic'
import ChapterPageManager from './Manager/ChapterPageManager'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react/native';
import ChapterChangType from './Utils/ChapterChangType';

@inject('appStore')
@observer
export default class PageView extends React.Component {
    constructor(props) {
        super(props);
        this.pressInX = 0;
        this.pressOutX = 0;
    }


    componentWillUnmount() {

    }

    render() {
        let that = this;
        let pageData = that.props.data;
        let appTheme = that.props.appStore.appTheme;
        let readPageStore = that.props.appStore.readPageStore;
        let readTheme = readPageStore.readTheme;
        let textCount = that.props.textCount;
        let lineheight = that.props.lineHeight;
        let textSize = that.props.textSize;
        let pageSize = 0;
        if (that.props.pageSize) {
            pageSize = that.props.pageSize;
        }

        if (pageData
            && pageData.lines
            && pageData.lines.length > 0) {
            let data = new Date();
            let textLines = [];
            let pageTextHeight = 0;
            textLines = pageData.lines.map((item, index) => {
                if (pageData.pageType === 2 || pageData.pageType === 3) {
                    pageTextHeight = pageTextHeight + lineheight;
                }
                if (item.lineType === 1) {//中间行
                    return (
                        <View key={index} style={{ alignItems: 'center' }}>
                            <Text style={{ backgroundColor: 'transparent', transform: [{ scaleX: item.lineScale }], height: lineheight, color: readTheme.readTextColor, fontSize: textSize }}>{item.lineContent}</Text>
                        </View>
                    )
                } else if (item.lineType === 0) { //第一行
                    return (
                        <View key={index} style={{ alignItems: 'center' }}>
                            <Text style={{ backgroundColor: 'transparent', transform: [{ scaleX: item.lineScale }], height: lineheight, color: readTheme.readTextColor, fontSize: textSize, marginLeft: (TextInfoStatic.textInfo.zhongwenWidth * 2) }}>{item.lineContent}</Text>
                        </View>
                    )
                } else if (item.lineType === 2) {       //第一行也是最后一行
                    return (
                        <View key={index}>
                            <Text style={{ backgroundColor: 'transparent', transform: [{ scaleX: item.lineScale }], height: (lineheight * 1.3), color: readTheme.readTextColor, fontSize: textSize }}>{item.lineContent}</Text>
                        </View >
                    )
                } else {        //
                    return (
                        <View key={index} >
                            <Text style={{ backgroundColor: 'transparent', transform: [{ scaleX: item.lineScale }], height: (lineheight * 1.3), color: readTheme.readTextColor, fontSize: textSize, marginLeft: (TextInfoStatic.textInfo.zhongwenWidth * 2) }}>{item.lineContent}</Text>
                        </View>
                    )
                }
            })
            if ((pageTextHeight < AppUtils.size.height - Dpi.d(400)) && (pageData.pageType === 2 || pageData.pageType === 3)) {
                textLines.push(
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            CommunityPage.open(that.props.navigation);
                        }}
                        key={textLines.length} style={{ alignItems: 'center' }}>
                        <Text style={{ alignSelf: 'center', textAlign: 'center', backgroundColor: 'transparent', height: lineheight, color: '#1C66FD', fontSize: Dpi.s(26) }}>关注歪歪免费小说公众号，获得最新消息></Text>
                    </TouchableOpacity>
                )
            }
            let chapterName = pageData.chapterName;
            return (
                <View key={pageData.pageIndex} style={{ flex: 1, overflow: 'hidden' }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPressIn={(event) => {
                            if (event && event.nativeEvent && event.nativeEvent.pageX >= 0) {
                                that.pressInX = event.nativeEvent.pageX;
                            }
                        }}
                        onPressOut={(event) => {
                            if (event && event.nativeEvent && event.nativeEvent.pageX >= 0) {
                                that.pressOutX = event.nativeEvent.pageX;
                                ChapterChangType.scrollDistance = that.pressOutX - that.pressInX;
                            }
                        }}
                        onPress={(event) => {


                            let x = event.nativeEvent.pageX;
                            let y = event.nativeEvent.pageY;
                            if (that.props.appStore.readPageStore.menuIsOpen === true || that.props.appStore.readPageStore.settingIsOpen === true) {
                                that.props.appStore.readPageStore.menuIsOpen = false;
                                that.props.appStore.readPageStore.settingIsOpen = false
                            } else if (x > AppUtils.size.width / 3 * 2 || y > AppUtils.size.height / 5 * 4) {
                                EventBus.emit(GlobleKey.EVENT_CLICK_TO_CHANGEPAGE, 1)
                                // alert('下一页')
                            } else if (x < AppUtils.size.width / 3) {
                                // alert('上一页')
                                EventBus.emit(GlobleKey.EVENT_CLICK_TO_CHANGEPAGE, -1)
                            } else {
                                if (that.props.appStore.readPageStore.settingIsOpen === true) {
                                    that.props.appStore.readPageStore.settingIsOpen = false;
                                } else {
                                    that.props.appStore.readPageStore.menuIsOpen = !(that.props.appStore.readPageStore.menuIsOpen);
                                }
                            }
                        }}
                    >
                        <ImageBackground
                            resizeMode='stretch'
                            source={readTheme.bgImage}
                            style={[(textLines && textLines.length === 1) ?
                                viewStyle.readPageRootStyleOnleOneLine
                                : viewStyle.readPageRootStyle,
                            {
                                backgroundColor: (readTheme.bgIsImage === false) ?
                                    readTheme.readBgColor
                                    : 'transparent'
                            }]}>
                            <View style={viewStyle.lineTextContainerStyle}>
                                <View style={{ flexDirection: 'row', height: lineheight, alignItems: 'center' }}>
                                    <Text style={{ backgroundColor: 'transparent', opacity: 0.7, fontSize: (textSize * 0.7), color: readTheme.readTextColor }}>{chapterName}</Text>
                                </View>
                                {
                                    (pageData.pageIndex === 1) ? (
                                        <View style={{ alignItems: 'center', width: AppUtils.size.width - TextInfoStatic.textInfo.zhongwenWidth * 2, justifyContent: 'center', height: lineheight * 3, }}>
                                            <Text style={{ backgroundColor: 'transparent', fontSize: textSize * 1.2, color: readTheme.readTextColor }}>{chapterName}</Text>
                                            {/* <View style={{ opacity: 0.7, width: AppUtils.size.width - TextInfoStatic.textInfo.zhongwenWidth * 2, backgroundColor: ReadPageThemes.readPageTextColor, height: AppUtils.pixel }}></View> */}
                                        </View>
                                    ) : null
                                }
                                {textLines}
                            </View>

                            <View style={{ position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', left: 0, bottom: 0, width: AppUtils.size.width, flexDirection: 'row', paddingHorizontal: Dpi.d(15), height: lineheight, alignItems: 'center' }}>
                                <Text style={{ backgroundColor: 'transparent', opacity: 0.7, fontSize: (textSize * 0.7), color: readTheme.readTextColor }}>第{pageData.pageIndex}页</Text>
                                {/* <Text style={{ backgroundColor: 'transparent', opacity: 0.7, fontSize: (textSize * 0.7), color: readTheme.readTextColor }}>{data.getHours()}:{data.getMinutes()}</Text> */}
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </View >
            )
        } else {
            return (
                <View>
                </View>
            )
        }
    }
}

var viewStyle = StyleSheet.create({
    readPageRootStyleOnleOneLine: {
        backgroundColor: 'transparent',
        paddingHorizontal: Dpi.d(15),
        width: AppUtils.size.width,
        height: AppUtils.size.height
    },
    readPageRootStyle: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        width: AppUtils.size.width,
        height: AppUtils.size.height
    },
    lineTextContainerStyle: {
    },
})

