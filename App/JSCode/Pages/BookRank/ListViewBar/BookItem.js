/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native'
import AppUtils from '../../../Utils/AppUtils'
import Dpi from '../../../Utils/Dpi'
import FastImage from '../../../Components/react-native-fast-image'
import { observer, inject } from 'mobx-react/native';
import { BoxShadow } from '../../../Components/react-native-shadow'
import ImageResource from '../../../../Resource/ImageResource';
import EventBus from '../../../Utils/EventBus'
import BookInfoDraw from '../../BookInfo/BookInfoDraw'
import GlobleKey from '../../../Globle/GlobleKey'
import RecordUtil from '../../../Record/RecordUtil'
import RecordVar from '../../../Record/RecordVar'
/**
 * 分类页面
 */

const shadowOpt = {
    width: Dpi.d(110),
    height: Dpi.d(170),
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
        this._itemClick.bind(this);
    }

    _itemClick(itemData) {
        if (itemData) {
            RecordUtil.clickRecord(itemData.bookId + '', RecordVar.click_rank_item, (new Date()).getTime());
            BookInfoDraw.open(this.props.navigation, itemData.bookId);
        }
    }

    render() {
        let that = this;
        let itemData = that.props.data;
        let appTheme = that.props.appStore.appTheme;
        let rankIcon;
        if (itemData.rankNum < 3) {
            let iconImage;
            if (itemData.rankNum === 0) {
                iconImage = ImageResource.rank_01;
            } else if (itemData.rankNum === 1) {
                iconImage = ImageResource.rank_02;
            } else if (itemData.rankNum === 2) {
                iconImage = ImageResource.rank_03;
            }
            rankIcon = <FastImage
                style={{
                    right: Dpi.d(19),
                    top: Dpi.d(35),
                    position: 'absolute',
                    resizeMode: FastImage.resizeMode.stretch,
                    width: Dpi.d(41),
                    height: Dpi.d(50),
                }}
                source={iconImage}
            >
            </FastImage>
        } else if (itemData.rankNum < 11) {
            rankIcon = <Text style={{
                right: Dpi.d(19),
                top: Dpi.d(35),
                position: 'absolute',
                fontSize: Dpi.s(35),
                color: appTheme.subTextColor
            }}>{(itemData.rankNum + 1)}</Text>
        }
        return (
            <TouchableHighlight
                underlayColor={appTheme.greyBgColor}
                onPress={() => {
                    that._itemClick(itemData);
                }}

            >
                <View
                    style={{ alignItems: 'center', flexDirection: 'row', padding: Dpi.d(18) }}
                >
                    {/* <BoxShadow
                        setting={shadowOpt}
                    > */}
                    <FastImage
                        ref={ref => this.FastImage = ref}
                        style={{
                            backgroundColor: '#f5f5f5',
                            resizeMode: FastImage.resizeMode.stretch,
                            width: Dpi.d(110),
                            height: Dpi.d(170),
                        }}
                        source={{ uri: itemData.bookCoverUrl }}
                    >
                    </FastImage>
                    {/* </BoxShadow> */}
                    <View style={{ marginLeft: Dpi.d(19), height: Dpi.d(210), width: Dpi.d(380), justifyContent: 'space-around', paddingVertical: Dpi.d(15) }}>
                        <Text numberOfLines={1} style={{ fontWeight: 'bold', color: appTheme.groupTitleTextColor, fontSize: Dpi.s(29), maxWidth: Dpi.d(300) }}>{itemData.bookName}</Text>
                        <Text numberOfLines={2} style={{ fontSize: Dpi.d(25), color: appTheme.greyTextColor }}>{itemData.bookDescript}</Text>
                        <View style={{ flexDirection: 'row', width: Dpi.d(380), justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', width: Dpi.d(190), alignItems: 'center' }}>
                                <FastImage source={ImageResource.authorIcon} style={{ width: Dpi.d(24), height: Dpi.d(25), resizeMode: FastImage.resizeMode.stretch }}></FastImage>
                                <Text style={{ marginLeft: Dpi.d(10), fontSize: Dpi.s(25), color: appTheme.lowGreyTextColor }}>{itemData.bookAuthor}</Text>
                            </View>
                            <Text numberOfLines={1} style={{ maxWidth: Dpi.d(190), fontSize: Dpi.s(22), color: appTheme.lowGreyTextColor, borderRadius: Dpi.d(2), borderWidth: Dpi.d(1), borderColor: appTheme.lowGreyTextColor, padding: Dpi.d(5)}}>玄幻魔法</Text>
                        </View>
                    </View>
                    {
                        rankIcon
                    }

                </View>
            </TouchableHighlight >
        )
    }
}

