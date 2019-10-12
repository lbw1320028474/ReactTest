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
@inject('appStore')
@observer
export default class ErrActionBar extends Component {
    constructor(props) {
        super(props)
    }

    setBgOpacity(opacity = 0) {

    }

    render() {
        let appTheme = this.props.appStore.appTheme;
        //let bookCaseStore = this.props.appStore.bookCaseStore;
        let that = this;
        return (
            <NavigationBar
                title='歪歪小说'
                style={{ backgroundColor: appTheme.hightLightColor, position: 'relative' }}
            ></NavigationBar>
        )
    }
}
