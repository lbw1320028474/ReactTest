/**
 * Created by Rabbit 下午6:40
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Clipboard,
    BackHandler
} from 'react-native';
import Dpi from '../../Utils/Dpi'
import FastImage from '../../Components/react-native-fast-image'
import { observer, inject } from 'mobx-react/native';
import ImageResource from '../../../Resource/ImageResource';
import AppUtils from '../../Utils/AppUtils'
import Toast from '../../Components/teaset/components/Toast/Toast'
import ActionBar from './ActionBar/ActionBar'
import AppTheme from '../../Themes/AppTheme';
import RecordVar from '../../Record/RecordVar'
import RecordUtil from '../../Record/RecordUtil'
@inject('appStore')
@observer
export default class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.backHandler = () => {
            this._close();
            return true;
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backHandler);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler)
    }

    static open(navigation) {
        if (navigation) {
            navigation.navigate('KEY_SceneCommunityPage');
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

    render() {
        let that = this;
        let appTheme = this.props.appStore.appTheme;
        let myPageStore = this.props.appStore.myPageStore;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    hidden={false}
                ></StatusBar>
                <ActionBar navigation={this.props.navigation}></ActionBar>
                <View style={{ alignItems: 'center' }}>
                    <FastImage
                        source={ImageResource.communitImage}
                        style={{
                            marginTop: Dpi.d(70),
                            width: Dpi.d(256),
                            height: Dpi.d(256)
                        }}
                    ></FastImage>
                </View>
                <View style={{ marginHorizontal: Dpi.d(30), marginTop: Dpi.d(44) }}>
                    <Text style={{ fontSize: Dpi.s(28), color: appTheme.groupTitleTextColor }}>关注方法</Text>
                    <Text style={{ marginTop: Dpi.d(20), fontSize: Dpi.s(26), color: appTheme.greyTextColor }}>1、通过点击“立即关注”，到微信搜索“歪歪免费小说”完成关注。</Text>
                    <Text style={{ marginTop: Dpi.d(10), fontSize: Dpi.s(26), color: appTheme.greyTextColor }}>2、截屏二维码，到微信“扫一扫”选择相册，通过扫描二维码完成关注。</Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        RecordUtil.clickRecord('null', RecordVar.click_community_button, (new Date()).getTime());
                        Clipboard.setString('歪歪免费小说');
                        Toast.message('复制成功，请到微信中粘贴后搜索', 'long', 'center');
                    }}
                    style={{ marginTop: Dpi.d(60), marginHorizontal: Dpi.d(70), paddingVertical: Dpi.d(14), justifyContent: 'center', alignItems: 'center', backgroundColor: appTheme.hightLightColor, borderRadius: Dpi.d(5) }}
                >
                    <Text style={{ fontSize: Dpi.s(30), color: appTheme.mainColor }}>立即关注</Text>
                </TouchableOpacity>
            </View >
        );
    }
}

