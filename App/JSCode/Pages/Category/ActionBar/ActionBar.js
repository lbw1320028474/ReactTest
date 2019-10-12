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
import RecordVar from '../../../Record/RecordVar'
import RecordUtil from '../../../Record/RecordUtil'
import { observer, inject } from 'mobx-react/native';
import AppTheme from '../../../Themes/AppTheme';
import SearchPage from '../../Search/SearchPage'
@inject('appStore')
@observer
export default class ActionBar extends Component {
    constructor(props) {
        super(props)
        this.overlayViewKey;
        this.menuRef;
    }

    setBgOpacity(opacity = 0) {

    }

    render() {
        let appTheme = this.props.appStore.appTheme;
        //let bookCaseStore = this.props.appStore.bookCaseStore;
        let that = this;
        return (
            <NavigationBar
                title='分类'
                style={{ backgroundColor: appTheme.hightLightColor, position: 'relative' }}
                rightView={
                    <TouchableOpacity
                        ref={ref => that.menuRef = ref}
                        onPress={() => {
                            SearchPage.openFrom = that.props.appStore.tabData.selectedPage;
                            RecordUtil.clickRecord('null', RecordVar.click_category_search, (new Date()).getTime());
                            that.props.appStore.tabData.selectedPage = 'SearchPage';
                        }}
                    >
                        <FastImage style={{ marginHorizontal: Dpi.d(20), height: Dpi.d(44), width: Dpi.d(44), resizeMode: 'stretch' }} source={ImageResource.rankSearchIcon}></FastImage>
                    </TouchableOpacity>
                }
            ></NavigationBar>
        )
    }
}
