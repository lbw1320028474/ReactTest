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
import EventBus from '../../../Utils/EventBus'
import FastImage from '../../../Components/react-native-fast-image'
import NavigationBar from '../../../Components/teaset/components/NavigationBar/NavigationBar'
import ImageResource from '../../../../Resource/ImageResource'
import Overlay from '../../../Components/teaset/components/Overlay/Overlay'

import { observer, inject } from 'mobx-react/native';
import AppTheme from '../../../Themes/AppTheme';
import GlobleKey from '../../../Globle/GlobleKey';
@inject('appStore')
@observer
export default class ActionBar extends Component {
    constructor(props) {
        super(props)
        this.overlayViewKey;
    }


    render() {
        let appTheme = this.props.appStore.appTheme;
        //let bookCaseStore = this.props.appStore.bookCaseStore;
        let that = this;
        let title = '';
        this.lastPressBackTime = 0;
        if (that.props.title) {
            title = that.props.title;
        }
        return (
            <NavigationBar
                title={title}
                statusBarHidden={false}
                style={{ backgroundColor: appTheme.hightLightColor, position: 'relative' }}
                leftView={
                    <TouchableOpacity
                        ref={ref => that.menuRef = ref}

                        onPress={() => {
                            if (Platform.OS === 'ios') {
                                if ((new Date()).getTime() - that.lastPressBackTime <= 300) {
                                    if (that.props.navigation) {
                                        that.props.navigation.goBack();
                                    }
                                } else {
                                    that.lastPressBackTime = (new Date()).getTime();
                                    EventBus.emit(GlobleKey.EVENT_WEB_BACK);
                                }
                            } else {
                                if (that.props.navigation) {
                                    that.props.navigation.goBack();
                                }
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
