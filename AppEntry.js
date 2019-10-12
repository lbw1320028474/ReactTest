/**
 * React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    Platform,
    TouchableOpacity
} from 'react-native'
import { Provider } from 'mobx-react/native'
import AppStore from './App/JSCode/AppStore/AppStore'
import AppRouter from './App/JSCode/AppRouter/AppRouter'
import SplashScreen from 'react-native-smart-splash-screen'
import Dpi from './App/JSCode/Utils/Dpi'
import DateUtil from './App/JSCode/Utils/DateUtil'
import UMShare from './App/JSCode/Components/react-native-puti-umeng-share'
import MySorage from './App/JSCode/Utils/MyStore/MySorage'
import CatchSqlLiteUtil from './App/JSCode/Catch/CatchSqlLiteUtil'
import AppUseLog from './App/JSCode/Globle/AppUseLog'
import GiveStar from './App/JSCode/NativeModul/GiveStar'
import EventBus from './App/JSCode/Utils/EventBus'
import AdState from './App/JSCode/NativeModul/AdState'
import GlobleKey from './App/JSCode/Globle/GlobleKey';
import RecordUtil from './App/JSCode/Record/RecordUtil'
// import ShowRecord from './App/JSCode/Record/ShowRecord'
// import ClickRecord from './App/JSCode/Record/ClickRecord'
import RecordVar from './App/JSCode/Record/RecordVar'
import MyDeviceInfo from './App/JSCode/NativeModul/MyDeviceInfo/MyDeviceInfo'
import DeviceInfoStatic from './App/JSCode/NativeModul/MyDeviceInfo/DeviceInfoStatic'
import NetInfoUtils from './App/JSCode/Network/NetInfoUtils'
import RecordManager from './App/JSCode/Record/RecordManager'
import Overlay from './App/JSCode/Components/teaset/components/Overlay/Overlay'
import AppUseBean from './App/JSCode/Globle/AppUseBean';

/**
 * 这里是日志开关，true表示不需要要日志输出，false表示需要日志
 */
// if (true) {
//     global.console = {
//         info: () => {
//         },
//         log: () => {
//         },
//         warn: () => {
//         },
//         error: () => {
//         },
//     };
// }


export default class App extends Component {
    constructor(props) {
        super(props);
        MySorage._getStorage();
        this.appStore = new AppStore();
        this._initApp();
        CatchSqlLiteUtil.open();
        this.shareTimer;
        this.giveStarTimer;
        let that = this;
        this.showShareDialog = () => {
            // alert("收到分享事件");
            if (AppUseLog.useBean && AppUseLog.useBean.isShareded == 1) {
                // alert("已经分享过");
                return;data
            } else {
                if (that._shareIsUserThreeDays() == true) {
                    // alert("连续三天，开始分享");
                    that._showShareDialog();
                } else {
                    // alert("非连续三天");
                }
            }
        };
        this.showStarDialog = () => {
            // alert("收到评星事件");
            if (AppUseLog.starUseBean && AppUseLog.starUseBean.isGiveStar == 1) {
                return;
            } else {
                if (that._shareIsUserThreeDays() == true) {
                    that._showGiveStarDialog();
                }
            }
        };

    }

    _initApp() {
        let that = this;
        that._initDeviceInfo();
        that._initUserLoadData();
        that._initReadTheme();
        that._initUmSdk();
        NetInfoUtils.addNetworkStateEvent();
        that._initOther();
        that._share();
        that._giveStar();
    }

