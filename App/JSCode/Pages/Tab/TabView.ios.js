import React, { Component } from 'react';
import {
    ImageBackground,
    Button,
    ScrollView,
    Text,
    Image,
    StyleSheet,
    View,
    StatusBar,
    TouchableWithoutFeedback,
    BackHandler,
    Platform,
    TouchableOpacity
} from 'react-native';
import Dpi from '../../Utils/Dpi'
import AppUtils from '../../Utils/AppUtils'
import NetWorkUtil from '../../Network/NetWorkUtil'
import MySorage from '../../Utils/MyStore/MySorage'
import TabNavigator from '../../Components/react-native-tab-navigator';
import BookCasePage from '../../Pages/BookCase/BookCasePage'
import BookRoomPage from '../../Pages/BookRoom/BookRoomPage'
import CategoryPage from '../../Pages/Category/CategoryPage'
import SearchPage from '../Search/SearchPage'
import StoreUtil from './Store/StoreUtil'
import BookRankPage from '../../Pages/BookRank/BookRankPage'
import GlobleKey from '../../Globle/GlobleKey'
import GlobleUrl from '../../Globle/GlobleUrl'
import MyModal from '../../Components/MyModal'
import GetNaviListRequest from '../../Protocol/GetNaviListRequest'
import CatchSqlLiteUtil from '../../Catch/CatchSqlLiteUtil'
import NvlUpgradeStrategy from '../../Protocol/NvlUpgradeStrategy'
// import UpdataManager from '../../Updata/UpdataManager'

import RecordUtil from '../../Record/RecordUtil'
import RecordVar from '../../Record/RecordVar'
import { observer, inject } from 'mobx-react/native';
import { transaction } from 'mobx'

