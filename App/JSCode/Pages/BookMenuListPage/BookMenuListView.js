/**
 * Created by Rabbit 下午6:40
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ListView,
    InteractionManager,
    ActivityIndicator,
    TouchableHighlight,
} from 'react-native';
import Dpi from '../../Utils/Dpi'
import Toast from '../../Components/teaset/components/Toast/Toast'
import FastImage from '../../Components/react-native-fast-image'
import { observer, inject } from 'mobx-react/native';
import GlobleVar from '../../Globle/GlobleVar'
import GlobleUrl from '../../Globle/GlobleUrl'
import NetWorkUtil from '../../Network/NetWorkUtil'
import GetModuleBookListRequest from '../../Protocol/GetModuleBookListRequest'
import AppUtils from '../../Utils/AppUtils'
import BookMenuItem from './BookMenuItem'

import { LargeList } from '../../Components/react-native-largelist'
import ActionBar from './ActionBar/ActionBar'
import ImageResource from '../../../Resource/ImageResource';
import { observable } from 'mobx';
import StoreUtil from './Store/StoreUtil'
import BookMenuListStore from './Store/BookMenuListStore'
import { Bars } from '../../Components/react-native-loader'
@inject('appStore')
@observer
export default class BookMenuInfoView extends Component {
    @observable
    listViewData = [];
    @observable
    dataLoadState = 0;
    constructor(props) {
        super(props);
        // this._bookMenuItemClick.bind(this);
        this.largeListRef;
        this.isInLoad = false;
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.loadViewKey;
        this.menuId = props.navigation.state.params.menuId;
    }


    // _bookMenuItemClick(item) {
    //     alert('点击了');
    // }


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

    // _toLoadData(listId, start = 0, limit = 30) {
    //     let that = this;
    //     // let bookInfo = that.props.appStore.bookInfoStore;
    //     if (listId) {
    //         let request = new GetListBookListRequest();
    //         request.listId = listId;
    //         request.start = start;
    //         request.limit = limit;
    //         let myStore = that.props.appStore.myPageStore;
    //         if (myStore.isLoaded === true
    //             && myStore.userId) {
    //             request.userId = myStore.userId;
    //         }
    //         //console.log(JSON.stringify(request))
    //         NetWorkUtil.getJsonByPost(
    //             GlobleUrl.URL_BASE_URL + GlobleUrl.URL_BOOKMENU_INFO,
    //             JSON.stringify(request),
    //             (data) => {
    //                 that.isInLoad = false;
    //                 if (data && data.msgCode === 200) {
    //                     //console.log('书单详情加载成功22')
    //                     let bookMenuListStore = StoreUtil.formatStore(data);
    //                     if (bookMenuListStore && bookMenuListStore !== null) {
    //                         if (bookMenuListStore.bookList && bookMenuListStore.bookList.length > 0) {
    //                             if (that.listViewData && that.listViewData.length > 0) {
    //                                 that.listViewData = that.listViewData.concat(bookMenuListStore.bookList);
    //                                 that.dataLoadState = 1;
    //                             } else {
    //                                 that.props.appStore.bookMenuInfoStore = bookMenuListStore;
    //                                 that.listViewData = bookMenuListStore.bookList;
    //                                 that.dataLoadState = 1;
    //                             }
    //                         } else if (that.listViewData.length <= 0) {
    //                             that.dataLoadState = 2;
    //                         }
    //                     } else {
    //                         if (that.listViewData.length <= 0) {
    //                             that.dataLoadState = 2;
    //                         }
    //                     }
    //                 } else {
    //                     //console.log('书单详情加载失败 = ' + JSON.stringify(data))
    //                     if (that.listViewData.length <= 0) {
    //                         that.dataLoadState = 2;
    //                     }
    //                 }
    //             }, (error) => {
    //                 that.isInLoad = false;
    //                 //console.log('书单详情加载错误 = ' + error)
    //                 if (that.listViewData.length <= 0) {
    //                     that.dataLoadState = 2;
    //                 }
    //             }
    //         )
    //     } else {
    //         that.isInLoad = false;
    //         //console.log('书单详情加载跳过')
    //         if (that.listViewData.length <= 0) {
    //             that.dataLoadState = 2;
    //         }
    //     }
    // }

    _toLoadData(listId, start = 0, limit = 20) {
        let that = this;
        // let bookInfo = that.props.appStore.bookInfoStore;
        if (listId && that.isInLoad === false) {
            let request = new GetModuleBookListRequest();
            request.moduleId = listId;
            request.start = start;
            request.limit = limit;
            that.isInLoad = true;
            NetWorkUtil.getJsonByPost(
                GlobleUrl.URL_BASE_URL + GlobleUrl.URL_BOOKMENU_LIST_INFO,
                JSON.stringify(request),
                (data) => {
                    that.isInLoad = false;
                    if (data && data.msgCode === 200) {
                        console.log('书单详情加载成功')
                        let bookMenuListStore = StoreUtil.formatStore(data);
                        if (bookMenuListStore && bookMenuListStore !== null) {
                            console.log('书单详情转换成功')
                            that.listViewData = that.listViewData.concat(bookMenuListStore.bookMenuList);
                            that.dataLoadState = 1;
                        } else {
                            if (that.listViewData.length <= 0) {
                                that.dataLoadState = 2;
                            }
                        }
                    } else {
                        if (that.listViewData.length <= 0) {
                            that.dataLoadState = 2;
                        }
                    }
                }, (error) => {
                    that.isInLoad = false;
                    if (that.listViewData.length <= 0) {
                        that.dataLoadState = 2;
                    }
                }
            )

        } else {
            that.isInLoad = false;
            if (that.listViewData.length <= 0) {
                that.dataLoadState = 2;
            }
        }
    }

    componentDidMount() {
        let that = this;
        // InteractionManager.runAfterInteractions(() => {
        that.showLoadView();
        that._toLoadData(that.menuId);
        // })
    }


    static open(navigation, menuId) {
        if (navigation) {
            navigation.navigate('KEY_BookMenuListView', { menuId: menuId });
        } else {
            alert('打开书单详情失败，参数错误,navigation = null')
        }
    }

    _renderItem(itemData, that, itemKey) {
        return (
            <BookMenuItem navigation={this.props.navigation} key={itemKey} data={itemData}></BookMenuItem>
        )
    }

    _renderView() {
        let that = this;
        let appTheme = that.props.appStore.appTheme;
        if (that.dataLoadState === 2) {
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
                                that.showLoadView();
                                that._toLoadData(that.menuId);
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
            )
        } else if (that.dataLoadState === 1) {
            return (
                <View
                    style={{
                        flex: 1
                    }}
                >

                    <ListView
                        enableEmptySections={true}
                        style={{ flex: 1 }}
                        dataSource={this.ds.cloneWithRows(Array.from(that.listViewData))}
                        onEndReached={() => {
                            if (that.isInLoad === true) {
                                return;
                            }
                            that._toLoadData(that.menuId, that.listViewData.length)
                        }}
                        onEndReachedThreshold={1}
                        getItemLayout={(item, index) => ({ length: Dpi.d(255), offset: Dpi.d(255) * index, index: index })}
                        renderRow={(rowData) => {
                            return (
                                // <BookItem navigation={that.props.navigation} data={rowData}></BookItem>
                                <BookMenuItem navigation={this.props.navigation} data={rowData}></BookMenuItem>
                            )
                        }}
                    />
                    {/* <LargeList
                        ref={ref => this.largeListRef = ref}
                        style={{ flex: 1 }}
                        bounces={false}
                        numberOfRowsInSection={section => {
                            if (that.listViewData && that.listViewData.length > 0) {
                                return that.listViewData.length;
                            } else {
                                return 0;
                            }
                        }}

                        numberOfSections={() => 1}
                        safeMargin={600}
                        heightForCell={(section, row) => Dpi.d(255)}
                        renderCell={
                            (section, row) => that._renderItem(that.listViewData[row], that, row)
                        }
                    /> */}
                    {
                        that.hideLoadView()
                    }
                </View>
            )
        } else {
            return (
                <View></View>
            )
        }
    }

    render() {
        let that = this;
        let appTheme = this.props.appStore.appTheme;
        // let bookMenuInfoStore = this.props.appStore.bookMenuInfoStore;
        // let itemViews = [];
        // if (bookMenuGroup && bookMenuGroup.groupBeanList && bookMenuGroup.groupBeanList.length > 0) {
        //     itemViews = bookMenuGroup.groupBeanList.map((item, index) => {
        //         return (
        //             <BookItem key={index} data={item}></BookItem>
        //         )
        //     })
        // }
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
