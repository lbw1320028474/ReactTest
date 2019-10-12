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
import AppUtils from '../../Utils/AppUtils'
import Dpi from '../../Utils/Dpi'
import FastImage from '../../Components/react-native-fast-image'
import { observer, inject } from 'mobx-react/native';
import ImageResource from '../../../Resource/ImageResource';
import EventBus from '../../Utils/EventBus'
import GlobleKey from '../../Globle/GlobleKey'
import BookIReadPageDraw from '../BookRead/BookIReadPageDraw'

@inject('appStore')
@observer
export default class ChapterItem extends Component {
    constructor(props) {
        super(props);
        this._itemClick.bind(this);
    }

    _itemClick(itemData) {
        try {
            if (this.props.appStore.chapterListStore.bookId) {
                EventBus.emit(GlobleKey.EVENT_BOOKINFO_OPENCHAPTERLIST);
                BookIReadPageDraw.open(this.props.navigation, this.props.appStore.chapterListStore.bookId, itemData.chapterOrder)
            }
        } catch (err) {
            //console.log('加载失败')
        }
    }

    render() {
        let that = this;
        let itemData = that.props.data;
        let appTheme = that.props.appStore.appTheme;
        return (
            <TouchableHighlight
                underlayColor={appTheme.greyBgColor}
                onPress={() => {
                    that._itemClick(itemData);
                }}
            >
                <View
                    style={{ justifyContent: 'space-between', maxWidth: Dpi.d(500), alignItems: 'center', flexDirection: 'row', height: Dpi.d(87), borderBottomColor: '#dedfe0', borderBottomWidth: AppUtils.pixel }}
                >
                    <Text numberOfLines={2} style={{ maxWidth: Dpi.d(450), fontSize: Dpi.s(30), color: appTheme.mainTextColor }}>{itemData.chapterName}</Text>
                    {
                        (itemData.catchState === 2) ? <FastImage
                            style={{
                                width: Dpi.d(32),
                                height: Dpi.d(32),
                                resizeMode: FastImage.resizeMode.stretch
                            }}
                            source={ImageResource.hascatchIcon}
                        ></FastImage> :
                            null
                    }

                </View>
            </TouchableHighlight >
        )
    }
}

