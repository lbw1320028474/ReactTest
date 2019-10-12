/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, ScrollView, RefreshControl, AnimAf, ActivityIndicator } from 'react-native'
import FastImage from '../../../Components/react-native-fast-image'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react/native';
import Toast from '../../../Components/teaset/components/Toast/Toast'
import CoverItem from './CoverItem'
import Dpi from '../../../Utils/Dpi'
import CoverAddItem from './CoverAddItem'
import EmptyItem from './EmptyItem'
/**
 * 分类页面
 */
@inject('appStore')
@observer
export default class ShowByCover extends Component {
    @observable refreshing = false;
    @observable canLoadData = false;
    constructor(props) {
        super(props);
        this.loadViewKey;
    }

    showLoadView() {
        let that = this;
        if (that.loadViewKey) return;
        that.loadViewKey = Toast.show({
            text: '加载中...',
            icon: <ActivityIndicator size='large' color={that.props.appStore.appTheme.mainColor} />,
            position: 'center',
            duration: 100000,
        });
    }

    hideLoadView() {
        let that = this;
        if (!that.loadViewKey) return;
        Toast.hide(that.loadViewKey);
        that.loadViewKey = undefined;
    }

    _onRefresh() {
        let that = this;
        that.refreshing = true;
        let timer = setInterval(() => {
            that.refreshing = false;
            if (timer) {
                clearInterval(timer)
            }
        }, 2000);
    }

    // componentDidMount() {
    //     let that = this;
    //     // that.showLoadView();
    //     // let timer = setInterval(() => {
    //     //     that.canLoadData = true;
    //     //     if (timer) {
    //     //         clearInterval(timer);
    //     //     }
    //     // }, 100)
    // }

    render() {
        let that = this;
        // if (that.canLoadData) {
        let appTheme = this.props.appStore.appTheme;
        let bookCaseStore = this.props.appStore.bookCaseStore;
        let itemViews = [];
        if (bookCaseStore.bookCaseList && bookCaseStore.bookCaseList.length > 0) {
            itemViews = bookCaseStore.bookCaseList.map((item, index) => {
                return (
                    <CoverItem key={index} data={item} navigation={that.props.navigation}></CoverItem>
                )
            })
        }
        itemViews.push(
            <CoverAddItem key={itemViews.length}></CoverAddItem>
        )

        /**
         * 下面几个item是占位组件，，都是空组件
         */
        if (itemViews && itemViews.length % 3 === 1) {
            itemViews.push(
                <EmptyItem key={itemViews.length}></EmptyItem>
            )
            itemViews.push(
                <EmptyItem key={itemViews.length}></EmptyItem>
            )
        } else if (itemViews && itemViews.length % 3 === 2) {
            itemViews.push(
                <EmptyItem key={itemViews.length}></EmptyItem>
            )
        }
        return (
            <ScrollView
                style={{ flex: 1 }}
                colors={['#FF0000']}
                title='正在刷新'
                tintColor={appTheme.hightLightColor}
                titleColor={appTheme.hightLightColor}
            // refreshControl={
            //     < RefreshControl
            //         colors={[appTheme.hightLightColor]}
            //         refreshing={that.refreshing}
            //         onRefresh={that._onRefresh.bind(that)}
            //     />
            // }
            >
                <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Dpi.d(35) }}>
                    {itemViews}
                </View>
            </ScrollView >
        );
        // } else {
        //     return <View></View>
        // }
    }
}

