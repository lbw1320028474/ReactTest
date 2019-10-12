import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ListView,
    InteractionManager,
    TouchableHighlight,
    Keyboard,
    ActivityIndicator
} from 'react-native';
import Dpi from '../../../Utils/Dpi'
import GlobleKey from '../../../Globle/GlobleKey'
import GlobleVar from '../../../Globle/GlobleVar'
import GlobleUrl from '../../../Globle/GlobleUrl'
import AppUtils from '../../../Utils/AppUtils'
import BookBean from './Store/BookBean'
import FastImage from '../../../Components/react-native-fast-image'
import GetSearchBookListRequest from '../../../Protocol/GetSearchBookListRequest'
import NetWorkUtil from '../../../Network/NetWorkUtil'
import Toast from '../../../Components/teaset/components/Toast/Toast'
import { Bars } from '../../../Components/react-native-loader';
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
import ImageResource from '../../../../Resource/ImageResource'
import { observer, inject } from 'mobx-react/native';
import { observable, autorun } from 'mobx';
import MySorage from '../../../Utils/MyStore/MySorage';
import BookItem from './BookItem'
import EventBus from '../../../Utils/EventBus';

@inject('appStore')
@observer
export default class SearchList extends Component {
    @observable
    searchState = -1;        //0正在搜索, 1搜索成功（有结果）， 2搜索失败（请求失败）， 3搜索完成但是无结果
    constructor(props) {
        super(props);
        let that = this;
        that.loadViewKey;
        this.isInLoad = false;
        this.searchKeyWord = '';
        // autorun(() => {
        //     if (that.props.appStore.searchStore.searchKeWord) {
        //         that.props.appStore.searchStore.searchBeanList = [];
        //         alert('清理列表')
        //     }
        // })
        this.searchListener = () => {
            let searchStore = that.props.appStore.searchStore;
            if (searchStore.searchKeWord && searchStore.searchKeWord.length > 0) {
                console.log('监听到搜索词变化，开始搜索' + ' + ' + searchStore.searchKeWord)
                Keyboard.dismiss();
                that._toSarchNovel()
            }
        }
    }

    componentDidMount() {
        let that = this;
        that.props.appStore.searchStore.searchBeanList = [];
        Keyboard.dismiss();
        that._toSarchNovel()
        EventBus.on(GlobleKey.EVENT_TO_SEARCH, that.searchListener);
    }

    componentWillUnmount() {
        this.hideLoadView();
        EventBus.removeListener(GlobleKey.EVENT_TO_SEARCH, this.searchListener);
    }

    _renderLoadView() {
        let that = this;
        return (
            <View style={{
                width: Dpi.d(200),
                height: Dpi.d(150),
                backgroundColor: that.props.appStore.appTheme.mainColor,
                margin: Dpi.d(-40)
            }}>
                <ActivityIndicator size='large' color={that.props.appStore.appTheme.hightLightColor}></ActivityIndicator>
            </View>
        )
    }

    showLoadView() {
        let that = this;
        if (that.loadViewKey) return;
        that.loadViewKey = Toast.show({
            text: '加载中...',
            icon: <ActivityIndicator size='large' color={that.props.appStore.appTheme.mainColor} />,
            position: 'center',
            duration: 10000,
        });
    }

    hideLoadView() {
        let that = this;
        if (!that.loadViewKey) return;
        Toast.hide(that.loadViewKey);
        that.loadViewKey = undefined;
    }

