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
    FlatList,
    ListView,
    ActivityIndicator,
    InteractionManager
} from 'react-native';
import Dpi from '../../../Utils/Dpi'
import AppUtils from '../../../Utils/AppUtils'
import NetWorkUtil from '../../../Network/NetWorkUtil'
import FastImage from '../../../Components/react-native-fast-image'
import ImageResource from '../../../../Resource/ImageResource'
import Overlay from '../../../Components/teaset/components/Overlay/Overlay'
import Toast from '../../../Components/teaset/components/Toast/Toast'
import { LargeList } from '../../../Components/react-native-largelist'
import BookItem from './BookItem'
import GetGroupBookListRequest from '../../../Protocol/GetGroupBookListRequest'
import GlobleUrl from '../../../Globle/GlobleUrl'
import { observer, inject } from 'mobx-react/native';
import AppTheme from '../../../Themes/AppTheme';
import { observable, autorun } from 'mobx';
import StoreUtil from './StoreUtil'
import { Bars } from '../../../Components/react-native-loader'
@inject('appStore')
@observer
export default class ListViewItem extends Component {
    @observable
    listViewData = [];
    @observable
    dataLoadState = 0;
    constructor(props) {
        super(props)
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.largeListRef;
        this.rankData = props.data;
        this.customKey;
        this._loadFirstData();
        this.pageIndex = 0;
    }




    showCustom() {
        let that = this;
        if (that.customKey) return;
        that.customKey = Toast.show({
            text: '加载中...',
            icon: <ActivityIndicator size='large' color={that.props.appStore.appTheme.mainColor} />,
            position: 'center',
            duration: 1000,
        });
    }

    hideCustom() {
        return;
        let that = this;
        if (!that.customKey) return;
        Toast.hide(that.customKey);
        that.customKey = undefined;
    }


    _loadData(start = 0, limit = 30) {
        // that.setState({ dataState: 2 });
        let that = this;
        that.isInLoad = true;
        if (that.rankData && that.rankData.rankId) {
            let listResquest = new GetGroupBookListRequest();
            listResquest.start = start;
            listResquest.limit = limit;
            // alert("start = " + start + ', limit = ' + limit);
            listResquest.groupId = that.rankData.rankId;
            
            // let url = 'http://172.16.10.65:8482/zm-nvl-mis/nvl/groupbook/query.do';
            NetWorkUtil.getJsonByPost(
                GlobleUrl.URL_BASE_URL + GlobleUrl.URL_GROUP_LIST,
                JSON.stringify(listResquest),
                (data) => {
                    if (data && data.msgCode === 200) {
                        that.isInLoad = false;
                        that.hideCustom();
                        let bookList = StoreUtil.formatStore(data);
                        if (bookList && bookList !== null && bookList.length > 0) {
                            that.listViewData = that.listViewData.concat(bookList);
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
                },
                (err) => {
                    that.isInLoad = false;
                    that.hideCustom();
                    if (that.listViewData.length <= 0) {
                        that.dataLoadState = 2;
                    }
                }
            )
        } else {
            that.isInLoad = false;
            that.hideCustom();
        }
    }

    componentDidMount() {
        let that = this;
        that.showCustom();
        // InteractionManager.runAfterInteractions(() => {
        // })
        let timer = setInterval(() => {
            that.dataLoadState = 1;
            if (timer) {
                clearInterval(timer);
            }
        }, 100)
        autorun(() => {
            if (that.props.appStore.tabData.selectedPage !== 'BookRankPage') {
                that.hideCustom()
            }
        })
    }
    componentWillReceiveProps(nextProps, nextContent) {
        this.listData = nextProps.data;
    }

    _renderItem(item, that, row) {
        return (
            <BookItem navigation={that.props.navigation} data={item}></BookItem>
        )
    }

    /**
     *为了第一次展示速度，所以首屏渲染10条
     */
    _loadFirstData() {
        if (this.rankData && this.rankData.bookList && this.listViewData.length < this.rankData.bookList.length) {
            let count = 0;
            let newData = [];
            for (let i = 0; i < this.rankData.bookList.length; ++i) {
                newData.push(this.rankData.bookList[i]);
                count += 1;
                if (count > 9) {
                    break;
                }
            }
            this.listViewData = newData;
        }
    }

    render() {
        let that = this;
        let appTheme = this.props.appStore.appTheme;
        if (that.dataLoadState === 0) {
            return (
                < View >
                </View >
            )
        } else if (that.dataLoadState === 1) {
            return (
                <ListView
                    enableEmptySections={true}
                    style={{ flex: 1 }}
                    dataSource={this.ds.cloneWithRows(Array.from(that.listViewData))}
                    onEndReached={() => {
                        if (that.isInLoad) {
                            return;
                        }
                        that._loadData(that.listViewData.length, 15);
                    }}
                    onEndReachedThreshold={0.4}
                    getItemLayout={(item, index) => ({ length: Dpi.d(210), offset: Dpi.d(210) * index, index: index })}
                    renderRow={(rowData) => {
                        return (
                            <BookItem navigation={that.props.navigation} data={rowData}></BookItem>
                        )
                    }}
                />
            )
        } else {
            return (
                <View>
                    {
                        that.hideCustom()
                    }
                </View>
            )
        }
    }
}
