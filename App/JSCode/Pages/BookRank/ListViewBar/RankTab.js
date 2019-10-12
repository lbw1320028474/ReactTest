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
    FlatList
} from 'react-native';
import Dpi from '../../../Utils/Dpi'
import AppUtils from '../../../Utils/AppUtils'
import FastImage from '../../../Components/react-native-fast-image'
import ImageResource from '../../../../Resource/ImageResource'
import Overlay from '../../../Components/teaset/components/Overlay/Overlay'
import { LargeList } from '../../../Components/react-native-largelist'
import ListViewItem from './ListViewItem'
import TabNavigator from '../../../Components/react-native-tab-navigator';
import { observer, inject } from 'mobx-react/native';
@inject('appStore')
@observer
export default class RankTab extends Component {
    constructor(props) {
        super(props)
        this.largeListRef;
        this.listItemViews = new Map();
        this.state = {
            selectedTab: 0
        }
    }

    // _renderItemList(index) {
    //     let that = this;
    //     // let rankStore = that.props.appStore.bookRankStore;
    //     let listData = that.props.appStore.bookRankStore.rankList[index].bookList;
    //     if (that.listItemViews.has(index)) {
    //         return that.listItemViews.get(index);
    //     } else {

    //         let listViewItem = <ListViewItem navigation={that.props.navigation} data={listData}></ListViewItem>;
    //         that.listItemViews.set(index, listViewItem);

    //         return listViewItem;
    //     }
    // }

    render() {
        let that = this;
        // let index = that.props.appStore.bookRankStore.showIndex;
        let appTheme = that.props.appStore.appTheme;
        let rankStore = that.props.appStore.bookRankStore;
        let tabViews = [];
        if (rankStore && rankStore.rankList && rankStore.rankList.length > 0) {
            tabViews = rankStore.rankList.map((item, index) => {
                return (
                    <TabNavigator.Item
                        key={index}
                        selected={rankStore.showIndex === index}
                        // titleStyle={{ textAlign: 'left', fontSize: Dpi.d(23), color: appTheme.greyTextColor }}
                        // selectedTitleStyle={{ fontSize: Dpi.d(23), color: appTheme.hightLightTextColor }}
                    >
                        <View style={{ flex: 1 }}>
                            <ListViewItem navigation={that.props.navigation} data={item}></ListViewItem>
                        </View>
                    </TabNavigator.Item>
                )
            })
        }
        let showIndex = rankStore.showIndex;
        if (rankStore && rankStore.rankList && rankStore.rankList.length > 0) {
            return (
                <TabNavigator
                    hiddenTabBar={true}
                    hidesTabTouch={true}
                    tabBarStyle={{ backgroundColor: 'transparent', height: 0, overflow: 'hidden' }}
                    sceneStyle={{ paddingBottom: 0, flex: 1 }}
                >
                    {tabViews}
                </ TabNavigator >
            )
        } else {
            return (
                <View>
                </View>
            )
        }
        // let appTheme = this.props.appStore.appTheme;
        // let listData = [];// rankStore.rankList;
        // if (rankStore && rankStore.rankList && rankStore.rankList.length > 0 && rankStore.showIndex < rankStore.rankList.length) {
        //     listData = rankStore.rankList[rankStore.showIndex].bookList;
        // }
        // return (
        //     <View style={{ flex: 1 }}>
        //         <FlatList
        //             initialNumToRender={6}
        //             data={listData}
        //             renderItem={({ item }) => <BookItem navigation={that.props.navigation} data={item}></BookItem>}
        //             getItemLayout={(item, index) => ({ length: Dpi.d(210), offset: Dpi.d(210) * index, index: index })}
        //         />
        //         {/* <FlatList
        //             ref={ref => this.largeListRef = ref}
        //             style={{ flex: 1 }}
        //             bounces={false}
        //             numberOfRowsInSection={section => {
        //                 if (listData && listData.length > 0) {
        //                     return listData.length;
        //                 } else {
        //                     return 0;
        //                 }
        //             }}
        //             numberOfSections={() => 1}
        //             safeMargin={600}
        //             heightForCell={(section, row) => Dpi.d(210)}
        //             renderCell={
        //                 (section, row) => that._renderItem(listData[row], that, row)
        //             }
        //         /> */}
        //     </View>
        // )
    }
}
