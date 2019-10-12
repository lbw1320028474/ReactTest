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
import AppTheme from '../../../Themes/AppTheme';
@inject('appStore')
@observer
export default class ActionBar extends Component {
    constructor(props) {
        super(props)
        this.overlayViewKey;
    }

    setBgOpacity(opacity = 0) {

    }

    render() {
        let appTheme = this.props.appStore.appTheme;
        //let bookCaseStore = this.props.appStore.bookCaseStore;
        let that = this;
        return (
            <NavigationBar
                title='找回密码'
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
            ></NavigationBar>
        )
    }
}
