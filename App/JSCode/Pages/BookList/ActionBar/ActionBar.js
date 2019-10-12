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
        this.menuRef;
    }


    render() {
        let that = this;
        let appTheme = this.props.appStore.appTheme;
        let bookListStore = this.props.appStore.bookListStore;
        return (
            <NavigationBar
                title={bookListStore.listName}
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
            // rightView={
            //     <TouchableOpacity
            //         ref={ref => that.menuRef = ref}
            //         onPress={() => {
            //             that.props.appStore.tabData.selectedPage = 'SearchPage';
            //         }}
            //     >
            //         <FastImage style={{ marginHorizontal: Dpi.d(20), height: Dpi.d(44), width: Dpi.d(44), resizeMode: 'stretch' }} source={ImageResource.rankSearchIcon}></FastImage>
            //     </TouchableOpacity>
            // }
            ></NavigationBar>
        )
    }
}
