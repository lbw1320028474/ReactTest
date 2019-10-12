/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, TouchableHighlight } from 'react-native'
import AppUtils from '../../Utils/AppUtils'
import Dpi from '../../Utils/Dpi'
import FastImage from '../../Components/react-native-fast-image'
import { observer, inject } from 'mobx-react/native';
import { BoxShadow } from '../../Components/react-native-shadow'
import ImageResource from '../../../Resource/ImageResource';
import EventBus from '../../Utils/EventBus'
import GlobleKey from '../../Globle/GlobleKey'
import BookMenuInfoView from '../BookMenuInfoPage/BookMenuInfoView'
import RecordVar from '../../Record/RecordVar'
import RecordUtil from '../../Record/RecordUtil'
/**
 * 分类页面
 */

const shadowOpt = {
    width: Dpi.d(157),
    height: Dpi.d(215),
    border: 5,
    radius: 1,
    opacity: 0.05,
    y: 1,
}

@inject('appStore')
@observer
export default class BookItem extends Component {
    constructor(props) {
        super(props);
        // this._itemLongClick.bind(this);
    }

    // _itemLongClick(itemData) {
    //     EventBus.emit(GlobleKey.EVENT_BOOKCASEITEM_LONGCLICK, itemData);
    // }
    render() {
        let that = this;
        let itemData = that.props.data;
        let appTheme = that.props.appStore.appTheme;
        return (
            <TouchableHighlight
                style={{
                    overflow: 'hidden',
                }}
                underlayColor={appTheme.greyBgColor}
                onPress={() => {
                    RecordUtil.clickRecord(itemData.bookMenuId, RecordVar.click_bookmenu_list_item, (new Date()).getTime());
                    BookMenuInfoView.open(that.props.navigation, itemData.bookMenuId)
                }}
            >
                <View
                    style={{ alignItems: 'center', flexDirection: 'row', paddingHorizontal: Dpi.d(40), paddingTop: Dpi.d(40) }}
                >
                    {/* <BoxShadow
                        setting={shadowOpt}
                    > */}
                    <FastImage
                        style={{
                            backgroundColor: '#f5f5f5',
                            resizeMode: FastImage.resizeMode.stretch,
                            width: Dpi.d(157),
                            height: Dpi.d(215),
                        }}
                        source={{ uri: itemData.bookMenuCover }}
                    >
                    </FastImage>
                    {/* </BoxShadow> */}
                    <View style={{ marginLeft: Dpi.d(19), height: Dpi.d(215), width: Dpi.d(470), justifyContent: 'space-around', paddingVertical: Dpi.d(10) }}>
                        <Text numberOfLines={1} style={{ fontWeight: 'bold', color: appTheme.groupTitleTextColor, fontSize: Dpi.s(29) }}>{itemData.bookMenuName}</Text>
                        <Text numberOfLines={2} style={{ lineHeight: Dpi.d(33), fontSize: Dpi.d(26), color: appTheme.greyTextColor }}>{itemData.bookMenuDescript}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FastImage source={ImageResource.bookCountIcon} style={{ tintColor: appTheme.lowGreyTextColor, width: Dpi.d(24), height: Dpi.d(25), resizeMode: 'stretch' }}></FastImage>
                            <Text style={{ marginLeft: Dpi.d(10), fontSize: Dpi.s(25), color: appTheme.hightLightTextColor }}>{itemData.bookCount}本</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight >
        )
    }
}

