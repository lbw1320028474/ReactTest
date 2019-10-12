import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native';
import Dpi from '../../Utils/Dpi'
import GlobleKey from '../../Globle/GlobleKey'
import GlobleVar from '../../Globle/GlobleVar'
import AppUtils from '../../Utils/AppUtils'
import DeviceInfo from 'react-native-device-info'
import PushUtil from '../../Components/Umeng/PushUtil'
import { observer, inject } from 'mobx-react/native';
import GlobleUrl from '../../Globle/GlobleUrl'
import ActionBar from './ActionBar/ActionBar'
import ImageResource from '../../../Resource/ImageResource'
import { observable, autorun, transaction } from 'mobx';

@inject('appStore')
@observer
export default class AboutPage extends Component {
    constructor(props) {
        super(props);
        this.lastClickTime = 0;
        this.clickTimes = 0;
        this.state = {
            renderState: 0,
        };
    }

    // componentDidMount() {
    //     let that = this;
    //     // this.timer = setTimeout(function () {
    //     //     that.setState({ renderPlaceholderOnly: false });
    //     // }, 2000);
    //     // InteractionManager.runAfterInteractions(() => {
    //     //     that.setState({ renderState: 1 });
    //     // });
    // }



    static open(navigation) {
        if (navigation) {
            navigation.navigate('KEY_SceneAboutPage');
        }
    }

    // _renderView(that) {
    //     if (this.state.renderState) {

    //     }
    // }

    render() {
        let that = this;
        let appTheme = that.props.appStore.appTheme;
        return (
            <View style={{ flex: 1, backgroundColor: appTheme.greyBgColor }}>
                <ActionBar navigation={that.props.navigation}></ActionBar>
                <View style={{ flex: 1, alignItems: 'center', paddingTop: Dpi.d(50) }}>
                    <Image style={{ resizeMode: 'stretch', width: Dpi.d(100), height: Dpi.d(100) }} source={ImageResource.appIcon}></Image>
                    <Text style={{ color: appTheme.groupTitleTextColor, fontSize: Dpi.s(32), padding: Dpi.d(30), width: AppUtils.size.width, textAlign: 'center' }}>当前版本:{DeviceInfo.getVersion()}</Text>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            let curTime = new Date();
                            if (curTime - this.lastClickTime < 1000) {
                                this.clickTimes += 1;
                            } else {
                                this.clickTimes = 1;
                            }
                            if (this.clickTimes === 10) {
                                try {
                                    //下面的这些判断，按照规范来说不应该这样处理的，应该封装好而不是在这里做处理
                                    if (Platform.OS === 'android') {
                                        PushUtil.getDeviceToken((deviceToken) => {
                                            //console.log('deviceToken = ' + deviceToken)
                                            let isTest = (GlobleUrl.URL_BASE_URL.includes('http://charge.mo-sky.cn')) ? '测试环境' : '现网环境';
                                            alert('channel:' + GlobleVar.appChannelId + ', pluginVer:' + GlobleVar.jsBundleVersion + ', 环境：' + isTest + ', deviceToken:' + deviceToken);
                                        })
                                    } else if (Platform.OS === 'ios') {
                                        PushUtil.getDeviceToken((err, deviceToken) => {
                                            //console.log('deviceToken = ' + deviceToken)
                                            let isTest = (GlobleUrl.URL_BASE_URL.includes('http://charge.mo-sky.cn')) ? '测试环境' : '现网环境';
                                            alert('channel:' + GlobleVar.appChannelId + ', pluginVer:' + GlobleVar.jsBundleVersion + ', 环境：' + isTest + ', deviceToken:' + deviceToken);
                                        })
                                    }
                                    this.clickTimes = 0;
                                } catch (error) {

                                }

                            }
                            this.lastClickTime = curTime.getTime();
                        }}
                    >
                        <Text style={{
                            lineHeight: Dpi.d(50),
                            color: appTheme.groupTitleTextColor,
                            fontSize: Dpi.s(32),
                            marginHorizontal: Dpi.d(40),
                            padding: Dpi.d(30),

                            backgroundColor: appTheme.mainColor

                        }}>
                            {'        '}歪歪小说是一款专注于高品质免费小说的阅读软件，集合了在线阅读、自动书签、智能化推荐等服务，品质打造更新快速、阅读流畅、巨省流量的追书利器。小说与国内一线出版商合作，内有藏书百万册，涵盖所有分类，汇聚当下热门网络小说、畅销图书和漫画刊物，歪歪小说旨在为用户提供一个拥有正版、海量优质作品及阅读体验良好的移动阅读平台。
                        </Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
}



