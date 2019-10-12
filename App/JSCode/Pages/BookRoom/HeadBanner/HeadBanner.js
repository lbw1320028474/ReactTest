/**
 * Created by Rabbit 下午6:40
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Dpi from '../../../Utils/Dpi'
import FastImage from 'react-native-fast-image'
// import IndicatorViewPager from 'react-native-viewpager'
// // import { IndicatorViewPager, PagerDotIndicator } from 'react-native-viewpager'
import IndicatorViewPager from '../../../Components/viewpager/IndicatorViewPager'
import PagerDotIndicator from '../../../Components/viewpager/indicator/PagerDotIndicator'
import { observer, inject } from 'mobx-react/native';
import GlobleVar from '../../../Globle/GlobleVar'
import AppUtils from '../../../Utils/AppUtils'
import BookInfoDrawView from '../../BookInfo/BookInfoDraw';
import WebViewPage from '../../WebPage/WebViewPage';
import BookListPage from '../../BookList/BookListPage';
import RecordUtil from '../../../Record/RecordUtil'
import PageIndicator from './PageIndicator'
import RecordVar from '../../../Record/RecordVar'
@inject('appStore')
@observer

export default class HeadBanner extends Component {

    constructor(props) {
        super(props);
        this._bannerClick.bind(this);
        this.scrollViewRef;
        this.itemViews = [];
        this.nowPageIndex = 0;
        this.indicatorRef;
        this.autoPlayTime;
    }


    _bannerClick(item) {
        RecordUtil.clickRecord(item.bannerId, RecordVar.click_room_banner, (new Date()).getTime());
        let that = this;
        if (item.bannerType == 3) {
            BookListPage.open(that.props.navigation, item.bannerId, item.bannerName)
        } else if (item.bannerType == 1) {
            WebViewPage.open(that.props.navigation, item.bannerUrl, item.bannerName);
        } else if (item.bannerType == 2) {
            // alert(JSON.stringify(item))
            BookInfoDrawView.open(that.props.navigation, item.bannerId);
        }
    }

    componentDidMount() {
        this._startAutoPlay();
    }

    componentWillUnmount() {
        this._stopAutoPlay();
    }


    _stopAutoPlay() {
        if (this.autoPlayTime) {
            clearInterval(this.autoPlayTime);
        }
    }

    _startAutoPlay() {
        let that = this;
        if (that.itemViews && that.itemViews.length > 1) {
            that.autoPlayTime = setInterval(() => {
                if (that.scrollViewRef) {
                    if (that.nowPageIndex + 1 < that.itemViews.length) {
                        that.nowPageIndex += 1;
                        that.scrollViewRef.scrollTo({ x: that.nowPageIndex * AppUtils.size.width, y: 0, animated: true })
                    } else {
                        that.nowPageIndex = 0;
                        that.scrollViewRef.scrollTo({ x: 0, y: 0, animated: true })
                    }
                }
                if (that.indicatorRef) {
                    that.indicatorRef.setSelected(that.nowPageIndex)
                }
            }, 5000)
        }
    }

    render() {
        let that = this;
        let bannerData = that.props.data;
        that.itemViews = [];
        if (bannerData && bannerData.groupBeanList && bannerData.groupBeanList.length > 0) {
            that.itemViews = bannerData.groupBeanList.map((item, index) => {
                return (
                    <View
                        style={{
                            height: GlobleVar.bookRoomHeadBannerHeight,
                            width: AppUtils.size.width
                        }}
                        key={index}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPressIn={() => {
                                that._stopAutoPlay();
                            }}
                            onPressOut={() => {
                                that._startAutoPlay();
                            }}
                            onPress={() => {
                                that._bannerClick(item);
                            }}
                        >
                            <Image
                                resizeMode='stretch'
                                source={{ uri: item.bannerImage }}
                                style={{ height: GlobleVar.bookRoomHeadBannerHeight, width: AppUtils.size.width }}
                            ></Image>
                        </TouchableOpacity>
                    </View>
                )
            })
        }
        return (
            // <View>
            //     <Text>雷帮文</Text>
            // </View>
            <View
                style={{
                    overflow: 'hidden',
                    height: GlobleVar.bookRoomHeadBannerHeight,
                    width: AppUtils.size.width,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(event) => {
                        let pageIndex = Math.round(event.nativeEvent.contentOffset.x / AppUtils.size.width);
                        if (that.indicatorRef) {
                            that.indicatorRef.setSelected(pageIndex)
                        }
                    }}
                    ref={ref => that.scrollViewRef = ref}
                    pagingEnabled={true}
                    style={{
                        height: GlobleVar.bookRoomHeadBannerHeight,
                        width: AppUtils.size.width
                    }}
                    horizontal={true}
                >
                    {
                        that.itemViews
                    }
                </ScrollView>
                <PageIndicator
                    ref={ref => that.indicatorRef = ref}
                    size={that.itemViews.length}></PageIndicator>
            </View>
            // <IndicatorViewPager
            //     autoPlayEnable={true}
            //     autoPlayInterval={5000}
            //     style={{ height: GlobleVar.bookRoomHeadBannerHeight }}
            //     indicator={that._renderDotIndicator(that)}
            // >
            //     {
            //         that.itemViews
            //     }
            // </IndicatorViewPager>
        )
    }

    // _renderDotIndicator(that) {
    //     let bannerSize = 0;
    //     let bannerData = that.props.data;
    //     let that.itemViews = [];
    //     if (bannerData && bannerData.groupBeanList && bannerData.groupBeanList.length > 0) {
    //         bannerSize = bannerData.groupBeanList.length;
    //     }
    //     return <PagerDotIndicator pageCount={bannerSize} />;
    // }
}
