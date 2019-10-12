/**
 * Created by Rabbit 下午6:40
 */

import React, { Component } from 'react';
import {
    FlatList,
    Text,
    View,
    Image,
    TouchableOpacity,
    ListView,
    InteractionManager,
    ActivityIndicator,
    TouchableHighlight
} from 'react-native';
import Dpi from '../../Utils/Dpi'
import FastImage from '../../Components/react-native-fast-image'
import { observer, inject } from 'mobx-react/native';
import GlobleVar from '../../Globle/GlobleVar'
import GlobleUrl from '../../Globle/GlobleUrl'
import AppUtils from '../../Utils/AppUtils'
import Toast from '../../Components/teaset/components/Toast/Toast'
import StoreUtil from './Store/StoreUtil'
import GetListBookListRequest from '../../Protocol/GetListBookListRequest'
import NetWorkUtil from '../../Network/NetWorkUtil'
import BookItem from './BookItem'
import { LargeList } from '../../Components/react-native-largelist'
// import f from './Store/'
// import HeadHotBookItem from './HeadHotBookItem'
// import SubHotBookItem from './SubHotBookItem'
import BookHeadItem from './BookHeadItem'
import ActionBar from './ActionBar/ActionBar'
import ImageResource from '../../../Resource/ImageResource';
import { observable } from 'mobx';
import { Bars } from '../../Components/react-native-loader'
import BookCaseUtil from '../BookCase/Utils/BookCaseUtil';
import LoadPage from '../Load/LoadPage'
import RecordVar from '../../Record/RecordVar'
import RecordUtil from '../../Record/RecordUtil'
import EventBus from '../../Utils/EventBus';
import GlobleKey from '../../Globle/GlobleKey';
@inject('appStore')
@observer
export default class BookMenuInfoView extends Component {
    @observable
    listViewData = [];
    @observable
    dataLoadState = 0;
    constructor(props) {
        super(props);
        let that = this;
        // this._bookMenuItemClick.bind(this);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.largeListRef;
        this.loadViewKey;
        this.isInLoad = false;
        this.groupId = props.navigation.state.params;
        this.loadStateListener = () => {
            that._getBookMenuIsInPag(that.groupId)
        }
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

    componentWillUnmount() {
        this.hideLoadView();
        EventBus.removeListener(GlobleKey.EVENT_BOOKCASE_RELOAD, this.loadStateListener);
    }


    componentDidMount() {
        let that = this;
        // InteractionManager.runAfterInteractions(() => {
        if (that.groupId) {
            RecordUtil.showRecord(that.groupId, RecordVar.show_bookmenuinfo_page, (new Date()).getTime());
            that.showLoadView();
            that._toLoadData(that.groupId);
        } else {
            that.dataLoadState = 2;
        }
        EventBus.on(GlobleKey.EVENT_BOOKCASE_RELOAD, that.loadStateListener);
        // })
    }


    // _bookMenuItemClick(item) {
    //     alert('点击了');
    // }


    static open(navigation, groupId) {
        if (navigation && groupId) {
            navigation.navigate('KEY_BookMenuInfoView', groupId);
        } else {
            alert('打开书单详情失败，参数错误')
        }
    }

    _getBookMenuIsInPag(listId) {
        let that = this;
        // let bookInfo = that.props.appStore.bookInfoStore;
        if (listId) {
            let request = new GetListBookListRequest();
            request.listId = listId;
            request.start = 0;
            request.limit = 1;
            let myStore = that.props.appStore.myPageStore;
            if (myStore.isLoaded === true
                && myStore.userId) {
                request.userId = myStore.userId;
            }
            //console.log(JSON.stringify(request))
            NetWorkUtil.getJsonByPost(
                GlobleUrl.URL_BASE_URL + GlobleUrl.URL_BOOKMENU_INFO,
                JSON.stringify(request),
                (data) => {
                    if (data && data.msgCode === 200) {
                        if (data && data.list && data.list.inBag == 1) {
                            that.props.appStore.bookMenuInfoStore.isBagBook = true;
                        } else {
                            that.props.appStore.bookMenuInfoStore.isBagBook = false;
                        }
                    }
                }, (error) => {

                }
            )
        }
    }

    _toLoadData(listId, start = 0, limit = 30) {
        let that = this;
        // let bookInfo = that.props.appStore.bookInfoStore;
        if (listId) {
            let request = new GetListBookListRequest();
            request.listId = listId;
            request.start = start;
            request.limit = limit;
            let myStore = that.props.appStore.myPageStore;
            if (myStore.isLoaded === true
                && myStore.userId) {
                request.userId = myStore.userId;
            }
            //console.log(JSON.stringify(request))
            NetWorkUtil.getJsonByPost(
                GlobleUrl.URL_BASE_URL + GlobleUrl.URL_BOOKMENU_INFO,
                JSON.stringify(request),
                (data) => {
                    that.isInLoad = false;
                    if (data && data.msgCode === 200) {
                        //console.log('书单详情加载成功22')
                        let bookMenuListStore = StoreUtil.formatStore(data);
                        if (bookMenuListStore && bookMenuListStore !== null) {
                            if (bookMenuListStore.bookList && bookMenuListStore.bookList.length > 0) {
                                if (that.listViewData && that.listViewData.length > 0) {
                                    that.listViewData = that.listViewData.concat(bookMenuListStore.bookList);
                                    that.dataLoadState = 1;
                                } else {
                                    that.props.appStore.bookMenuInfoStore = bookMenuListStore;
                                    that.listViewData = bookMenuListStore.bookList;
                                    that.dataLoadState = 1;
                                }
                            } else if (that.listViewData.length <= 0) {
                                that.dataLoadState = 2;
                            }
                        } else {
                            if (that.listViewData.length <= 0) {
                                that.dataLoadState = 2;
                            }
                        }
                    } else {
                        //console.log('书单详情加载失败 = ' + JSON.stringify(data))
                        if (that.listViewData.length <= 0) {
                            that.dataLoadState = 2;
                        }
                    }
                }, (error) => {
                    that.isInLoad = false;
                    //console.log('书单详情加载错误 = ' + error)
                    if (that.listViewData.length <= 0) {
                        that.dataLoadState = 2;
                    }
                }
            )
        } else {
            that.isInLoad = false;
            //console.log('书单详情加载跳过')
            if (that.listViewData.length <= 0) {
                that.dataLoadState = 2;
            }
        }
    }

    _renderItem(itemData, that, itemKey) {
        return (
            <BookItem navigation={that.props.navigation} key={itemKey} data={itemData}></BookItem>
        )
    }

    _renderView() {
        let that = this;
        let appTheme = that.props.appStore.appTheme;
        let bookMenuData = that.props.appStore.bookMenuInfoStore;
        if (that.dataLoadState === 1) {
            return (
                <View
                    style={{
                        flex: 1, backgroundColor: appTheme.mainBgColor
                    }}
                >
                    <ListView
                        enableEmptySections={true}
                        style={{ flex: 1, marginBottom: Dpi.d(90) }}
                        dataSource={this.ds.cloneWithRows(Array.from(that.listViewData))}
                        onEndReached={() => {
                            if (that.isInLoad === true) {
                                return;
                            }
                            that.isInLoad = true;
                            that._toLoadData(that.groupId, that.listViewData.length)
                        }}

                        renderHeader={() => {
                            return (
                                <BookHeadItem></BookHeadItem>
                            )
                        }}
                        onEndReachedThreshold={1}
                        getItemLayout={(item, index) => ({ length: Dpi.d(255), offset: Dpi.d(255) * index, index: index })}
                        renderRow={(rowData) => {
                            return (
                                <BookItem navigation={that.props.navigation} data={rowData}></BookItem>
                            )
                        }}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            width: AppUtils.size.width,
                            height: Dpi.d(90),
                        }}
                    >
                        <TouchableHighlight

                            underlayColor={appTheme.greyBgColor}
                            onPress={() => {
                                let myPageStore = that.props.appStore.myPageStore;
                                if (myPageStore.isLoaded === true && myPageStore.userId) {
                                    if (bookMenuData.isBagBook === true) {
                                        RecordUtil.clickRecord(bookMenuData.bookMenuId, RecordVar.click_bookmenuinfo_removebag, (new Date()).getTime());
                                        that.showLoadView()

                                        BookCaseUtil.bookMenuBagAction(bookMenuData.bookMenuId, myPageStore.userId, 2, (callBack) => {
                                            that.showLoadView();
                                            if (callBack && callBack.msgCode === 200) {
                                                Toast.message('移除书架成功', 'short', 'center');
                                                bookMenuData.isBagBook = false;
                                            }
                                        })
                                    } else {
                                        RecordUtil.clickRecord(bookMenuData.bookMenuId, RecordVar.click_bookmenuinfo_addbag, (new Date()).getTime());
                                        that.showLoadView()
                                        BookCaseUtil.bookMenuBagAction(bookMenuData.bookMenuId, myPageStore.userId, 1, (callBack) => {
                                            that.showLoadView();
                                            if (callBack && callBack.msgCode === 200) {
                                                Toast.message('加入书架成功', 'short', 'center');
                                                bookMenuData.isBagBook = true;
                                            }
                                        })
                                    }
                                } else {
                                    LoadPage.open(that.props.navigation);
                                }
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: appTheme.mainBgColor,
                                    width: AppUtils.size.width,
                                    height: Dpi.d(90),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <View
                                    style={{
                                        width: Dpi.d(600),
                                        height: Dpi.d(67),
                                        borderRadius: Dpi.d(10),
                                        backgroundColor: (bookMenuData.isBagBook === true) ? appTheme.mainBgColor : appTheme.hightLightColor,
                                        borderWidth: (bookMenuData.isBagBook === true) ? Dpi.d(2) : 0,
                                        borderColor: (bookMenuData.isBagBook === true) ? appTheme.hightLightColor : appTheme.mainBgColor,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >

                                    <Text
                                        style={{
                                            fontSize: Dpi.s(30),
                                            color: (bookMenuData.isBagBook === true) ? appTheme.hightLightColor : appTheme.mainBgColor,
                                        }}
                                    >{
                                            (bookMenuData.isBagBook === true) ? '移除书架' : '加入书架'
                                        }</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>

                    {
                        that.hideLoadView()
                    }
                </View>
            )
        } else if (that.dataLoadState === 2) {
            return (
                <View style={{ flex: 1 }}>
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
                                    if (that.groupId) {
                                        that.showLoadView();
                                        that._toLoadData(that.groupId);
                                    } else {
                                        that.dataLoadState = 2;
                                    }
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
                            {
                                that.hideLoadView()
                            }
                        </View >
                    </View>
                    {
                        that.hideLoadView()
                    }
                </View>
            )
        } else {
            return (
                <View>

                </View>
            )
        }
    }

    render() {
        let that = this;
        let appTheme = this.props.appStore.appTheme;
        let bookMenuInfoStore = this.props.appStore.bookMenuInfoStore;
        return (
            <View style={{ backgroundColor: appTheme.mainBgColor, flex: 1 }}>
                <ActionBar navigation={this.props.navigation}></ActionBar>
                {
                    that._renderView()
                }
            </View>
        );
    }
}