    _giveStar() {
        let that = this;
        MySorage.loadByDefault(GlobleKey.KeyGiveStar, -1, (data) => {
            if (data !== -1) {
                AppUseLog.starUseBean = data;
            }
            console.log("AppUseLog.useBean1 = " + AppUseLog.starUseBean);
            if (AppUseLog.starUseBean && AppUseLog.starUseBean.userLog) {

            } else {
                AppUseLog.starUseBean = new AppUseBean();
                AppUseLog.starUseBean.userLog = [];
            }
            console.log("AppUseLog.useBean2 = " + AppUseLog.starUseBean);
            if (AppUseLog.starUseBean.isGiveStar == 1) {
                return;
            }
            let isAdded = false;
            let currentDate = DateUtil.format('yyyy-MM-dd') + '';
            for (let i = 0; i < AppUseLog.starUseBean.userLog.length; ++i) {
                if (AppUseLog.starUseBean.userLog[i] == currentDate) {
                    isAdded = true;
                    break;
                }
            }
            if (isAdded == false) {
                AppUseLog.starUseBean.userLog.push(currentDate);
            }
            if (AppUseLog.starUseBean.userLog.length > 3) {
                AppUseLog.starUseBean.userLog.shift();
            }
            // alert(JSON.stringify(AppUseLog.starUseBean))
            console.log("AppUseLog.useBean3 = " + JSON.stringify(AppUseLog.starUseBean));
            MySorage._sava(GlobleKey.KeyGiveStar, AppUseLog.starUseBean);

            if (that._starIsUserThreeDays() == true) {
                // that._showGiveStarDialog();
                // alert('开评论计时计时');
                that._startGiveStarTimer();
            }
        })
    }


    _share() {
        let that = this;
        MySorage.loadByDefault(GlobleKey.KeyAppUseLog, -1, (data) => {
            if (data !== -1) {
                AppUseLog.useBean = data;
            }
            console.log("AppUseLog.useBean1 = " + AppUseLog.useBean);
            if (AppUseLog.useBean && AppUseLog.useBean.userLog) {

            } else {
                AppUseLog.useBean = new AppUseBean();
                AppUseLog.useBean.userLog = [];
            }
            console.log("AppUseLog.useBean2 = " + AppUseLog.useBean);
            if (AppUseLog.useBean.isShareded == 1) {
                return;
            }
            let isAdded = false;
            let currentDate = DateUtil.format('yyyy-MM-dd') + '';
            for (let i = 0; i < AppUseLog.useBean.userLog.length; ++i) {
                if (AppUseLog.useBean.userLog[i] == currentDate) {
                    isAdded = true;
                    break;
                }
            }
            if (isAdded == false) {
                AppUseLog.useBean.userLog.push(currentDate);
            }
            if (AppUseLog.useBean.userLog.length > 3) {
                AppUseLog.useBean.userLog.shift();
            }
            // alert(JSON.stringify(AppUseLog.useBean))

            console.log("AppUseLog.useBean3 = " + JSON.stringify(AppUseLog.useBean));
            MySorage._sava(GlobleKey.KeyAppUseLog, AppUseLog.useBean);

            if (that._shareIsUserThreeDays() == true) {
                // that._showShareDialog();
                // alert('开始分享计时');
                that._startShartTimer();
            }
        })
    }

    _startGiveStarTimer() {
        let that = this;
        console.log("启动评分弹窗计时器，计时时间：5分钟");
        that.giveStarTimer = setTimeout(() => {
            if (that.giveStarViewKey && that.giveStarViewKey != null) {
            } else {
                that._showGiveStarDialog();
            }
            // if (that.giveStarTimer && that.giveStarTimer != null) {
            //     clearTimeout(that.giveStarTimer);
            // }
        }, 300000);
    }
    _startShartTimer() {
        let that = this;
        console.log("启动强制分享弹窗计时器，计时时间：5分钟");
        that.shareTimer = setTimeout(() => {
            if (that.overlayViewKey && that.giveStarViewKey != null) {
            } else {
                that._showShareDialog();
            }
            // if (that.shareTimer && that.shareTimer != null) {
            //     clearTimeout(that.shareTimer);
            // }
        }, 480000);
    }
    /**
     * 分享弹窗，判断是否连续使用了三天
     */
    _shareIsUserThreeDays() {
        // return true;
        if (AppUseLog.useBean && AppUseLog.useBean.userLog.length >= 3) {
            // if (AppUseLog.useBean.userLog[0] == DateUtil.dateAdd(AppUseLog.useBean.userLog[1], -1)
            //     && AppUseLog.useBean.userLog[1] == DateUtil.dateAdd(AppUseLog.useBean.userLog[2], -1)) {
            return true;
            // } else {
            //     return false;
            // }
        } else {
            return false;
        }
    }
    /**
     * 评星，判断是否连续使用了三天
     */
    _starIsUserThreeDays() {
        // return true;
        if (AppUseLog.starUseBean && AppUseLog.starUseBean.userLog.length >= 3) {
            // if (AppUseLog.starUseBean.userLog[0] == DateUtil.dateAdd(AppUseLog.starUseBean.userLog[1], -1)
            //     && AppUseLog.starUseBean.userLog[1] == DateUtil.dateAdd(AppUseLog.starUseBean.userLog[2], -1)) {
            return true;
            // } else {
            //     return false;
            // }
        } else {
            return false;
        }
    }

