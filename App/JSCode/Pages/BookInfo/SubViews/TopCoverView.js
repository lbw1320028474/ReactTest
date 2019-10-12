/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, Image } from 'react-native'
import { observer, inject } from 'mobx-react/native';
import Dpi from '../../../Utils/Dpi'
import AppUtils from '../../../Utils/AppUtils'
import FastImage from '../../../Components/react-native-fast-image'
import ImageResource from '../../../../Resource/ImageResource'
@inject('appStore')
@observer
export default class BookInfoPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let that = this;
        that.desType = 5;
        let data = that.props.data;
        let bookInfo = that.props.appStore.bookInfoStore;
        let appTheme = that.props.appStore.appTheme;
        if (bookInfo) {
            let continueStr = (bookInfo.isContinue) ? '连载' : '完结';
            let chapterCount = ' | ' + bookInfo.chapterCount + '章';
            return (
                <View style={{ backgroundColor: appTheme.mainBgColor }}>
                    <View
                        style={{ position: 'absolute', width: AppUtils.size.width, height: Dpi.d(324) }}
                    >
                        <Image
                            style={{ position: 'absolute', width: AppUtils.size.width, height: Dpi.d(324) }}
                            blurRadius={Dpi.d(30)}
                            source={{ uri: bookInfo.bookCover }}
                        ></Image>
                        <View style={{ backgroundColor: '#00000020', position: 'absolute', width: AppUtils.size.width, height: Dpi.d(324) }}></View>
                        <FastImage
                            style={{ width: AppUtils.size.width, position: 'absolute', height: Dpi.d(53), resizeMode: FastImage.resizeMode.stretch, bottom: -1 }}
                            source={ImageResource.bookInfoBottomMark}
                        ></FastImage>
                    </View>
                    <View
                        style={{ marginTop: Dpi.d(173), marginHorizontal: Dpi.d(38), marginBottom: Dpi.d(38), flexDirection: 'row' }}
                    >
                        <View>
                            <FastImage
                                style={{ width: Dpi.d(164), height: Dpi.d(220), resizeMode: FastImage.resizeMode.stretch, bottom: -1, borderRadius: Dpi.d(7), borderWidth: Dpi.d(3), borderColor: appTheme.mainBgColor }}
                                source={{ uri: bookInfo.bookCover }}
                            ></FastImage>
                            <FastImage
                                style={{ width: Dpi.d(160), height: Dpi.d(20), resizeMode: FastImage.resizeMode.stretch, marginTop: Dpi.d(5) }}
                                source={ImageResource.bookInfoCoverShadow}
                            ></FastImage>
                        </View>
                        <View
                            style={{ justifyContent: 'space-between', width: Dpi.d(450), paddingHorizontal: Dpi.d(24), marginBottom: Dpi.d(20) }}
                        >
                            <Text numberOfLines={1} style={{ marginTop: Dpi.d(30), fontSize: Dpi.s(30), color: appTheme.mainColor, backgroundColor: 'transparent' }}>{bookInfo.bookName}</Text>
                            <View
                            >
                                <Text
                                    style={{ fontSize: Dpi.s(26), color: appTheme.hightLightColor }}
                                >{bookInfo.bookAuthor + ' | ' + bookInfo.bookCategory}</Text>
                                <Text
                                    style={{ fontSize: Dpi.s(26), color: appTheme.greyTextColor, marginTop: Dpi.d(13) }}
                                >{continueStr + chapterCount}</Text>
                            </View>
                        </View>
                    </View>
                    <Text
                        numberOfLines={5}
                        ref={ref => that.desRef = ref}
                        onPress={() => {

                            that.desType = (that.desType == 5) ? 50 : 5;
                            if (that.desType == 5) {
                                if (that.desOpenImgRef) {
                                    that.desOpenImgRef.setNativeProps({
                                        // transform: [{ rotateX: '0' }]
                                        opacity: 0
                                    })
                                }
                                if (that.desCloseImgRef) {
                                    that.desCloseImgRef.setNativeProps({
                                        // transform: [{ rotateX: '0' }]
                                        opacity: 1
                                    })
                                }
                            } else {
                                if (that.desOpenImgRef) {
                                    that.desOpenImgRef.setNativeProps({
                                        // transform: [{ rotateX: '0' }]
                                        opacity: 1
                                    })
                                }
                                if (that.desCloseImgRef) {
                                    that.desCloseImgRef.setNativeProps({
                                        // transform: [{ rotateX: '0' }]
                                        opacity: 0
                                    })
                                }
                            }
                            if (that.desRef) {
                                that.desRef.setNativeProps({
                                    numberOfLines: that.desType
                                })
                            }
                        }}
                        style={{
                            padding: Dpi.d(35),
                            paddingTop: 0,
                            lineHeight: Dpi.d(40),
                            fontSize: Dpi.s(30),
                            color: appTheme.greyTextColor
                        }}
                    >
                        {'    ' + bookInfo.bookDescripte}
                    </Text>
                    <Image
                        ref={ref => that.desOpenImgRef = ref}
                        source={ImageResource.des_open}
                        style={{
                            backgroundColor: '#ffffff',
                            resizeMode: 'stretch',
                            width: Dpi.d(32),
                            opacity: 0,
                            height: Dpi.d(16),
                            position: 'absolute',
                            bottom: Dpi.d(10),
                            right: Dpi.d(50)
                        }}
                    ></Image>
                    <Image
                        ref={ref => that.desCloseImgRef = ref}
                        source={ImageResource.des_close}
                        style={{
                            backgroundColor: '#ffffff',
                            width: Dpi.d(32),
                            resizeMode: 'stretch',
                            height: Dpi.d(16),
                            opacity: 1,
                            position: 'absolute',
                            bottom: Dpi.d(10),
                            right: Dpi.d(50)
                        }}
                    ></Image>
                </View>
            );
        } else {
            return (
                <View></View>
            )
        }
    }
}

