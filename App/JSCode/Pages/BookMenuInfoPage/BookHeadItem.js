/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native'
import AppUtils from '../../Utils/AppUtils'
import Dpi from '../../Utils/Dpi'
import FastImage from '../../Components/react-native-fast-image'
import { observer, inject } from 'mobx-react/native';
import { BoxShadow } from '../../Components/react-native-shadow'
import ImageResource from '../../../Resource/ImageResource';
import EventBus from '../../Utils/EventBus'
import GlobleKey from '../../Globle/GlobleKey'
/**
 * 分类页面
 */

const shadowOpt = {
    width: Dpi.d(180),
    height: Dpi.d(250),
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
        this._itemLongClick.bind(this);
    }

    _itemLongClick(itemData) {
        EventBus.emit(GlobleKey.EVENT_BOOKCASEITEM_LONGCLICK, itemData);
    }
    render() {
        let that = this;
        let bookMenuData = this.props.appStore.bookMenuInfoStore;
        let appTheme = that.props.appStore.appTheme;
        return (
            <View
                style={{ flexDirection: 'row', height: Dpi.d(313) }}
            >
                <Image
                    blurRadius={Dpi.d(20)}
                    source={{ uri: bookMenuData.bookMenuCover }}
                    style={{ position: 'absolute', width: AppUtils.size.width, height: Dpi.d(313) }}
                >

                </Image>
                <View
                    style={{ alignItems: 'center', position: 'absolute', width: AppUtils.size.width, height: Dpi.d(313), backgroundColor: '#00000010', flexDirection: 'row' }}
                >
                    <View
                        style={{
                            marginLeft: Dpi.d(30)
                        }}
                    >
                        <BoxShadow
                            setting={shadowOpt}
                        >
                            <Image
                                resizeMode='stretch'
                                style={{
                                    width: Dpi.d(180),
                                    height: Dpi.d(250),
                                    borderRadius: Dpi.d(8)
                                }}
                                source={{ uri: bookMenuData.bookMenuCover }}
                            >
                            </Image>
                        </BoxShadow>
                    </View>
                    <View style={{ marginLeft: Dpi.d(19), height: Dpi.d(212), width: Dpi.d(420), justifyContent: 'space-around', paddingVertical: Dpi.d(15) }}>
                        <Text numberOfLines={1} style={{ backgroundColor: 'transparent', color: appTheme.mainColor, fontSize: Dpi.s(29) }}>{bookMenuData.bookMenuName}</Text>
                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                            <FastImage source={ImageResource.bookCountIcon} style={{ width: Dpi.d(24), height: Dpi.d(25), resizeMode: 'stretch' }}></FastImage>
                            <Text style={{ backgroundColor: 'transparent', marginLeft: Dpi.d(10), fontSize: Dpi.s(25), color: appTheme.mainColor }}>{bookMenuData.bookCount}本</Text>
                        </View>
                        <Text numberOfLines={3} style={{ backgroundColor: 'transparent', fontSize: Dpi.d(25), color: appTheme.mainColor }}>{bookMenuData.bookMenuDescript}</Text>
                    </View>
                </View>

            </View >
        )
    }
}

