/**
 * Created by Rabbit 下午6:40
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native';
import Dpi from '../../../Utils/Dpi'
import AppUtils from '../../../Utils/AppUtils'
import FastImage from '../../../Components/react-native-fast-image'
import NavigationBar from '../../../Components/teaset/components/NavigationBar/NavigationBar'
import ImageResource from '../../../../Resource/ImageResource'
import Overlay from '../../../Components/teaset/components/Overlay/Overlay'
import UMShare from '../../../Components/react-native-puti-umeng-share'
import { observer, inject } from 'mobx-react/native';
import { autorun } from 'mobx';
import AppTheme from '../../../Themes/AppTheme';
import BackgroundView from './BackgroundView'
import RecordUtil from '../../../Record/RecordUtil'
import RecordVar from '../../../Record/RecordVar'
@inject('appStore')
@observer
export default class ActionBar extends Component {
    constructor(props) {
        super(props)
        this.overlayViewKey;
        this.menuRef;
        this.navigationBar;
    }

    setBgOpacity(opacity = 0) {

    }

    render() {
        let that = this;
        let appTheme = this.props.appStore.appTheme;
        //let bookCaseStore = this.props.appStore.bookCaseStore;
        let bookInfoStore = that.props.appStore.bookInfoStore;
        return (
            <NavigationBar
                ref={ref => that.navigationBar = ref}
                style={{ backgroundColor: 'transparent' }}
                background={<BackgroundView></BackgroundView>}
                rightView={
                    <TouchableOpacity
                        ref={ref => that.menuRef = ref}
                        onPress={() => {
                            if (bookInfoStore) {
                                RecordUtil.clickRecord(bookInfoStore.bookId, RecordVar.click_info_share, (new Date()).getTime());
                            }
                            //分享。
                            UMShare.share({
                                //platform: `${UMShare.QQ}&${UMShare.WEIXIN}&${UMShare.SINA}&${UMShare.QZONE}&${UMShare.WEIXIN_CIRCLE}`,//分享平台,调用分享面板则使用&拼接
                                platform: `${UMShare.QQ}&${UMShare.WEIXIN}&${UMShare.QZONE}&${UMShare.WEIXIN_CIRCLE}`,//分享平台,调用分享面板则使用&拼接
                                type: UMShare.UMWeb,  //分享类型
                                title: bookInfoStore.bookName,
                                url: 'http://www.maopaoke.com/book/' + bookInfoStore.bookId,
                                desc: bookInfoStore.bookDescripte,
                                image: bookInfoStore.bookCover
                            }, res => {
                                if (res) {
                                    // MyToast.show('分享成功');
                                } else {
                                    // MyToast.show('分享失败');
                                }
                            })
                        }}
                    >
                        <FastImage style={{ marginHorizontal: Dpi.d(20), height: Dpi.d(43), width: Dpi.d(43), resizeMode: 'stretch' }} source={ImageResource.shareIcon}></FastImage>
                    </TouchableOpacity>
                }
                leftView={
                    <TouchableOpacity
                        ref={ref => that.menuRef = ref}
                        onPress={() => {
                            if (that.props.navigation) {
                                that.props.navigation.goBack();
                            }
                        }}
                    >
                        <FastImage style={{ marginHorizontal: Dpi.d(20), height: Dpi.d(39), width: Dpi.d(24), resizeMode: 'stretch' }} source={ImageResource.backIcon}></FastImage>
                    </TouchableOpacity>
                }
            ></NavigationBar>
        )
    }
}