@inject('appStore')
@observer
export default class TabView extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     selectedTab: 'BookRoomPage',
        // };
    }

    componentDidMount() {
        CatchSqlLiteUtil.createTable();
        MySorage.loadByDefault(GlobleKey.KeyHomeTabData, -1, (data) => {
            if (data && data !== -1) {
                let store = StoreUtil.formatStore(data);
                if (store && store !== null) {
                    that.props.appStore.tabData = store;
                }
            }
            this._loadTabData();
        });
    }




    _loadTabData() {
        let that = this;
        let request = new GetNaviListRequest();
        console.log('开始加载tab页数据');
        NetWorkUtil.getJsonByPost(
            GlobleUrl.URL_BASE_URL + GlobleUrl.URL_NAVIL_LIST,
            JSON.stringify(request),
            (data) => {
                // alert('加载tab页数据' + JSON.stringify(data))
                if (data && data.msgCode === 200) {
                    console.log('tab页面数据 = ' + JSON.stringify(data))
                    let store = StoreUtil.formatStore(data);
                    if (store && store !== null) {
                        transaction(() => {
                            // that.props.appStore.tabData.tabBookCaseImageNormal = store.tabBookCaseImageNormal;
                            // that.props.appStore.tabData.tabBookCaseImageSelected = store.tabBookCaseImageSelected;
                            // that.props.appStore.tabData.tabBookRoomImageNormal = store.tabBookRoomImageNormal;
                            // that.props.appStore.tabData.tabBookRoomImageSelected = store.tabBookRoomImageSelected;
                            // that.props.appStore.tabData.tabCategoryImageNormal = store.tabCategoryImageNormal;
                            // that.props.appStore.tabData.tabCategoryImageSelected = store.tabCategoryImageSelected;
                            // that.props.appStore.tabData.tabSearchImageNormal = store.tabSearchImageNormal;
                            // that.props.appStore.tabData.tabSearchImageSelected = store.tabSearchImageSelected;
                            // that.props.appStore.tabData.tabRankImageNormal = store.tabRankImageNormal;
                            // that.props.appStore.tabData.tabRankImageSelected = store.tabRankImageSelected;


                            that.props.appStore.tabData.tab_01_name = store.tab_01_name;
                            that.props.appStore.tabData.tab_01_id = store.tab_01_id;
                            that.props.appStore.tabData.tab_02_name = store.tab_02_name;
                            that.props.appStore.tabData.tab_02_id = store.tab_02_id;
                            that.props.appStore.tabData.tab_03_name = store.tab_03_name;
                            that.props.appStore.tabData.tab_03_id = store.tab_03_id;
                            that.props.appStore.tabData.tab_04_name = store.tab_04_name;
                            that.props.appStore.tabData.tab_04_id = store.tab_04_id;
                            that.props.appStore.tabData.tab_05_name = store.tab_05_name;
                            that.props.appStore.tabData.tab_05_id = store.tab_05_id;
                            // alert(that.props.appStore.tabData.tab_01_name)
                        })
                        console.log('tab页面数据 = ' + store.tab_01_name + ' + ' + store.tabBookCaseImageNormal)
                        MySorage._sava(GlobleKey.KeyHomeTabData, data);
                    }
                } else {
                    console.log('加载tab页数据错误1 = ' + JSON.stringify(data))
                }
            }, (err) => {
                // alert('加载tab页数据错误2 = ' + err)
                console.log('加载tab页数据错误2 = ' + err)
            }
        )
    }
    //react-native-sqlite-storage
    //react-native-sqlite-storage

    _renderTabImage(imageUri, size = Dpi.d(38)) {
        let marginBottom = (size === Dpi.d(38)) ? 0 : Dpi.d(20) * -1;
        return (
            <Image resizeMode='stretch' style={{ width: size, height: size, marginBottom: marginBottom }} source={imageUri}></Image>
        )
    }

    _renderTab(that) {
        let appTheme = that.props.appStore.appTheme;
        let tabData = that.props.appStore.tabData;
        return (
            <View style={{ flex: 1, backgroundColor: appTheme.greyBgColor }}>
                <TabNavigator
                    tabBarStyle={{ backgroundColor: 'transparent', height: Dpi.d(120), overflow: 'hidden' }}
                    sceneStyle={{ paddingBottom: 0, paddingBottom: Dpi.d(100) }}
                >
                    <TabNavigator.Item
                        selected={tabData.selectedPage === 'BookCasePage'}
                        title={'书架'}
                        titleStyle={{ fontSize: Dpi.d(23), color: appTheme.greyTextColor }}
                        selectedTitleStyle={{ fontSize: Dpi.d(23), color: appTheme.hightLightTextColor }}
                        renderIcon={() => that._renderTabImage(tabData.tabBookCaseImageNormal)}
                        renderSelectedIcon={() => that._renderTabImage(tabData.tabBookCaseImageSelected)}
                        onPress={() => {
                            tabData.selectedPage = 'BookCasePage';
                            RecordUtil.clickRecord(tabData.tab_01_id, RecordVar.click_tab_bag, (new Date()).getTime());
                            RecordUtil.showRecord(tabData.tab_01_id, RecordVar.show_room_bag, (new Date()).getTime());
                        }}>
                        <BookCasePage navigation={that.props.navigation}></BookCasePage>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={tabData.selectedPage === 'BookRoomPage'}
                        title={'书库'}
                        titleStyle={{ fontSize: Dpi.d(23), color: appTheme.greyTextColor }}
                        selectedTitleStyle={{ fontSize: Dpi.d(23), color: appTheme.hightLightTextColor }}
                        renderIcon={() => that._renderTabImage(tabData.tabBookRoomImageNormal)}
                        renderSelectedIcon={() => that._renderTabImage(tabData.tabBookRoomImageSelected)}
                        onPress={() => {
                            tabData.selectedPage = 'BookRoomPage';
                            RecordUtil.clickRecord(tabData.tab_02_id, RecordVar.click_tab_room, (new Date()).getTime());
                            RecordUtil.showRecord(tabData.tab_02_id, RecordVar.show_room_page, (new Date()).getTime());
                        }}>
                        <BookRoomPage navigation={that.props.navigation}></BookRoomPage>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        titleStyle={{ fontSize: 0, width: 0, height: 0 }}
                        selected={tabData.selectedPage === 'SearchPage'}
                        titleStyle={{ fontSize: Dpi.d(23), color: appTheme.greyTextColor }}
                        selectedTitleStyle={{ fontSize: Dpi.d(23), color: appTheme.hightLightTextColor }}
                        renderIcon={() => that._renderTabImage(tabData.tabSearchImageNormal, Dpi.d(110))}
                        renderSelectedIcon={() => that._renderTabImage(tabData.tabSearchImageSelected, Dpi.d(110))}
                        onPress={() => {
                            if (tabData.selectedPage == 'SearchPage') {
                            } else {
                                SearchPage.openFrom = tabData.selectedPage;
                            }
                            tabData.selectedPage = 'SearchPage';
                            RecordUtil.clickRecord(tabData.tab_03_id, RecordVar.click_tab_search, (new Date()).getTime());
                            RecordUtil.showRecord(tabData.tab_03_id, RecordVar.show_search_page, (new Date()).getTime());
                        }}>
                        <SearchPage navigation={that.props.navigation}></SearchPage>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={tabData.selectedPage === 'CategoryPage'}
                        title={'分类'}
                        titleStyle={{ fontSize: Dpi.d(23), color: appTheme.greyTextColor }}
                        selectedTitleStyle={{ fontSize: Dpi.d(23), color: appTheme.hightLightTextColor }}
                        renderIcon={() => that._renderTabImage(tabData.tabCategoryImageNormal)}
                        renderSelectedIcon={() => that._renderTabImage(tabData.tabCategoryImageSelected)}
                        onPress={() => {
                            tabData.selectedPage = 'CategoryPage';
                            RecordUtil.clickRecord(tabData.tab_04_id, RecordVar.click_room_category, (new Date()).getTime());
                            RecordUtil.showRecord(tabData.tab_04_id, RecordVar.show_cagetory_page, (new Date()).getTime());
                        }}>
                        <CategoryPage navigation={that.props.navigation}></CategoryPage>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={tabData.selectedPage === 'BookRankPage'}
                        title={'排行'}
                        titleStyle={{ fontSize: Dpi.d(23), color: appTheme.greyTextColor }}
                        selectedTitleStyle={{ fontSize: Dpi.d(23), color: appTheme.hightLightTextColor }}
                        renderIcon={() => that._renderTabImage(tabData.tabRankImageNormal)}
                        renderSelectedIcon={() => that._renderTabImage(tabData.tabRankImageSelected)}
                        onPress={() => {
                            tabData.selectedPage = 'BookRankPage';
                            RecordUtil.clickRecord(tabData.tab_05_id, RecordVar.click_tab_rank, (new Date()).getTime());
                            RecordUtil.showRecord(tabData.tab_05_id, RecordVar.show_rank_page, (new Date()).getTime());
                        }}>
                        <BookRankPage navigation={that.props.navigation}></BookRankPage>
                    </TabNavigator.Item>
                </ TabNavigator >
            </View >
        )

    }

    render() {
        let that = this;
        return (that._renderTab(that));
    }

}

const styles = StyleSheet.create({
    scrollViewContainerStyle: {
        flex: 1
    },
    container: {
        flex: 1,
    },
    tabBottomImageStyle: {
        width: AppUtils.size.width,
    },
    tabTitleStyle: {
        fontSize: Dpi.s(26),
    },
    tabTitleSelectedStyle: {
        fontSize: Dpi.s(26),
    }
})
