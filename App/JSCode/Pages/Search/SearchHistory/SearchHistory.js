import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import AppUtils from '../../../Utils/AppUtils'
import GlobleKey from '../../../Globle/GlobleKey'
import Dpi from '../../../Utils/Dpi'

import { observer, inject } from 'mobx-react/native';
import { observable } from 'mobx';
import MySorage from '../../../Utils/MyStore/MySorage';

@inject('appStore')
@observer
export default class SearchHistory extends Component {
    constructor(props) {
        super(props);
        let that = this;
        this._itemClick.bind(this);

    }



    _itemClick(item) {
        let that = this;
        let searchStore = that.props.appStore.searchStore;
        if (item && item.length > 0) {
            searchStore.setSearchWord(item);
        }
        // alert('点击了' + item)
    }


    _renderSearchHistoryView(that) {
        let searchHistory = that.props.appStore.searchStore.searchHistoryList;
        let appTheme = that.props.appStore;
        if (searchHistory && searchHistory.length > 0) {
            let searchHistoryView = searchHistory.map((item, index) => {
                if (index < 10) {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => that._itemClick(item)}>
                            <View
                                style={{ margin: Dpi.d(10), padding: Dpi.d(10), borderColor: appTheme.greyTextColor, borderWidth: AppUtils.pixel, borderRadius: Dpi.d(3) }}
                            >

                                <Text numberOfLines={1} style={{
                                    fontSize: Dpi.s(26),
                                    color: appTheme.greyTextColor
                                }}>{item}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
            });
            return searchHistoryView;
        } else {
            return <View></View>;
        }
    }

    componentDidMount() {
        let that = this;
        MySorage._load(GlobleKey.KeySearchHistoryList, (data) => {
            if (data && data.length > 0) {
                that.props.appStore.searchStore.searchHistoryList = data;
            }
        })
    }

    render() {
        let that = this;
        let appTheme = that.props.appStore.appTheme;
        if (that.props.appStore.searchStore.searchHistoryList.length > 0) {

            return (
                <View style={{ backgroundColor: appTheme.mainBgColor, borderRadius: Dpi.d(5), borderTopColor: appTheme.devideLineColor, borderTopWidth: Dpi.d(1) }}>
                    <View style={{ flexDirection: 'row', marginTop: Dpi.d(60), justifyContent: 'space-between', alignItems: 'center' }}>
                        <View
                            style={{ marginLeft: Dpi.d(40), flexDirection: 'row' }}
                        >
                            <View style={{ width: Dpi.d(8), backgroundColor: appTheme.hightLightColor }}></View>
                            <Text style={{ marginLeft: Dpi.d(10), color: '#757575' }}>历史搜索</Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            that.props.appStore.searchStore.searchHistoryList = [];
                            MySorage._remove(GlobleKey.KeySearchHistoryList);
                        }}>
                            <Text style={{ marginRight: Dpi.d(31), fontSize: Dpi.s(26), color: appTheme.mainTextColor }}>清空</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        padding: Dpi.d(30),
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}>
                        {that._renderSearchHistoryView(that)}
                    </View>
                </View >
            )
        } else {
            return (
                <View></View>
            )
        }
    }


}

