/**
 * Created by Rabbit 下午6:40
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    ListView,
    ScrollView
} from 'react-native';
import Dpi from '../../Utils/Dpi'
import FastImage from '../../Components/react-native-fast-image'
import { observer, inject } from 'mobx-react/native';
import GlobleVar from '../../Globle/GlobleVar'
import AppUtils from '../../Utils/AppUtils'
import { LargeList } from '../../Components/react-native-largelist'
import ActionBar from './ActionBar/ActionBar'
import ImageResource from '../../../Resource/ImageResource';
import { observable } from 'mobx';
import Button from '../../Components/teaset/components/Button/Button'
import Toast from '../../Components/teaset/components/Toast/Toast'
import Overlay from '../../Components/teaset/components/Overlay/Overlay'
import CatchSqlLiteUtil from '../../Catch/CatchSqlLiteUtil'
import CatchUtil from '../../Catch/CatchUtil'
import LoadPage from '../Load/LoadPage'
import WebViewPage from '../WebPage/WebViewPage'
import MyText from '../../Components/MyText'
import AboutPage from '../AboutWe/AboutPage';
import ReadLogPage from '../ReadLogPage/ReadLogPage';
import PowerPage from '../PowerPage/PowerPage';
import RecordUtil from '../../Record/RecordUtil'
import RecordVar from '../../Record/RecordVar'
import CatchDataManager from '../../Catch/CatchDataManager'
import EventBus from '../../Utils/EventBus';
import StringUtil from '../../Utils/StringUtil'
import GlobleKey from '../../Globle/GlobleKey';
@inject('appStore')
@observer
export default class MyPage extends Component {
    constructor(props) {
        super(props);
        // this._bookMenuItemClick.bind(this);
        this.overlayViewKey;
        this.textRef;
    }

    componentDidMount() {
        RecordUtil.showRecord('null', RecordVar.show_room_me, (new Date()).getTime());
        let that = this;
        CatchSqlLiteUtil.queryCatchSize((msgCode, data) => {
            if (msgCode === 200 && data) {
                if (that.textRef) {
                    that.textRef.setText((data * 0.005).toFixed(3) + ' M');
                }
            } else {
                if (that.textRef) {
                    that.textRef.setText('0 M');
                }
            }
        })
    }

    static open(navigation) {
        if (navigation) {
            navigation.navigate('KEY_SceneMyPage');
        } else {
            alert('打开失败，参数错误,navigation = null')
        }
    }

    _showCleanDialog() {
        let that = this;
        let appTheme = this.props.appStore.appTheme;
        let overlayView = (
            <Overlay.View
                style={{ alignItems: 'center', justifyContent: 'center' }}
                modal={false}
                overlayOpacity={0.5}
                ref={v => this.overlayView = v}
            >
                <View style={{ backgroundColor: appTheme.mainBgColor, borderRadius: Dpi.d(20), }}>
                    <View>
                        <Text style={{ textAlign: 'center', marginVertical: Dpi.d(66), marginHorizontal: Dpi.d(75), fontSize: Dpi.s(28), color: appTheme.groupTitleTextColor }}>确定要清理缓存吗?该操作会清理{'\n'}掉之前缓存的所有章节内容</Text>
                    </View>
                    <View
                        style={{ borderTopColor: '#dedfe0', borderTopWidth: AppUtils.pixel, flexDirection: 'row', justifyContent: 'space-around', }}
                    >
                        <TouchableHighlight
                            underlayColor={appTheme.greyBgColor}
                            style={{
                                flex: 1,
                                borderRightWidth: AppUtils.pixel,
                                borderRightColor: '#dedfe0',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onPress={() => {
                                Overlay.hide(that.overlayViewKey);
                            }}
                        >
                            <Text style={{ margin: Dpi.d(19), color: appTheme.groupTitleTextColor, fontSize: Dpi.d(30) }}>取消</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={appTheme.greyBgColor}
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onPress={() => {
                                Overlay.hide(that.overlayViewKey);
                                if (CatchDataManager.allCatchQueue && CatchDataManager.allCatchQueue.size > 0) {
                                    CatchDataManager.allCatchMap.clear();
                                    CatchDataManager.allCatchQueue.clear();
                                    EventBus.emit(GlobleKey.EVENT_CATCH_CHANGED);
                                }
                                CatchSqlLiteUtil.cleanCatch((msgCode, data) => {
                                    if (msgCode === 200) {
                                        Toast.message('清理成功');
                                        if (that.textRef) {
                                            that.textRef.setText('0 M')
                                        }

                                        let chapterListStore = that.props.appStore.chapterListStore;
                                        try {
                                            if (chapterListStore && chapterListStore.chapterList.length > 0) {
                                                for (let i = 0; i < chapterListStore.chapterList.length; ++i) {
                                                    if (chapterListStore.chapterList[i].catchState == 2) {
                                                        chapterListStore.chapterList[i].catchState = 0;
                                                    }

                                                }
                                                // alert('清理完成' + chapterListStore.chapterList.length)
                                            }
                                        } catch (error) {
                                            // alert('报错' + error)
                                        }


                                    } else {
                                        Toast.message('清理失败');
                                    }
                                })
                            }}
                        >
                            <Text style={{ margin: Dpi.d(19), color: appTheme.hightLightTextColor, fontSize: Dpi.d(30) }}>确认</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Overlay.View >
        );
        that.overlayViewKey = Overlay.show(overlayView);
    }


    _renderItem(itemData, that, itemKey) {
        return (
            <BookMenuItem navigation={this.props.navigation} key={itemKey} data={itemData}></BookMenuItem>
        )
    }

    render() {//
        let that = this;
        let appTheme = this.props.appStore.appTheme;
        let myPageStore = this.props.appStore.myPageStore;
        let readLogStore = this.props.appStore.readLogStore;
        return (
            <View style={{ flex: 1, backgroundColor: appTheme.greyBgColor }}>
                <ActionBar navigation={this.props.navigation}></ActionBar>
                <ScrollView
                    style={{ flex: 1 }}
                >
                    <TouchableOpacity
                        activeOpacity={(myPageStore.isLoaded) ? 1 : 0.7}
                        style={{ marginBottom: Dpi.d(20), backgroundColor: appTheme.mainBgColor, justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: Dpi.d(31), paddingVertical: Dpi.d(51), alignItems: 'center' }}
                        onPress={() => {
                            //alert('登录')
                            if (myPageStore.isLoaded) {
                                return;
                            }
                            LoadPage.open(that.props.navigation);
                        }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View
                                style={{
                                    width: Dpi.d(90),
                                    height: Dpi.d(90),

                                }}
                            >
                                <FastImage source={(myPageStore.isLoaded) ? myPageStore.userCover : ImageResource.myPageNoloadedCover} style={{ width: Dpi.d(90), height: Dpi.d(90), resizeMode: FastImage.resizeMode.stretch }}></FastImage>
                                <FastImage source={ImageResource.cicleMark} style={{ position: 'absolute', width: Dpi.d(90), height: Dpi.d(90), resizeMode: 'stretch', tintColor: appTheme.mainColor }}></FastImage>
                            </View>
                            <Text style={{ marginLeft: Dpi.d(27), fontSize: Dpi.s(40), color: appTheme.hightLightTextColor }}>{(myPageStore.isLoaded) ? myPageStore.userName : '登录 / 注册'}</Text>

                        </View>

                        {
                            (myPageStore.isLoaded) ?
                                <View></View>
                                : <FastImage style={{ tintColor: appTheme.lowGreyTextColor, marginLeft: Dpi.d(20), height: Dpi.d(34), width: Dpi.d(20), resizeMode: 'stretch' }} source={ImageResource.myToNextIcon}></FastImage>
                        }
                    </TouchableOpacity>

                    <View
                        style={{
                            backgroundColor: appTheme.mainBgColor,
                        }}
                    >
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: Dpi.d(31), paddingVertical: Dpi.d(40), alignItems: 'center' }}
                            onPress={() => {
                                ReadLogPage.open(that.props.navigation)
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <FastImage source={ImageResource.read_log_icon} style={{ width: Dpi.d(50), height: Dpi.d(50), resizeMode: 'stretch' }}></FastImage>
                                <Text style={{ marginLeft: Dpi.d(27), fontSize: Dpi.s(30), color: appTheme.groupTitleTextColor }}>阅读历史</Text>
                            </View>
                            <FastImage style={{ tintColor: appTheme.lowGreyTextColor, marginLeft: Dpi.d(20), height: Dpi.d(34), width: Dpi.d(20), resizeMode: 'stretch' }} source={ImageResource.myToNextIcon}></FastImage>
                        </TouchableOpacity>
                        <View
                            style={{ opacity: 0.5, height: AppUtils.pixel, backgroundColor: appTheme.lowGreyTextColor, marginLeft: Dpi.d(100) }}
                        ></View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: Dpi.d(31), paddingVertical: Dpi.d(40), alignItems: 'center' }}
                            onPress={() => {
                                AboutPage.open(that.props.navigation)
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <FastImage source={ImageResource.aboutWeIcon} style={{ width: Dpi.d(50), height: Dpi.d(50), resizeMode: 'stretch' }}></FastImage>
                                <Text style={{ marginLeft: Dpi.d(27), fontSize: Dpi.s(30), color: appTheme.groupTitleTextColor }}>关于我们</Text>
                            </View>
                            <FastImage style={{ tintColor: appTheme.lowGreyTextColor, marginLeft: Dpi.d(20), height: Dpi.d(34), width: Dpi.d(20), resizeMode: 'stretch' }} source={ImageResource.myToNextIcon}></FastImage>
                        </TouchableOpacity>
                        <View
                            style={{ opacity: 0.5, height: AppUtils.pixel, backgroundColor: appTheme.lowGreyTextColor, marginLeft: Dpi.d(100) }}
                        ></View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: Dpi.d(31), paddingVertical: Dpi.d(40), alignItems: 'center' }}
                            onPress={() => {
                                if (myPageStore.isLoaded && myPageStore.userId) {
                                    let nickName = myPageStore.userName;
                                    if (StringUtil.checkMobile(nickName)) {
                                        nickName = nickName.substring(0, 3) + '****' + nickName.substring(7, nickName.length);
                                    }
                                    let avatar = '';
                                    if (myPageStore.loadType === 0) {
                                        avatar = 'https://imgt.388g.com/jzd/201711/151145232371451.jpeg';
                                    } else {
                                        avatar = myPageStore.userCover.uri;
                                    }
                                    let openid = myPageStore.userId;

                                    WebViewPage.open(that.props.navigation, 'https://support.qq.com/product/23634', '吐个槽', 'nickname=' + nickName + '&avatar=' + avatar + "&openid=" + 'skyid' + openid);
                                } else {
                                    WebViewPage.open(that.props.navigation, 'https://support.qq.com/product/23634', '吐个槽');
                                }
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <FastImage source={ImageResource.feedbackIcon} style={{ width: Dpi.d(50), height: Dpi.d(50), resizeMode: 'stretch' }}></FastImage>
                                <Text style={{ marginLeft: Dpi.d(27), fontSize: Dpi.s(30), color: appTheme.groupTitleTextColor }}>反馈意见</Text>
                            </View>
                            <FastImage style={{ tintColor: appTheme.lowGreyTextColor, marginLeft: Dpi.d(20), height: Dpi.d(34), width: Dpi.d(20), resizeMode: 'stretch' }} source={ImageResource.myToNextIcon}></FastImage>
                        </TouchableOpacity>
                        <View

                            style={{ opacity: 0.5, height: AppUtils.pixel, backgroundColor: appTheme.lowGreyTextColor, marginLeft: Dpi.d(100) }}
                        ></View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: Dpi.d(31), paddingVertical: Dpi.d(40), alignItems: 'center' }}
                            onPress={() => {
                                that._showCleanDialog();
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <FastImage source={ImageResource.cleanCatchIcon} style={{ width: Dpi.d(50), height: Dpi.d(50), resizeMode: 'stretch' }}></FastImage>
                                <Text style={{ marginLeft: Dpi.d(27), fontSize: Dpi.s(30), color: appTheme.groupTitleTextColor }}>清理缓存</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MyText ref={ref => that.textRef = ref} text={'0 M'} style={{ marginLeft: Dpi.d(27), fontSize: Dpi.s(28), color: appTheme.lowGreyTextColor }}></MyText>
                                <FastImage style={{ tintColor: appTheme.lowGreyTextColor, marginLeft: Dpi.d(20), height: Dpi.d(34), width: Dpi.d(20), resizeMode: 'stretch' }} source={ImageResource.myToNextIcon}></FastImage>
                            </View>
                        </TouchableOpacity>
                        <View
                            style={{ opacity: 0.5, height: AppUtils.pixel, backgroundColor: appTheme.lowGreyTextColor, marginLeft: Dpi.d(100) }}
                        ></View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: Dpi.d(31), paddingVertical: Dpi.d(40), alignItems: 'center' }}
                            onPress={() => {
                                PowerPage.open(that.props.navigation)
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <FastImage source={ImageResource.powerIcon} style={{ width: Dpi.d(50), height: Dpi.d(50), resizeMode: 'stretch' }}></FastImage>
                                <Text style={{ marginLeft: Dpi.d(27), fontSize: Dpi.s(30), color: appTheme.groupTitleTextColor }}>版权声明</Text>
                            </View>
                            <FastImage style={{ tintColor: appTheme.lowGreyTextColor, marginLeft: Dpi.d(20), height: Dpi.d(34), width: Dpi.d(20), resizeMode: 'stretch' }} source={ImageResource.myToNextIcon}></FastImage>
                        </TouchableOpacity>

                    </View>
                    {
                        (myPageStore.isLoaded) ?
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={{ borderRadius: Dpi.d(10), backgroundColor: appTheme.hightLightColor, height: Dpi.d(70), alignItems: 'center', justifyContent: 'center', marginTop: Dpi.d(100), marginHorizontal: Dpi.d(71) }}
                                onPress={() => {
                                    try {
                                        readLogStore.resetIsPag(null);
                                    } catch (error) {
                                        console.log("在我的页面重置阅读记录是否在书架的数据异常" + error);
                                    }
                                    myPageStore.cleanLoad();
                                }}
                            >
                                <Text style={{ marginLeft: Dpi.d(27), fontSize: Dpi.s(30), color: appTheme.mainBgColor }}>退出登录</Text>
                            </TouchableOpacity> :
                            null
                    }

                </ScrollView>
            </View >
        );
    }
}
