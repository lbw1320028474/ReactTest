/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, ListView, ActivityIndicator, InteractionManager, TouchableHighlight } from 'react-native'
import Toast from '../../Components/teaset/components/Toast/Toast'
import ActionBar from './ActionBar/ActionBar'
import { observer, inject } from 'mobx-react/native';
import Dpi from '../../Utils/Dpi'
import BookIReadPageDraw from '../BookRead/BookIReadPageDraw'
import { observable } from 'mobx'
import FastImage from '../../Components/react-native-fast-image';
import ImageResource from '../../../Resource/ImageResource'
@inject('appStore')
@observer
export default class ReadLogPage extends Component {
    @observable
    listViewData = [];
    @observable
    dataLoadState = 0;
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.loadViewKey;
        this.isInLoad = false;
    }




    showLoadView() {
        return;
        let that = this;
        if (that.loadViewKey) return;
        that.loadViewKey = Toast.show({
            text: '加载中...',
            icon: <ActivityIndicator size='large' color={that.props.appStore.appTheme.mainColor} />,
            position: 'center',
            duration: 10000,
        });
    }

    _loadData(start = 0, limit = 20) {
        // let that = this;
        // that.isInLoad = true;
        // let readLogStore = that.props.appStore.readLogStore;
        // if (readLogStore && readLogStore != null && that.listViewData.length < readLogStore.readLogList.length) {
        //     let currentCount = that.listViewData.length;
        //     let addList = [];
        //     for (let i = currentCount; i < currentCount + limit && i < readLogStore.readLogList.length; ++i) {
        //         addList.push(readLogStore.readLogList[i]);
        //     }
        this.listViewData = this.props.appStore.readLogStore.readLogList;
        this.dataLoadState = 1;

        // console.log("加载阅读记录：" + this.listViewData.length);
    }

    componentWillUnmount() {
        this.hideLoadView();
    }

    componentDidMount() {
        let that = this;
        that.showLoadView();
        that._loadData();
    }

    hideLoadView() {
        let that = this;
        if (!that.loadViewKey) return;
        Toast.hide(that.loadViewKey);
        that.loadViewKey = undefined;
    }

    static open(navigation) {
        if (navigation) {
            navigation.navigate('KEY_SceneReadLogPage');
        }
    }




    _renderView() {
        let that = this;
        appTheme = that.props.appStore.appTheme;
        if (that.dataLoadState === 0) {
            return (
                < View >
                </View >
            )
        } else if (that.dataLoadState === 1) {
            if (that.listViewData && that.listViewData.length > 0) {
                return (
                    <ListView
                        removeClippedSubviews={true}
                        enableEmptySections={true}
                        style={{ flex: 1 }}
                        dataSource={this.ds.cloneWithRows(Array.from(that.listViewData))}
                        renderHeader={() => <View style={{ height: Dpi.d(20) }}></View>}
                        onEndReached={() => {
                            if (that.isInLoad === true) {
                                return;
                            }
                            that._loadData(that.listViewData.length)
                        }}
                        onEndReachedThreshold={1}
                        getItemLayout={(item, index) => ({ length: Dpi.d(255), offset: Dpi.d(255) * index, index: index })}
                        renderRow={(rowData) => {
                            return (
                                ConstBookItem(rowData, that.props.appStore.appTheme, that.props.navigation)
                            )
                        }}
                    />
                )
            } else {
                return (
                    <View>
                        <View
                            style={{ alignItems: 'center', marginTop: Dpi.d(146) }}
                        >
                            <FastImage
                                source={ImageResource.networkIserror}
                                style={{
                                    width: Dpi.d(326),
                                    height: Dpi.d(223),
                                    resizeMode: FastImage.resizeMode.stretch
                                }}
                            >
                            </FastImage>
                            <Text
                                style={{ fontSize: Dpi.s(30), color: appTheme.greyTextColor, marginTop: Dpi.d(44) }}
                            >还没有阅读记录</Text>
                        </View >
                        {
                            that.hideLoadView()
                        }
                    </View>
                )
            }
        } else {
            return (
                <View>
                    <View
                        style={{ alignItems: 'center', marginTop: Dpi.d(146) }}
                    >
                        <FastImage
                            source={ImageResource.networkIserror}
                            style={{
                                width: Dpi.d(326),
                                height: Dpi.d(223),
                                resizeMode: FastImage.resizeMode.stretch
                            }}
                        >
                        </FastImage>
                        <Text
                            style={{ fontSize: Dpi.s(30), color: appTheme.greyTextColor, marginTop: Dpi.d(44) }}
                        >加载失败，点击重试</Text>
                        <TouchableHighlight
                            underlayColor={appTheme.greyBgColor}
                            onPress={() => {
                                that.showLoadView();
                                that._loadData();
                            }}
                            style={{
                                marginTop: Dpi.d(40)
                            }}
                        >
                            <View
                                style={{ height: Dpi.d(80), width: Dpi.d(250), paddingVertical: Dpi.d(21), borderRadius: Dpi.d(8), justifyContent: 'center', alignItems: 'center', backgroundColor: appTheme.hightLightColor }}
                            >
                                <Text style={{ color: appTheme.mainColor, fontSize: Dpi.d(30) }}>重新加载</Text>
                            </View>
                        </TouchableHighlight>
                    </View >
                    {
                        that.hideLoadView()
                    }
                </View>
            )
        }
    }

    render() {
        let that = this;
        let appTheme = this.props.appStore.appTheme;
        let readLogStore = this.props.appStore.readLogStore;
        return (
            <View style={{ flex: 1, backgroundColor: appTheme.mainColor }}>
                <ActionBar
                    cleanCallBack={() => {
                        readLogStore.cleanLogBean();
                        that.listViewData = [];
                    }}
                    navigation={that.props.navigation}>
                </ActionBar>
                {
                    that._renderView()
                }
            </View>
        )
    }
}


