/**
 * Created by Rabbit 下午6:40
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ListView,
    ScrollView,
    StyleSheet,
    TextInput,
    Keyboard,
    ActivityIndicator,
    Platform,
    BackHandler
} from 'react-native';
import Dpi from '../../Utils/Dpi'
import FastImage from '../../Components/react-native-fast-image'
import { observer, inject } from 'mobx-react/native';
import GlobleVar from '../../Globle/GlobleVar'
import GlobleUrl from '../../Globle/GlobleUrl'
import AppUtils from '../../Utils/AppUtils'
import { LargeList } from '../../Components/react-native-largelist'
import ActionBar from './ActionBar/ActionBar'
import ImageResource from '../../../Resource/ImageResource';
import { observable } from 'mobx';
import Button from '../../Components/teaset/components/Button/Button'
import Toast from '../../Components/teaset/components/Toast/Toast'
import Overlay from '../../Components/teaset/components/Overlay/Overlay'
import CheckBox from '../../Components/react-native-check-box'
import RegisterPage from '../Register/RegisterPage'
import FindPasswordPage from '../FindPassword/FindPasswordPage'
import StringUtil from '../../Utils/StringUtil'
import ObjUtil from '../../Utils/ObjUtil'
import NetWorkUtil from '../../Network/NetWorkUtil'
import ThirdLoginRequest from '../../Protocol/ThirdLoginRequest'
import LoginRequest from '../../Protocol/LoginRequest'
import UMShare from '../../Components/react-native-puti-umeng-share'
import UserProtocal from '../UserProtocal/UserProtocal';
import RecordUtil from '../../Record/RecordUtil'
import RecordVar from '../../Record/RecordVar'
@inject('appStore')
@observer
export default class LoadPage extends Component {
    @observable qqisinstall = false;
    @observable wxininstall = false;
    constructor(props) {
        super(props);
        // this._bookMenuItemClick.bind(this);
        this.threadLoadData;
        this.loadType = 0;  //登录方式，0：自有账户， 1：qq， 2：微信
        this.overlayViewKey;
        this.accountEditStr = '';//'15700086379';
        this.passwordEditStr = '';//'tb112233';
        this.isSelected = true;
        this.backHandler = () => {
            this._close();
            return true;
        }
    }


    componentDidMount() {
        RecordUtil.showRecord('null', RecordVar.show_load_page, (new Date()).getTime());
        BackHandler.addEventListener('hardwareBackPress', this.backHandler);
    }

    componentWillUnmount() {
        Keyboard.dismiss();
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler)
    }


    static open(navigation) {
        if (navigation) {
            navigation.navigate('KEY_LoadPage');
        } else {
            alert('打开失败，参数错误,navigation = null')
        }
    }
    _close() {
        let that = this;
        if (that.props.navigation) {
            that.props.navigation.goBack();
        } else {
            alert('参数错误,navigation = null')
        }
    }

    _showOverLayoutView() {
        let that = this;
        let appTheme = that.props.appStore.appTheme;
        that.overlayViewKey = Toast.show({
            text: '正在登录。。。',
            icon: <ActivityIndicator size='large' color={appTheme.mainColor} />,
            position: 'center',
            duration: 10000,
        });
    }

    _hideOverLayoutView() {
        let that = this;
        if (that.overlayViewKey && that.overlayViewKey !== null) {
            Toast.hide(that.overlayViewKey);
            that.overlayViewKey = null;
        }
    }


    //登录
    _toLoadByPhone(that) {
        let here = this;
        if (that.accountEditStr) {
            that.accountEditStr = that.accountEditStr.replace(' ', '')
        }
        if (!StringUtil.checkMobile(that.accountEditStr)) {
            Toast.message('手机号码不正确', 'short', 'center');
            return;
        }
        // if (!ObjUtil.strIsEmpty(that.accountEditStr) && (that.accountEditStr.lenth > 6 || that.accountEditStr.length < 4)) {
        //     MyToast.show('验证码格式不正确');
        //     return;
        // }
        if (ObjUtil.strIsEmpty(that.passwordEditStr)) {
            Toast.message('密码不能为空');
            return;
        } else if (that.passwordEditStr.length < 6) {
            Toast.message('密码至少6位');
            return;
        }
        let loginRequest = new LoginRequest();
        loginRequest.mobile = that.accountEditStr;
        loginRequest.password = that.passwordEditStr;
        loginRequest.source = '1';
        that._showOverLayoutView();
        NetWorkUtil.getJsonByPost(GlobleUrl.URL_BASE_URL + GlobleUrl.URL_LOGIN,
            JSON.stringify(loginRequest),
            (data) => {
                here._hideOverLayoutView();
                if (data && data.msgCode === 200 && data.skyId) {

                    that.props.appStore.myPageStore.setUserData(data.mobile, data.skyId)
                    Toast.message('登录成功', 'short', 'center');
                    here._close(that);
                } else {
                    if (data && data.errMsg) {
                        Toast.message('登录失败:' + data.errMsg);
                    } else {
                        Toast.message('登录失败:');
                    }
                }

            },
            (err) => {
                here._hideOverLayoutView();
                Toast.message('登录失败');
            });

    }

    _exChangeSkyId(uid) {
        let that = this;
        if (ObjUtil.objIsEmpty(uid)) {
            Toast.message('登录失败,无效的UID', 'short', 'center');
            return;
        }
        let loginRequest = new ThirdLoginRequest();
        loginRequest.openId = uid;
        that._showOverLayoutView();
        NetWorkUtil.getJsonByPost(GlobleUrl.URL_BASE_URL + GlobleUrl.URL_GET_SKY_ID,
            JSON.stringify(loginRequest),
            (data) => {
                that._hideOverLayoutView();
                if (data && data.msgCode === 200 && data.skyId) {
                    //console.log('第三方登录成功,' + JSON.stringify(data));
                    if (that.loadType === 1) {
                        Toast.message('登录成功', 'short', 'center');
                        if (Platform.OS == 'ios') {
                            that.props.appStore.myPageStore.setUserData(that.threadLoadData.name, data.skyId, { uri: that.threadLoadData.iconurl }, 2)
                        } else {
                            that.props.appStore.myPageStore.setUserData(that.threadLoadData.name, data.skyId, { uri: that.threadLoadData.profile_image_url }, 2)
                        }
                        // that.props.appStore.myPageStore.setUserData(that.threadLoadData.name, data.skyId, { uri: that.threadLoadData.profile_image_url }, 1)
                        that._close(that);
                    } else if (that.loadType === 2 && that.threadLoadData) {
                        Toast.message('登录成功', 'short', 'center');
                        that.props.appStore.myPageStore.setUserData(that.threadLoadData.name, data.skyId, { uri: that.threadLoadData.iconurl }, 2)
                        that._close(that);
                    } else {
                        Toast.message('登录失败，201', 'short', 'center');
                    }
                } else {
                    if (data && data.errMsg) {
                        Toast.message('登录失败:' + data.errMsg, 'short', 'center');
                    } else {
                        Toast.message('登录失败:', 'short', 'center');
                    }
                }
            },
            (err) => {
                if (err) {
                    Toast.message('登录失败:' + JSON.stringify(err), 'short', 'center');
                } else {
                    Toast.message('登录失败:', 'short', 'center');
                }
                that._hideOverLayoutView();
            });
    }


    render() {
        let that = this;
        let appTheme = this.props.appStore.appTheme;
        let loadStore = this.props.appStore.loadStore;
        return (
            <View style={{ flex: 1, backgroundColor: appTheme.greyBgColor }}>
                <ActionBar navigation={this.props.navigation}></ActionBar>
                <View style={{
                    flex: 1,
                    paddingTop: Dpi.d(100),
                    paddingBottom: Dpi.d(100),
                    backgroundColor: appTheme.mainBgColor,
                    flexDirection: 'column',
                    paddingHorizontal: Dpi.d(50)
                }}>
                    <View style={{
                        height: Dpi.d(100),
                        alignItems: 'center',
                        flexDirection: 'row',
                        borderBottomWidth: AppUtils.pixel,
                        borderBottomColor: appTheme.lowGreyTextColor
                    }}>
                        <FastImage style={{
                            resizeMode: 'stretch',
                            width: Dpi.d(30),
                            height: Dpi.d(36),
                        }} source={ImageResource.userAccountIcon}></FastImage>
                        <Text style={{
                            marginHorizontal: Dpi.d(10),
                            fontSize: Dpi.s(30),
                            color: appTheme.groupTitleTextColor
                        }}>账  号：</Text>
                        <TextInput
                            autoFocus={true}
                            keyboardType='numeric'
                            onChangeText={(text) => {
                                that.accountEditStr = text;
                            }}
                            placeholderTextColor={appTheme.lowGreyTextColor}
                            underlineColorAndroid="transparent"
                            placeholder='请输入手机号码'
                            style={{
                                flex: 1,
                                fontSize: Dpi.s(30),
                                color: appTheme.groupTitleTextColor
                            }}></TextInput>

                    </View>
                    <View style={{
                        height: Dpi.d(100),
                        alignItems: 'center',
                        flexDirection: 'row',
                        borderBottomWidth: AppUtils.pixel,
                        borderBottomColor: appTheme.lowGreyTextColor
                    }}>
                        <FastImage style={{
                            resizeMode: 'stretch',
                            width: Dpi.d(30),
                            height: Dpi.d(36),
                        }} source={ImageResource.userPasswordIcon}></FastImage>
                        <Text style={{
                            marginHorizontal: Dpi.d(10),
                            fontSize: Dpi.s(30),
                            color: appTheme.groupTitleTextColor
                        }}>密  码：</Text>
                        <TextInput
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                that.passwordEditStr = text;
                            }}
                            placeholderTextColor={appTheme.lowGreyTextColor}
                            underlineColorAndroid="transparent"
                            placeholder='请输入密码（至少6位）'
                            style={{
                                flex: 1,
                                fontSize: Dpi.s(30),
                                color: appTheme.groupTitleTextColor
                            }}></TextInput>

                    </View>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{
                            marginVertical: Dpi.d(15),
                            borderRadius: Dpi.d(5),
                            backgroundColor: appTheme.hightLightColor,
                            height: Dpi.d(70),
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={() => {
                            if (Platform.OS === 'ios') {
                                if (that.isSelected === true) {
                                    Keyboard.dismiss();
                                    that._toLoadByPhone(that);
                                } else {
                                    Toast.message('请先阅读隐私政策', 'short', 'center')
                                }
                            } else {
                                Keyboard.dismiss();
                                that._toLoadByPhone(that);
                            }
                        }}>
                        <Text style={{
                            fontSize: Dpi.s(30),
                            color: appTheme.mainColor,
                            backgroundColor: 'transparent',
                        }}>登录</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: Dpi.d(20), marginBottom: Dpi.d(20) }}>
                        <CheckBox
                            checkBoxColor={appTheme.hightLightTextColor}
                            onClick={() => {
                                this.isSelected = !(this.isSelected)
                            }}
                            isChecked={this.isSelected}
                        ></CheckBox>
                        <Text style={{ paddingHorizontal: Dpi.d(20), fontSize: Dpi.s(28), color: appTheme.groupTitleTextColor }}>我已阅读并同意
                    {<Text onPress={() => {
                                UserProtocal.open(that.props.navigation)
                            }} style={{ color: appTheme.hightLightTextColor }} >“隐私政策”</Text>}
                        </Text>
                    </View>
                    <View style={{
                        marginVertical: Dpi.d(10),
                        marginHorizontal: Dpi.d(50),
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{
                            textDecorationLine: 'underline',
                            marginHorizontal: Dpi.d(10),
                            fontSize: Dpi.s(30),
                            color: appTheme.hightLightTextColor
                        }} onPress={() => {
                            FindPasswordPage.open(that.props.navigation);
                        }}>忘记密码</Text>
                        <Text style={{
                            textDecorationLine: 'underline',
                            marginHorizontal: Dpi.d(10),
                            fontSize: Dpi.s(30),
                            color: appTheme.hightLightTextColor
                        }} onPress={() => {
                            RegisterPage.open(that.props.navigation);
                        }}>还未注册</Text>
                    </View>
                    {
                        (loadStore.qqIsInstall == true || loadStore.wxIsInstall == true) ?
                            <View style={{
                                marginVertical: Dpi.d(20),
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    marginHorizontal: Dpi.d(10),
                                    fontSize: Dpi.s(26),
                                    color: appTheme.groupTitleTextColor
                                }}>或用以下方式登录</Text>
                                <View style={{
                                    marginVertical: Dpi.d(20),
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    {
                                        (loadStore.qqIsInstall == true) ?
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                                // UMShare.isInstall(UMShare.QQ).then((isInstall) => {
                                                //     if (isInstall) {
                                                //登录
                                                UMShare.login(UMShare.QQ)
                                                    .then((data) => {
                                                        // Toast.message('QQ未安装');
                                                        // MySorage._sava(GlobleKey.KeyUserLoadedPlatform, GlobleKey.QQPlatform);
                                                        // MySorage._sava(GlobleKey.KeyQQloadedData, JSON.stringify(data));
                                                        // // EventBus.emit(GlobleKey.KEY_USERLOAD_CHANGE_EVENT);
                                                        // // close(that);
                                                        // //alert('qq登录成功')
                                                        // that.props.loadCallBack(data);
                                                        // console.log("qq登录成功：" + JSON.stringify(data));
                                                        that.loadType = 2;
                                                        that.threadLoadData = data;
                                                        that._exChangeSkyId(data.uid)
                                                    }).catch(e => {
                                                        //alert('错误' + JSON.stringify(e));
                                                    })
                                                // } else {
                                                //     Toast.message('QQ未安装');
                                                // }
                                                // })
                                            }}>
                                                <FastImage style={{
                                                    resizeMode: 'stretch',
                                                    margin: Dpi.d(40),
                                                    width: Dpi.d(70),
                                                    height: Dpi.d(70)
                                                }} source={ImageResource.logo_qq}></FastImage>
                                            </TouchableOpacity>
                                            :
                                            null
                                    }
                                    {
                                        (loadStore.wxIsInstall == true) ?
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                                // UMShare.isInstall(UMShare.WEIXIN).then((isInstall) => {
                                                //     if (isInstall) {
                                                //登录
                                                UMShare.login(UMShare.WEIXIN)
                                                    .then((data) => {
                                                        // Toast.message('QQ未安装');
                                                        // MySorage._sava(GlobleKey.KeyUserLoadedPlatform, GlobleKey.QQPlatform);
                                                        // MySorage._sava(GlobleKey.KeyQQloadedData, JSON.stringify(data));
                                                        // // EventBus.emit(GlobleKey.KEY_USERLOAD_CHANGE_EVENT);
                                                        // // close(that);
                                                        // alert('qq登录成功' + JSON.stringify(data));
                                                        // that.props.loadCallBack(data);
                                                        // console.log("qq登录成功：" + JSON.stringify(data));
                                                        that.threadLoadData = data;
                                                        that.loadType = 1;
                                                        that._exChangeSkyId(data.uid)
                                                    }).catch(e => {
                                                        //alert('错误' + JSON.stringify(e));
                                                    })
                                                // } else {
                                                //     Toast.message('微信未安装');
                                                // }
                                                // })
                                            }}>
                                                <FastImage style={{
                                                    resizeMode: 'stretch',
                                                    margin: Dpi.d(40),
                                                    width: Dpi.d(70),
                                                    height: Dpi.d(70)
                                                }} source={ImageResource.logo_weichat}></FastImage>
                                            </TouchableOpacity>
                                            :
                                            null
                                    }

                                </View>
                            </View>
                            :
                            null
                    }

                </View >
            </View>
        );
    }
}