    _toSarchNovel() {
        let that = this;
        if (that.isInLoad === true) {
            return;
        }
        let searchStore = that.props.appStore.searchStore;
        // alert(searchStore.searchKeWord + ' + 搜索关键词')
        if (searchStore.searchKeWord && searchStore.searchKeWord.length > 0) {
            if (that.searchKeyWord !== searchStore.searchKeWord) {
                that.searchState = 0;
                searchStore.searchBeanList = [];
                that.searchKeyWord = searchStore.searchKeWord;
            }
            let searchBookListRequest = new GetSearchBookListRequest();
            searchBookListRequest.searchKeyWord = searchStore.searchKeWord;
            searchBookListRequest.limit = 30;
            searchBookListRequest.start = searchStore.searchBeanList.length;
            if (searchStore.searchBeanList.length <= 0) {
                that.showLoadView();
            }
            that.isInLoad = true;
            NetWorkUtil.getJsonByPost(
                GlobleUrl.URL_BASE_URL + GlobleUrl.URL_SEARCH_BOOK_LIST,
                JSON.stringify(searchBookListRequest),
                (data) => {
                    that.isInLoad = false;
                    console.log(JSON.stringify(data))
                    if (data && data.msgCode === 200) {
                        if (data.books && data.books.length > 0) {
                            let newBookList = data.books.map((item, index) => {
                                let bookBean = new BookBean();
                                bookBean.bookId = item.id;
                                bookBean.bookName = item.bookName;
                                bookBean.bookDescript = item.recommend;
                                bookBean.bookAuthor = item.authorName;
                                bookBean.bookCoverUrl = item.icon;
                                bookBean.bookCategory = item.categoryName;
                                return bookBean;
                            })
                            searchStore.searchBeanList = searchStore.searchBeanList.concat(newBookList)
                            that.searchState = 1;
                        } else if (searchStore.searchBeanList.length <= 0) {
                            that.searchState = 3;
                        }
                    } else if (searchStore.searchBeanList.length <= 0) {
                        that.searchState = 3;
                    }
                },
                (err) => {
                    that.isInLoad = false;
                    if (searchStore.searchBeanList.length <= 0) {
                        that.searchState = 2;
                    }
                }
            )

        }
    }

    render() {
        let that = this;
        let appTheme = that.props.appStore.appTheme;
        let searchStore = that.props.appStore.searchStore;

        if (that.searchState === 0) {
            return (
                <View></View>
            )
        } else if (that.searchState === 1) {
            if (searchStore.searchBeanList && searchStore.searchBeanList.length > 0) {
                return (
                    <View style={{ backgroundColor: appTheme.mainBgColor, flex: 1 }}>
                        <ListView
                            enableEmptySections={true}
                            renEmpty
                            style={{ flex: 1 }}
                            dataSource={ds.cloneWithRows(Array.from(searchStore.searchBeanList))}
                            onEndReached={() => {
                                if (searchStore.searchBeanList.length % 30 === 0) {

                                    that._toSarchNovel(searchStore.searchKeWord);
                                }
                            }}
                            getItemLayout={(item, index) => ({ length: Dpi.d(250), offset: Dpi.d(250) * index, index: index })}
                            onEndReachedThreshold={0.1}
                            removeClippedSubviews={true}
                            renderRow={(rowData) => {
                                if (rowData) {
                                    return (
                                        <BookItem navigation={that.props.navigation} data={rowData} ></BookItem>
                                    )
                                }
                            }}
                        />
                        {
                            that.hideLoadView()
                        }
                    </View >
                )
            } else {
                return (
                    <View
                        style={{ flex: 1, backgroundColor: appTheme.mainColor }}
                    >
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
                            >没有搜索到结果</Text>
                            {
                                that.hideLoadView()
                            }
                        </View >
                    </View>
                )
            }
        } else if (that.searchState === 3) {
            return (
                <View
                    style={{ flex: 1, backgroundColor: appTheme.mainColor }}
                >
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
                        >没有搜索到结果</Text>
                        {
                            that.hideLoadView()
                        }
                    </View >
                </View>
            )
        } else if (that.searchState === 2) {
            return (
                <View
                    style={{ flex: 1, backgroundColor: appTheme.mainColor }}
                >
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
                                that.dataLoadState = 0;
                                Keyboard.dismiss();
                                that._toSarchNovel()
                            }}
                            style={{
                                marginTop: Dpi.d(40)
                            }}
                        >
                            <View
                                style={{ paddingHorizontal: Dpi.d(44), paddingVertical: Dpi.d(21), borderRadius: Dpi.d(8), borderWidth: Dpi.d(3), borderColor: appTheme.hightLightColor }}
                            >
                                <Text style={{ color: appTheme.hightLightTextColor }}>重新加载</Text>
                            </View>
                        </TouchableHighlight>
                        {
                            that.hideLoadView()
                        }
                    </View >
                </View>
            )
        } else {
            return (
                <View>
                    {
                        that.hideLoadView()
                    }
                </View>
            )
        }
    }
}

