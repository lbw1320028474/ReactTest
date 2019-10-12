//五大模块入口
import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';

import NetWorkUtil from '../../../Network/NetWorkUtil'
import AppUtils from '../../../Utils/AppUtils'
import GlobleVar from '../../../Globle/GlobleVar'
import GlobleUrl from '../../../Globle/GlobleUrl'
import Dpi from '../../../Utils/Dpi'
import GetSearchTipsRequest from '../../../Protocol/GetSearchTipsRequest'
import { observer, inject } from 'mobx-react/native';
import { observable, autorun } from 'mobx';
import Theme from '../../../Components/teaset/themes/Theme'
@inject('appStore')
@observer
export default class GuessWordView extends Component {
    @observable
    dataList = [];
    constructor(props) {
        super(props);
        this.nowGessWord = '';
        this._itemClick.bind(this);
    }


    _itemClick(item) {
        let that = this;
        let searchStore = that.props.appStore.searchStore;
        if (item && item.length > 0) {
            searchStore.setSearchWord(item);
        }
    }

    guessWord() {
        let that = this;
        let searchStore = that.props.appStore.searchStore;
        if (searchStore.gessWord && searchStore.gessWord.length > 0) {
            let searchTipsRequest = new GetSearchTipsRequest();
            searchTipsRequest.searchKeyWord = searchStore.gessWord;
            NetWorkUtil.getJsonByPost(GlobleUrl.URL_BASE_URL + GlobleUrl.URL_SEARCHTIPS,
                JSON.stringify(searchTipsRequest),
                (data) => {
                    console.log(JSON.stringify(data))
                    if (data && data.msgCode === 200 && data.tipWords && data.tipWords.length > 0) {
                        if (searchStore.gessWord && searchStore.gessWord.length > 0) {
                            that.dataList = data.tipWords;
                        }
                    }
                },
                (err) => {
                    this.dataList = [];
                }
            )
        } else {
            this.dataList = [];
        }
    }

    componentDidMount() {
        let that = this;
        autorun(() => {
            let searchStore = that.props.appStore.searchStore;
            if (searchStore.gessWord && searchStore.gessWord.length > 0) {
                that.guessWord();
            } else {
                that.dataList = [];
            }
        })
    }
    render() {
        let that = this;
        let guessItems = [];
        let searchStore = that.props.appStore.searchStore;
        let appTheme = that.props.appStore.appTheme;
        if (that.dataList && that.dataList !== null && that.dataList.length > 0) {
            guessItems = that.dataList.map((item, index) => {
                if (index < 7) {
                    try {
                        let wordArray = item.split(searchStore.gessWord, 2);
                        return (
                            <View
                                key={index}

                            >
                                <TouchableHighlight
                                    underlayColor={appTheme.bgHightColor}
                                    style={{ paddingHorizontal: Dpi.d(30), justifyContent: 'center', height: Dpi.d(105) }}
                                    onPress={() => {
                                        that._itemClick(item);
                                    }}
                                >
                                    {
                                        (wordArray && wordArray.length >= 2) ? <Text style={{ fontSize: Dpi.s(30), color: appTheme.greyTextColor }}>{wordArray[0]}<Text style={{ fontSize: Dpi.s(30), color: appTheme.hightLightTextColor }}>{searchStore.gessWord}</Text>{wordArray[1]}</Text> :
                                            <Text numberOfLines={1} style={{ fontSize: Dpi.s(30), color: appTheme.greyTextColor }}>{item}</Text>
                                    }
                                </TouchableHighlight>
                                <View style={{ opacity: 0.2, backgroundColor: appTheme.greyTextColor, height: Dpi.d(1) }}></View>
                            </View>
                        )
                    } catch (err) {
                        return (
                            <View
                                key={index}
                            >
                                <TouchableHighlight
                                    underlayColor={appTheme.bgHightColor}
                                    style={{ paddingHorizontal: Dpi.d(30), justifyContent: 'center', height: Dpi.d(105) }}
                                    onPress={() => {
                                        that._itemClick(item);
                                    }}
                                >
                                    <Text numberOfLines={1} style={{ fontSize: Dpi.s(30), color: appTheme.greyTextColor }}>{item}</Text>
                                </TouchableHighlight>
                                <View style={{ opacity: 0.2, backgroundColor: appTheme.greyTextColor, height: Dpi.d(1) }}></View>
                            </View>
                        )
                    }
                }
            })
            return (
                <View style={{
                    backgroundColor: appTheme.mainBgColor,
                    position: 'absolute',
                    width: AppUtils.size.width,
                    height: AppUtils.size.height,
                }}>
                    {(guessItems && guessItems !== null && guessItems.length > 0) ? guessItems : null}
                </View>
            )
        } else {
            return <View></View>
        }
    }
}
