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
import MyPage from '../../MyPage/MyPage'
import { observer, inject } from 'mobx-react/native';
import AppTheme from '../../../Themes/AppTheme';
import MySorage from '../../../Utils/MyStore/MySorage'
import GlobleKey from '../../../Globle/GlobleKey';
import RecordVar from '../../../Record/RecordVar'
import RecordUtil from '../../../Record/RecordUtil'
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

    _showMenu(appTheme, bookCaseStore, listType) {
        let that = this;
        that.menuRef.measureInWindow((x, y, width, height) => {
            let popoverStyle = {
                backgroundColor: appTheme.mainColor,
                paddingTop: 8,
                paddingBottom: 8,
                paddingLeft: 12,
                paddingRight: 12,
            };
            let fromBounds = { x: x - 10, y: (Platform.OS === 'ios') ? y : y + height + Dpi.d(20), width, height };
            let overlayView = (
                <Overlay.PopoverView
                    popoverStyle={popoverStyle}
                    fromBounds={fromBounds}
                    direction='down'
                    align='center'
                    directionInsets={Dpi.d(10)}
                    showArrow={true}
                >
                    <TouchableOpacity
                        onPress={() => {
                            bookCaseStore.listType = 0;
                            if (that.overlayViewKey) {
                                Overlay.hide(that.overlayViewKey)
                            }
                            MySorage._sava(GlobleKey.KeyBookCaseType, 0);
                        }}
                    >
                        <View style={{ flexDirection: 'row', paddingVertical: Dpi.d(15), alignItems: 'center', paddingHorizontal: Dpi.d(20) }}>
                            <FastImage
                                source={ImageResource.bookCaseListTypeList}
                                style={{ tintColor: (bookCaseStore.listType === 0) ? appTheme.hightLightTextColor : appTheme.mainTextColor, width: Dpi.d(40), height: Dpi.d(40), resizeMode: FastImage.resizeMode.stretch }}
                            ></FastImage>
                            <Text style={{ marginLeft: Dpi.d(20), fontSize: Dpi.d(30), color: (bookCaseStore.listType === 0) ? appTheme.hightLightTextColor : appTheme.mainTextColor }}>列表模式</Text>
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            bookCaseStore.listType = 1;
                            if (that.overlayViewKey) {
                                Overlay.hide(that.overlayViewKey)
                            }
                            MySorage._sava(GlobleKey.KeyBookCaseType, 1);
                        }}
                    >
                        <View style={{ flexDirection: 'row', paddingVertical: Dpi.d(25), alignItems: 'center', paddingHorizontal: Dpi.d(20) }}>
                            <FastImage
                                source={ImageResource.bookCaseListTypeCover}
                                style={{ tintColor: (bookCaseStore.listType === 1) ? appTheme.hightLightTextColor : appTheme.mainTextColor, width: Dpi.d(40), height: Dpi.d(40), resizeMode: FastImage.resizeMode.stretch }}
                            ></FastImage>
                            <Text style={{ marginLeft: Dpi.d(20), fontSize: Dpi.d(30), color: (bookCaseStore.listType === 1) ? appTheme.hightLightTextColor : appTheme.mainTextColor }}>封面模式</Text>
                        </View>
                    </TouchableOpacity>
                </Overlay.PopoverView>
            );
            that.overlayViewKey = Overlay.show(overlayView);
        });
    }

    render() {
        let appTheme = this.props.appStore.appTheme;
        let bookCaseStore = this.props.appStore.bookCaseStore;
        let myPageStore = this.props.appStore.myPageStore;
        let that = this;
        return (
            <NavigationBar
                style={{ backgroundColor: appTheme.hightLightColor, position: 'relative' }}
                title='书架'
                //<Image style={{borderRadius: Dpi.d(24), marginLeft: Dpi.d(31), height: Dpi.d(48), width: Dpi.d(48), resizeMode: FastImage.resizeMode.stretch,  }} source={(myPageStore.isLoaded) ? myPageStore.userCover : ImageResource.myNormalIcon}></Image>
                leftView={
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            RecordUtil.clickRecord('null', RecordVar.click_tab_person, (new Date()).getTime())
                            MyPage.open(that.props.navigation);
                        }}
                    >
                        <View
                            style={{
                                marginLeft: Dpi.d(31),
                                height: Dpi.d(48),
                                width: Dpi.d(48),
                            }}
                        >
                            <Image style={{ height: Dpi.d(48), width: Dpi.d(48) }} source={(myPageStore.isLoaded) ? myPageStore.userCover : ImageResource.myNormalIcon}></Image>
                            <Image style={{ tintColor: appTheme.hightLightColor, position: 'absolute', height: Dpi.d(48), width: Dpi.d(48) }} source={ImageResource.cicleMark}></Image>
                        </View>
                    </TouchableOpacity>
                }
                rightView={
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            ref={ref => that.menuRef = ref}
                            onPress={() => {
                                that._showMenu(appTheme, bookCaseStore, bookCaseStore.listType);
                            }}
                        >
                            <FastImage style={{ marginHorizontal: Dpi.d(20), height: Dpi.d(30), width: Dpi.d(40), resizeMode: FastImage.resizeMode.stretch }} source={ImageResource.menuIcon}></FastImage>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                SearchPage.openFrom = that.props.appStore.tabData.selectedPage;
                                that.props.appStore.tabData.selectedPage = 'SearchPage';
                                RecordUtil.clickRecord('null', RecordVar.click_bookcase_search, (new Date()).getTime());
                            }}
                        >
                            {/* <FastImage style={{ marginHorizontal: Dpi.d(20), height: Dpi.d(38), width: Dpi.d(43), resizeMode: 'stretch' }} source={ImageResource.menuIcon}></FastImage> */}
                            <FastImage style={{ marginHorizontal: Dpi.d(20), height: Dpi.d(44), width: Dpi.d(44), resizeMode: FastImage.resizeMode.stretch }} source={ImageResource.rankSearchIcon}></FastImage>
                        </TouchableOpacity>
                    </View>
                }
            ></NavigationBar>
        )
    }
}