    _initOther() {
        RecordManager.getInstance();
    }


    _showGiveStarDialog(catchSize = 1) {
        // alert(DateUtil.format('yyyy-MM-dd'))
        let that = this;
        if (that.giveStarTimer && that.giveStarTimer != null) {
            clearTimeout(that.giveStarTimer);
        }
        if (AppUseLog.isGiviStart == false) {
            AppUseLog.isGiviStart = true;
        } else {
            return;
        }
        let appTheme = this.appStore.appTheme;
        RecordUtil.showRecord('null', RecordVar.show_givestar_dialog, (new Date()).getTime());
        let overlayView = (
            <Overlay.View
                style={{ alignItems: 'center', justifyContent: 'center' }}
                modal={true}
                overlayOpacity={0.4}
                ref={ref => this.overlayView = ref}
            >
                <View style={{ backgroundColor: appTheme.mainBgColor, borderRadius: Dpi.d(20), }}>
                    <View>
                        <Text style={{ marginVertical: Dpi.d(50), marginHorizontal: Dpi.d(50), fontSize: Dpi.s(28), color: appTheme.groupTitleTextColor }}>去好评，给开发小哥们加{'\n'}油鼓气！</Text>
                    </View>
                    <View
                        style={{ borderTopColor: appTheme.lowGreyTextColor, borderTopWidth: Dpi.d(1), alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                RecordUtil.clickRecord('null', RecordVar.click_givestar_yes, (new Date()).getTime());
                                AppUseLog.starUseBean.isGiveStar = 1;
                                MySorage._sava(GlobleKey.KeyGiveStar, AppUseLog.starUseBean);
                                Overlay.hide(that.giveStarViewKey);
                                that.giveStarViewKey = null;
                                // if (that.giveStarTimer) {
                                //     clearInterval(that.giveStarTimer);
                                // }
                                GiveStar.openStar();
                            }}
                        >
                            <Text style={{ fontWeight: 'bold', margin: Dpi.d(30), color: appTheme.hightLightTextColor, fontSize: Dpi.d(30) }}>好评</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                RecordUtil.clickRecord('null', RecordVar.click_givestar_no, (new Date()).getTime());
                                Overlay.hide(that.giveStarViewKey);
                                that.giveStarViewKey = null;
                            }}
                        >
                            <Text style={{ margin: Dpi.d(30), color: appTheme.hightLightTextColor, fontSize: Dpi.d(30) }}>残忍拒绝</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Overlay.View >
        );
        that.giveStarViewKey = Overlay.show(overlayView);
    }

    _showShareDialog(catchSize = 1) {
        // alert(DateUtil.format('yyyy-MM-dd'))
        let that = this;
        if (that.shareTimer && that.shareTimer != null) {
            clearTimeout(that.shareTimer);
        }
        if (AppUseLog.isShared == false) {
            AppUseLog.isShared = true;
        } else {
            return;
        }
        let appTheme = this.appStore.appTheme;
        // RecordUtil.clickRecord(tabData.tab_02_id, RecordVar.click_tab_room, (new Date()).getTime());
        RecordUtil.showRecord('null', RecordVar.show_share_dialog, (new Date()).getTime());
        let overlayView = (
            <Overlay.View
                style={{ alignItems: 'center', justifyContent: 'center' }}
                modal={true}
                overlayOpacity={0.4}
                ref={ref => this.overlayView = ref}
            >
                <View style={{ backgroundColor: appTheme.mainBgColor, borderRadius: Dpi.d(20), }}>
                    <View>
                        <Text style={{ marginVertical: Dpi.d(50), marginHorizontal: Dpi.d(50), fontSize: Dpi.s(28), color: appTheme.groupTitleTextColor }}>学生狗创业，多多支持，转{'\n'}发给亲朋好友</Text>
                    </View>
                    <View
                        style={{ borderTopColor: appTheme.lowGreyTextColor, borderTopWidth: Dpi.d(1), flexDirection: 'row', justifyContent: 'center', }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                RecordUtil.clickRecord('null', RecordVar.click_share_yes, (new Date()).getTime());
                                AppUseLog.useBean.isShareded = 1;
                                MySorage._sava(GlobleKey.KeyAppUseLog, AppUseLog.useBean);
                                Overlay.hide(that.overlayViewKey);
                                that.overlayView = null;
                                // if (that.shareTimer) {
                                //     clean(that.shareTimer);
                                // }
                                //分享。
                                UMShare.share({
                                    //platform: `${UMShare.QQ}&${UMShare.WEIXIN}&${UMShare.SINA}&${UMShare.QZONE}&${UMShare.WEIXIN_CIRCLE}`,//分享平台,调用分享面板则使用&拼接
                                    platform: UMShare.WEIXIN_CIRCLE,//分享平台,调用分享面板则使用&拼接
                                    type: UMShare.UMWeb,  //分享类型
                                    title: '『妈妈推荐的免费小说阅读神器，用过的都说好！』',
                                    url: 'https://www.maopaoke.com/',
                                    desc: '『妈妈推荐的免费小说阅读神器，用过的都说好！』',
                                    image: "https://is2-ssl.mzstatic.com/image/thumb/Purple115/v4/ee/31/f2/ee31f209-8798-8137-1acc-ef033583b7da/AppIcon-1x_U007emarketing-85-220-4.jpeg/230x0w.jpg"
                                }, res => {
                                    if (res) {
                                        // MyToast.show('分享成功');
                                    } else {
                                        // MyToast.show('分享失败');
                                    }
                                })
                                // UMShare.share({
                                //     platform: `${UMShare.QQ}&${UMShare.WEIXIN}&${UMShare.SINA}&${UMShare.QZONE}&${UMShare.WEIXIN_CIRCLE}`,//分享平台,调用分享面板则使用&拼接
                                //     // platform: UMShare.WEIXIN_CIRCLE,//分享平台,调用分享面板则使用&拼接
                                //     type: UMShare.UMWeb,  //分享类型
                                //     url: 'www.maopaoke.com',
                                //     desc: '『妈妈推荐的免费小说阅读神器，用过的都说好！』',
                                // }, res => {
                                // })
                            }}
                        >
                            <Text style={{ margin: Dpi.d(30), color: appTheme.hightLightTextColor, fontSize: Dpi.d(30) }}>去朋友圈分享</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Overlay.View >
        );
        that.overlayViewKey = Overlay.show(overlayView);
    }

    _initDeviceInfo() {
        if (Platform.OS === 'android') {
            MyDeviceInfo.getDeviceInfos((getState, imsi, wlMac, blMac, root, aId, nType, sStte) => {
                DeviceInfoStatic.imsi = imsi;
                DeviceInfoStatic.wlMac = wlMac;
                DeviceInfoStatic.blMac = blMac;
                DeviceInfoStatic.isRoot = root;
                DeviceInfoStatic.imei = aId;
                DeviceInfoStatic.networkType = nType;
                DeviceInfoStatic.simState = sStte;
            }, (err) => {
                // alert('读取错误')
            })
        }
    }

    _initReadTheme() {
        let that = this;
        MySorage.loadByDefault(GlobleKey.KeyReadThemes, -1, (data) => {
            if (data && data !== -1) {
                that.appStore.readPageStore.readTheme.setThemes(data)
            }
        })
    }

    /**
     * 早早地就去读取用户登录数据了
     */
    _initUserLoadData() {
        let that = this;
        MySorage.loadByDefault(GlobleKey.KeyUserLoadData, -1, (data) => {
            // 伪造数据开始
            data = {}
            data.loadType = 0
            data.userName = "小虫之家"
            data.userId = 1234567
            // 伪造数据结束
            if (data && data !== -1) {
                if (data.loadType === 0) {
                    that.appStore.myPageStore.setUserData(data.userName, data.userId)
                } else {
                    that.appStore.myPageStore.setUserData(data.userName, data.userId, data.userCover, data.loadType)
                }
            }
        })
    }


    //初始化分享和登录sdk
    _initUmSdk() {
        // //是否开启调试
        // // UMShare.debug(true)
        // //设置微信参数
        // UMShare.setWeixin('wxfda0498a85e90985', '3cff7d55f8f66a01f4c8d83dca898c73');
        // //设置微信参数
        // UMShare.setQQZone('1105690198', '3oGJZMivHCYY6RzM');
        // //设置新浪微博参数
        // UMShare.setSinaWeibo('1208641366', '6a3b8fd3df50833cb990d71208fa652b', 'http://www.sharesdk.cn');
        // //是否开启调试
        // // UMShare.debug(true)
        //设置微信参数
        if (Platform.OS == 'android') {
            UMShare.setWeixin('wxfda0498a85e90985', '3cff7d55f8f66a01f4c8d83dca898c73');
            //设置微信参数
            UMShare.setQQZone('1105690198', '3oGJZMivHCYY6RzM');
        } else if (Platform.OS == 'ios') {
            UMShare.setWeixin('wxfda0498a85e90985', '3cff7d55f8f66a01f4c8d83dca898c73');
            //设置微信参数
            UMShare.setQQZone('1105690198', '3oGJZMivHCYY6RzM');
        }
        //设置新浪微博参数
        // UMShare.setSinaWeibo('1208641366', '6a3b8fd3df50833cb990d71208fa652b', 'http://www.sharesdk.cn');
    }

    componentWillUnmount() {
        if (this.shareTimer && this.shareTimer != null) {
            clearTimeout(this.shareTimer);
        }
        if (this.giveStarTimer && this.giveStarTimer != null) {
            clearTimeout(this.giveStarTimer);
        }
        EventBus.removeListener(GlobleKey.EVENT_SHARE_DIALOG, this.showShareDialog);
        EventBus.removeListener(GlobleKey.EVENT_STAR_DIALOG, this.showStarDialog);
        CatchSqlLiteUtil.close();
    }


    componentDidMount() {
        // alert("时间= " + DateUtil.format("yyyy-MM-dd"));
        // this._showGiveStarDialog();
        // this._showShareDialog();
        EventBus.on(GlobleKey.EVENT_SHARE_DIALOG, this.showShareDialog)
        EventBus.on(GlobleKey.EVENT_STAR_DIALOG, this.showStarDialog)
        // if (Platform.OS == 'ios') {     //ios和android的启动页有点不一样，ios的启动页和广告是独立的，
        //     // SplashScreen.close({
        //     //     animationType: SplashScreen.animationType.fade,
        //     //     duration: 500,
        //     //     delay: 4000,
        //     // })
        AdState.setCanClose(1);     //关闭开屏广告
        // }
    }

    render() {
        return (
            <Provider appStore={this.appStore}>
                <AppRouter></AppRouter>
            </Provider>
        );
    }
}

