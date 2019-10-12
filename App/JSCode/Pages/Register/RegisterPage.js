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
    ActivityIndicator
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
import MyText from '../../Components/MyText'
import StringUtil from '../../Utils/StringUtil'
import ObjUtil from '../../Utils/ObjUtil'
import RegisterRequest from '../../Protocol/RegisterRequest'
import NetWorkUtil from '../../Network/NetWorkUtil'
import AuthCodeUtil from '../../Utils/AuthCodeUtil'
@inject('appStore')
@observer
export default class RegisterPage extends Component {
    constructor(props) {
        super(props);
        // this._bookMenuItemClick.bind(this);
        this.accountEditStr = null;
        this.authEditStr = null;
        this.passwordEditStr = null;
        this.overlayViewKey;
        this.authCodeTextView;
        this.authCodeTimer;
        this.authRegetTimer = 0;
    }


    componentWillUnmount() {
        Keyboard.dismiss();
        if (this.authCodeTimer) {
            clearInterval(this.authCodeTimer);
        }
    }


    static open(navigation) {
        if (navigation) {
            navigation.navigate('KEY_RegisterPage');
        } else {
            alert('打开失败，参数错误,navigation = null')
        }
    }

    _showOverLayoutView() {
        let that = this;
        let appTheme = that.props.appStore.appTheme;
        that.overlayViewKey = Toast.show({
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
    _close() {
        let that = this;
        if (that.props.navigation) {
            that.props.navigation.goBack();
        } else {
            alert('参数错误,navigation = null')
        }
    }

    _toRegister(that) {
        if (that.accountEditStr) {
            that.accountEditStr = that.accountEditStr.replace(' ', '')
        }
        if (!StringUtil.checkMobile(that.accountEditStr)) {
            Toast.message('手机号码不正确', 'short', 'center');
            return;
        }
        if (ObjUtil.strIsEmpty(that.authEditStr) || that.authEditStr.length > 6 || that.authEditStr.length < 4) {
            Toast.message('验证码格式不正确', 'short', 'center');
            return;
        }
        if (ObjUtil.strIsEmpty(that.passwordEditStr)) {
            Toast.message('密码不能为空', 'short', 'center');
            return;
        } else if (that.passwordEditStr.length < 6) {
            Toast.message('密码至少6位', 'short', 'center');
            return;
        }
        if (that.myModelRef) {
            that.myModelRef.showModel(() => {
            })
        }
        let registerRequest = new RegisterRequest();
        registerRequest.mobile = that.accountEditStr;
        registerRequest.authCode = that.authEditStr;
        registerRequest.password = that.passwordEditStr;
        registerRequest.source = '1';
        NetWorkUtil.getJsonByPost(GlobleUrl.URL_BASE_URL + GlobleUrl.URL_REGISTER,
            JSON.stringify(registerRequest),
            (data) => {
                that._hideOverLayoutView();
                if (data && data.msgCode === 200) {
                    Toast.message('注册成功', 'short', 'center');
                    that._close(that);
                } else {
                    Toast.message(data.errMsg, 'short', 'center');
                    //console.log(JSON.stringify(data))
                }
            },
            (err) => {
                that._hideOverLayoutView();
                Toast.message('注册失败', 'short', 'center');
            });

    }

    render() {
        let that = this;
        let appTheme = this.props.appStore.appTheme;
        let myPageStore = this.props.appStore.myPageStore;
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
                        }}>账    号：</Text>
                        <TextInput
                            keyboardType='numeric'
                            onChangeText={(text) => {
                                that.accountEditStr = text;
                            }}
                            placeholderTextColor={appTheme.lowGreyTextColor}
                            underlineColorAndroid="transparent"
                            placeholder='手机号码'
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
                        }} source={ImageResource.verticalCodeIcon}></FastImage>
                        <Text style={{
                            marginHorizontal: Dpi.d(10),
                            fontSize: Dpi.s(30),
                            color: appTheme.groupTitleTextColor
                        }}>验证码：</Text>
                        <TextInput
                            keyboardType='numeric'
                            onChangeText={(text) => {
                                that.authEditStr = text;
                            }}
                            placeholderTextColor={appTheme.lowGreyTextColor}
                            underlineColorAndroid="transparent"
                            placeholder='验证码'
                            style={{
                                flex: 1,
                                fontSize: Dpi.s(30),
                                color: appTheme.groupTitleTextColor
                            }}></TextInput>
                        <TouchableOpacity activeOpacity={0.8}
                            onPress={() => {
                                if (that.authRegetTimer > 0) {
                                    return;
                                }
                                that.authRegetTimer = 60;
                                AuthCodeUtil.getAuthCode(that.accountEditStr, (info) => {
                                    if (info && info.msgCode === 200) {
                                        that.authCodeTimer = setInterval(() => {
                                            if (that.authRegetTimer <= 0) {
                                                if (that.authCodeTextView) {
                                                    that.authCodeTextView.setText('获取验证码')
                                                }
                                                if (that.authCodeTimer) {
                                                    clearInterval(that.authCodeTimer);
                                                }
                                            } else {
                                                that.authRegetTimer -= 1;
                                                if (that.authCodeTextView) {
                                                    that.authCodeTextView.setText(that.authRegetTimer + '秒后可重试')
                                                }
                                            }
                                        }, 1000)
                                    } else {
                                        if (info && info.msg) {
                                            Toast.message('获取验证码失败' + info.msg, 'short', 'center');
                                        } else {
                                            Toast.message('获取验证码失败,请重试', 'short', 'center');
                                        }
                                        that.authRegetTimer = 0;
                                    }
                                })
                            }}>
                            <MyText ref={ref => that.authCodeTextView = ref} text='获取验证码' style={{
                                borderRadius: Dpi.d(3),
                                borderWidth: Dpi.d(1),
                                borderColor: appTheme.lowGreyTextColor,
                                padding: Dpi.d(7),
                                fontSize: Dpi.s(26),
                                color: appTheme.lowGreyTextColor
                            }}></MyText>
                        </TouchableOpacity>

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
                        }}>密    码：</Text>
                        <TextInput
                        secureTextEntry={true}
                            keyboardType='numeric'
                            onChangeText={(text) => {
                                that.passwordEditStr = text;
                            }}
                            placeholderTextColor={appTheme.lowGreyTextColor}
                            underlineColorAndroid="transparent"
                            placeholder='密码（至少6位）'
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
                            Keyboard.dismiss();
                            // if (that.isChecked) {
                            // that._exChangeSkyId(that, '7668C7200741CE2EF73B5D4FD88C4CD2');
                            that._toRegister(that);
                            // }
                        }}>
                        <Text style={{
                            fontSize: Dpi.s(30),
                            color: appTheme.mainColor,
                            backgroundColor: 'transparent',
                        }}>立即注册</Text>
                    </TouchableOpacity>


                </View >
            </View>
        );
    }
}

