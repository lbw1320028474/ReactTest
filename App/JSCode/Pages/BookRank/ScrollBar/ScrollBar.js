/**
 * Created by Rabbit 下午6:40
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
    ScrollView
} from 'react-native';
import Dpi from '../../../Utils/Dpi'
import AppUtils from '../../../Utils/AppUtils'
import FastImage from '../../../Components/react-native-fast-image'
import ImageResource from '../../../../Resource/ImageResource'
import Overlay from '../../../Components/teaset/components/Overlay/Overlay'
import RecordUtil from '../../../Record/RecordUtil'
import RecordVar from '../../../Record/RecordVar'
import { observer, inject } from 'mobx-react/native';
import AppTheme from '../../../Themes/AppTheme';
@inject('appStore')
@observer
export default class ActionBar extends Component {
    constructor(props) {
        super(props)
        this._itemClick.bind(this);
    }

    _itemClick(item, index) {
        RecordUtil.clickRecord(item.rankId + '', RecordVar.click_rank_group, (new Date()).getTime());
        let rankStore = this.props.appStore.bookRankStore;
        rankStore.showIndex = index;
    }

    _renderItem() {
        let that = this;
        let rankStore = that.props.appStore.bookRankStore;
        let appTheme = this.props.appStore.appTheme;
        let itemView = [];
        if (rankStore && rankStore.rankList && rankStore.rankList.length > 0) {
            itemView = rankStore.rankList.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        style={{ justifyContent: 'center', height: Dpi.d(100), width: Dpi.d(175), }}
                        onPress={() => {
                            that._itemClick(item, index);
                        }}
                    >
                        <FastImage
                            style={{
                                position: 'absolute',
                                resizeMode: FastImage.resizeMode.stretch,
                                width: Dpi.d(175),
                                height: Dpi.d(100),
                            }}
                            source={(rankStore.showIndex === index) ? ImageResource.rankItemSelected : ImageResource.rankItemNormal}
                        >
                        </FastImage>
                        <Text numberOfLines={2} style={{ paddingHorizontal: Dpi.d(5), textAlign: 'center', fontSize: Dpi.s(26), backgroundColor: 'transparent', color: (rankStore.showIndex === index) ? appTheme.hightLightTextColor : appTheme.mainTextColor }}>{item.rankName}</Text>
                    </TouchableOpacity>
                )
            })
        }
        if (itemView && itemView.length > 0) {
            return itemView;
        } else {
            return null;
        }
    }

    render() {
        let that = this;
        let appTheme = this.props.appStore.appTheme;
        // <View style={{ width: Dpi.d(175) }}>

        //         <Text>热搜榜</Text>
        //     </View>
        return (
            <View
                style={{ width: Dpi.d(175), }}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {
                        that._renderItem()
                    }
                </ScrollView>
            </View>
        )
    }
}
