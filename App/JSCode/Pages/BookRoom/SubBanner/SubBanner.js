/**
 * Created by Rabbit 下午6:40
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import Dpi from '../../../Utils/Dpi'
import FastImage from '../../../Components/react-native-fast-image'
// import IndicatorViewPager from 'react-native-viewpager'
// // import { IndicatorViewPager, PagerDotIndicator } from 'react-native-viewpager'
import IndicatorViewPager from '../../../Components/viewpager/IndicatorViewPager'
import PagerDotIndicator from '../../../Components/viewpager/indicator/PagerDotIndicator'
import { observer, inject } from 'mobx-react/native';
import GlobleVar from '../../../Globle/GlobleVar'
import AppUtils from '../../../Utils/AppUtils'
import BookInfoDrawView from '../../BookInfo/BookInfoDraw';
import RecordUtil from '../../../Record/RecordUtil'
import RecordVar from '../../../Record/RecordVar'
import BookListPage from '../../BookList/BookListPage';
@inject('appStore')
@observer

export default class SubBanner extends Component {

    constructor(props) {
        super(props);
        this._bannerClick.bind(this);
    }


    _bannerClick(item) {
        RecordUtil.clickRecord(item.bannerId, RecordVar.click_room_subbanner, (new Date()).getTime());
        let that = this;
        if (item.bannerType === 3) {
            BookListPage.open(that.props.navigation, item.bannerId, item.bannerName)
        } else if (item.bannerType === 2) {
            BookInfoDrawView.open(that.props.navigation, item.bannerId);
        }
    }

    render() {
        let that = this;
        let bannerData = that.props.data;
        let bannerViews = [];
        if (bannerData && bannerData.groupBeanList && bannerData.groupBeanList.length > 0) {
            bannerViews = bannerData.groupBeanList.map((item, index) => {
                return (
                    <View key={index}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                that._bannerClick(item);
                            }}
                        >
                            <FastImage
                                source={{ uri: item.bannerImage }}
                                style={{ height: GlobleVar.bookRoomSubBannerHeight, width: AppUtils.size.width + 2 }}
                            ></FastImage>
                        </TouchableWithoutFeedback>
                    </View>
                )
            })
        }
        return (
            <View
                style={{
                    overflow: 'hidden',
                    height: GlobleVar.bookRoomSubBannerHeight,
                    marginBottom: Dpi.d(20)
                }}
            >
                {bannerViews}
            </View>
            // <IndicatorViewPager
            //     autoPlayEnable={true}
            //     autoPlayInterval={5000}
            //     style={{ height: GlobleVar.bookRoomSubBannerHeight, marginBottom: Dpi.d(20) }}
            //     indicator={that._renderDotIndicator(that)}
            // >
            //     {bannerViews}
            // </IndicatorViewPager>
        )
    }

    // _renderDotIndicator(that) {
    //     let bannerSize = 0;
    //     let bannerData = that.props.data;
    //     let bannerViews = [];
    //     if (bannerData && bannerData.groupBeanList && bannerData.groupBeanList.length > 0) {
    //         bannerSize = bannerData.groupBeanList.length;
    //     }
    //     return <PagerDotIndicator pageCount={bannerSize} />;
    // }
}
