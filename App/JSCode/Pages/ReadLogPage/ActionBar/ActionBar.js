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
import FastImage from '../../../Components/react-native-fast-image'
import NavigationBar from '../../../Components/teaset/components/NavigationBar/NavigationBar'
import ImageResource from '../../../../Resource/ImageResource'
import Overlay from '../../../Components/teaset/components/Overlay/Overlay'
import { observer, inject } from 'mobx-react/native';

@inject('appStore')
@observer
export default class ActionBar extends Component {
    constructor(props) {
        super(props)
        this.menuRef;
        this.dialogViewKey;
    }


    _showDialog() {
        // alert(DateUtil.format('yyyy-MM-dd'))
        if (this.dialogViewKey && this.dialogViewKey != null) {
            return;
        }
        let that = this;
        let appTheme = this.props.appStore.appTheme;
        let overlayView = (
            <Overlay.View
                style={{ alignItems: 'center', justifyContent: 'center' }}
                modal={true}
                overlayOpacity={0.4}
                ref={ref => this.overlayView = ref}
            >
                <View style={{ backgroundColor: appTheme.mainBgColor, borderRadius: Dpi.d(20), }}>
                    <View>
                        <Text style={{ marginVertical: Dpi.d(50), marginHorizontal: Dpi.d(50), fontSize: Dpi.s(28), color: appTheme.groupTitleTextColor }}>确定要清空所有阅读记录吗？</Text>
                    </View>
                    <View
                        style={{ borderTopColor: appTheme.lowGreyTextColor, borderTopWidth: Dpi.d(1), alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                Overlay.hide(that.dialogViewKey);
                                that.dialogViewKey = null;
                            }}
                        >
                            <Text style={{ margin: Dpi.d(30), color: appTheme.hightLightTextColor, fontSize: Dpi.d(30) }}>返回</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                Overlay.hide(that.dialogViewKey);
                                that.dialogViewKey = null;
                                that.props.cleanCallBack();
                            }}
                        >
                            <Text style={{ margin: Dpi.d(30), color: appTheme.hightLightTextColor, fontSize: Dpi.d(30) }}>清空</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Overlay.View >
        );
        that.dialogViewKey = Overlay.show(overlayView);
    }

    render() {
        let that = this;
        let appTheme = this.props.appStore.appTheme;
        return (
            <NavigationBar
                title={'阅读历史'}
                style={{ backgroundColor: appTheme.hightLightColor, position: 'relative' }}
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
                rightView={

                    <TouchableOpacity
                        ref={ref => that.menuRef = ref}
                        onPress={() => {
                            that._showDialog();
                        }}
                    >
                        <FastImage style={{ marginHorizontal: Dpi.d(20), height: Dpi.d(39), width: Dpi.d(39), resizeMode: 'stretch' }} source={ImageResource.read_log_clean}></FastImage>
                    </TouchableOpacity>
                }
            ></NavigationBar>
        )
    }
}
