//五大模块入口
import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    Image,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';

import NetWorkUtil from '../../../Network/NetWorkUtil'
import AppUtils from '../../../Utils/AppUtils'
import GlobleVar from '../../../Globle/GlobleVar'
import GlobleUrl from '../../../Globle/GlobleUrl'
import Dpi from '../../../Utils/Dpi'
import GetSearchWordsRequest from '../../../Protocol/GetSearchWordsRequest'
import { observer, inject } from 'mobx-react/native';
import { observable } from 'mobx';
import RecordUtil from '../../../Record/RecordUtil'
import RecordVar from '../../../Record/RecordVar'
@inject('appStore')
@observer
export default class GuessWordView extends Component {
    constructor(props) {
        super(props);
        this.dataList = null;
        this._itemClick.bind(this);
        this.hotSearchData;
        this.state = {
            dataState: 0,
            reRender: false
        }
    }


    _itemClick(item) {
        let that = this;
        let searchStore = that.props.appStore.searchStore;
        RecordUtil.clickRecord('null', RecordVar.click_search_hotsearch, (new Date()).getTime());
        if (item && item.length > 0) {
            searchStore.setSearchWord(item);
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.dataState !== nextState.dataState || this.state.reRender !== nextState.reRender) {
            return true;
        } else {
            return false;
        }
    }

    componentDidMount() {
        let that = this;
        let searchWordsRequest = new GetSearchWordsRequest();
        let searchRank = that.props.appStore.searchStore;
        if (searchRank.hotSearchList && searchRank.hotSearchList.length > 0) {
            return;
        }
        NetWorkUtil.getJsonByPost(
            GlobleUrl.URL_BASE_URL + GlobleUrl.URL_SEARCH_WORD_LIST,
            JSON.stringify(searchWordsRequest),
            (data) => {
                if (data && data.msgCode === 200) {

                    if (data.bookWords && data.tagWords) {
                        let hotSearchData = data.bookWords.concat(data.tagWords);
                        searchRank.hotSearchList = hotSearchData;
                    } else if (data.bookWords) {
                        let hotSearchData = data.bookWords;
                        searchRank.hotSearchList = hotSearchData;
                    } else if (data.tagWords) {
                        let hotSearchData = data.tagWords;
                        searchRank.hotSearchList = hotSearchData;
                    }
                }
            },
            (err) => {

            }
        )
    }
    render() {
        let that = this;
        let searchRank = that.props.appStore.searchStore;
        let appTheme = that.props.appStore.appTheme;
        if (searchRank.hotSearchList && searchRank.hotSearchList.length > 0) {
            let views = [];
            views = searchRank.hotSearchList.map((item, index) => {
                let bgColor = '#8fc4ec';
                if (index % 7 === 0) {
                    bgColor = '#8fc4ec';
                } else if (index % 7 === 1) {
                    bgColor = '#8bd0d7';
                } else if (index % 7 === 2) {
                    bgColor = '#f2935b';
                } else if (index % 7 === 3) {
                    bgColor = '#beb1cd';
                } else if (index % 7 === 4) {
                    bgColor = '#eb8b8d';
                } else if (index % 7 === 5) {
                    bgColor = '#69cab6';
                } else if (index % 7 === 6) {
                    bgColor = '#f7bc7a';
                }
                return (
                    <TouchableOpacity style={{ marginRight: Dpi.d(30), backgroundColor: bgColor, marginVertical: Dpi.d(10), justifyContent: 'center', height: Dpi.d(56) }} key={index} onPress={() => {
                        that._itemClick(item)
                    }}>
                        <Text
                            numberOfLines={1}
                            style={{
                                paddingHorizontal: Dpi.d(20),
                                textAlign: 'center',
                                borderRadius: Dpi.d(30),
                                fontSize: Dpi.s(26),
                                color: appTheme.mainColor,
                                marginHorizontal: Dpi.d(5),
                                marginVertical: Dpi.d(5),
                                paddingVertical: Dpi.d(5),
                            }}>{item}</Text>
                    </TouchableOpacity>
                )
            })
            return (
                <View style={{ backgroundColor: appTheme.mainBgColor, paddingVertical: Dpi.d(24) }}>
                    <View style={{ flexDirection: 'row', paddingHorizontal: Dpi.d(41), paddingBottom: Dpi.d(24) }}>
                        <View style={{ width: Dpi.d(8), backgroundColor: appTheme.hightLightColor }}></View>
                        <Text style={{ marginLeft: Dpi.d(10), fontSize: Dpi.s(27), color: appTheme.groupTitleTextColor }}>大家都在搜</Text>
                    </View>
                    <View style={{
                        paddingHorizontal: Dpi.d(41),
                        paddingTop: Dpi.d(0),
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}>
                        {(views && views.length > 0) ? views : null}
                    </View>
                </View>
            )
        } else {
            return <View></View>
        }
    }
}
