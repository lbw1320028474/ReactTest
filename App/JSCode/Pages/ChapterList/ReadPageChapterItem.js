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

@inject('appStore')
@observer
export default class ChapterItem extends Component {
    constructor(props) {
        super(props);
        this._itemClick.bind(this);
    }

    _itemClick(itemData) {
        EventBus.emit(GlobleKey.EVENT_READPAGE_OPENCHAPTERLIST);
        let timer = setInterval(() => {
            if (itemData) {
                EventBus.emit(GlobleKey.EVENT_BOOKREAD_RELOAD, { actionType: 6, chapterOrder: itemData.chapterOrder })
            }
            if (timer) {
                clearInterval(timer);
            }
        }, 300)
    }

    render() {
        try {
            let that = this;
            let itemData = that.props.data;
            let appTheme = that.props.appStore.appTheme;
            let readTheme = that.props.appStore.readPageStore.readTheme;
            return (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        that._itemClick(itemData);
                    }}
                >
                    <View
                        style={{ justifyContent: 'space-between', width: Dpi.d(500), alignItems: 'center', flexDirection: 'row', height: Dpi.d(87), }}
                    >
                        <Text numberOfLines={2} style={{ maxWidth: Dpi.d(450), fontSize: Dpi.s(30), color: (itemData.readState === 1) ? readTheme.hightTextColor : readTheme.mainTextColor }}>{itemData.chapterName}</Text>
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
                    <View
                        style={{
                            opacity: 0.2,
                            height: Dpi.d(1),
                            backgroundColor: readTheme.mainTextColor
                        }}
                    >

                    </View>
                </TouchableOpacity >
            )
        } catch (err) {
            return (
                <View></View>
            )
        }
    }
}