const shadowOpt = {
    width: Dpi.d(192),
    height: Dpi.d(255),
    border: 5,
    radius: 1,
    opacity: 0.05,
    y: 1,
}

// @observable
//     bookId = '';

//     @observable
//     bookName = '';

//     @observable
//     bookCoverUrl = '';

//     @observable
//     bookAuthor = '';

//     @observable
//     lastReadTime = '';

//     @observable
//     lastReadChapterId = '';

//     @observable
//     lastReadChapterName = '';

//     @observable
//     lastReadChapterOrder = '';
const ConstBookItem = (item, appTheme, navigation) => (
    <TouchableHighlight
        style={{
            overflow: 'hidden',
        }}
        underlayColor={appTheme.greyBgColor}
        onPress={() => {
            BookIReadPageDraw.open(navigation, item.bookId + '', item.lastReadChapterOrder, item.lastReadPage, item.bookName, '', item.bookCoverUrl);
            // BookInfoDraw.open(navigation, item.bookId);
            // RecordUtil.clickRecord(item.bookId, RecordVar.click_list_item, (new Date()).getTime())
        }}

    >
        <View
            style={{ alignItems: 'center', flexDirection: 'row', paddingVertical: Dpi.d(20), paddingHorizontal: Dpi.d(30) }}
        >
            <FastImage
                style={{
                    backgroundColor: '#f5f5f5',
                    resizeMode: FastImage.resizeMode.stretch,
                    width: Dpi.d(192),
                    height: Dpi.d(255),
                }}
                source={{ uri: item.bookCoverUrl }}
            >
            </FastImage>
            <View style={{ marginLeft: Dpi.d(19), height: Dpi.d(255), width: Dpi.d(443), justifyContent: 'space-around', paddingVertical: Dpi.d(15) }}>
                <Text numberOfLines={1} style={{ fontWeight: 'bold', color: appTheme.groupTitleTextColor, fontSize: Dpi.s(29) }}>{item.bookName}</Text>
                <Text numberOfLines={1} style={{ lineHeight: Dpi.d(40), fontSize: Dpi.d(25), color: appTheme.greyTextColor }}>{item.bookAuthor}</Text>
                <Text numberOfLines={1} style={{ fontSize: Dpi.s(22), color: appTheme.lowGreyTextColor }}>上次阅读到：{item.lastReadChapterName}</Text>
                <Text style={{ maxWidth: Dpi.d(501), fontSize: Dpi.s(22), color: appTheme.lowGreyTextColor, padding: Dpi.d(5) }}>{item.lastReadTime}</Text>
            </View>
        </View>
    </TouchableHighlight >
)

