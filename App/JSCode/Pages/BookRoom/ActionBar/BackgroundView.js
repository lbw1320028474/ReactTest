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

import { observer, inject } from 'mobx-react/native';
import { autorun } from 'mobx';
import AppTheme from '../../../Themes/AppTheme';
@inject('appStore')
@observer
export default class BackgroundView extends Component {
    constructor(props) {
        super(props)
        let that = this;
        this.overlayViewKey;
        this.bgOpacity = 1;
        this.menuRef;
        this.navigationBar;
        this.viewRef;
        // try {

        // } catch (error) {

        // }

    }



    componentDidMount() {
        let that = this;
        autorun(() => {
            that.setBgOpacity(that.props.appStore.bookRoomStore.scrollViewOfsetY);
        })
    }

    setBgOpacity(ofsetY) {

        if (ofsetY < Dpi.d(400) && ofsetY > Dpi.d(200)) {
            this.bgOpacity = (ofsetY - Dpi.d(200)) / Dpi.d(200);
        } else if (ofsetY <= Dpi.d(200)) {
            this.bgOpacity = 0;
        } else {
            this.bgOpacity = 1;
        }
        if (this.viewRef) {
            this.viewRef.setNativeProps(
                {
                    style: { opacity: this.bgOpacity }
                }
            )
        }
    }

    render() {
        let that = this;
        let appTheme = this.props.appStore.appTheme;
        return (
            <TouchableOpacity
                onPress={() => {
                    alert('d')
                }}
                style={{
                    flex: 1
                }}
            >
                <View
                    ref={ref => this.viewRef = ref}
                    style={{ flex: 1, backgroundColor: appTheme.hightLightColor, opacity: that.bgOpacity, alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <Text style={{ maxWidth: Dpi.d(500), fontSize: Dpi.s(34), marginBottom: Dpi.d(20), color: appTheme.mainColor }}>歪歪小说</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
