/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, RefreshControl, TouchableOpacity, TouchableHighlight } from 'react-native'
import FastImage from '../../../Components/react-native-fast-image'
import Dpi from '../../../Utils/Dpi'
import { observer, inject } from 'mobx-react/native';
import ListItem from './ListItem'
import ImageResource from '../../../../Resource/ImageResource';
/**
 * 分类页面
 */
@inject('appStore')
@observer
export default class ShowByCover extends Component {
    constructor(props) {
        super(props);
    }

    _onRefresh() {
    }

    _renderAddBookView() {
        let that = this;
        let appTheme = this.props.appStore.appTheme;
        return (
            <TouchableHighlight
                underlayColor='#c0c0c0'
                onPress={() => {
                    that.props.appStore.tabData.selectedPage = 'BookRoomPage';
                }}
            >
                <View
                    style={{ height: Dpi.d(212), justifyContent: 'center', alignItems: 'center', backgroundColor: appTheme.greyBgColor }}
                >
                    <FastImage
                        style={{
                            resizeMode: FastImage.resizeMode.stretch,
                            width: Dpi.d(80),
                            height: Dpi.d(80)
                        }}
                        source={ImageResource.listAddbook}
                    >
                    </FastImage>
                    <Text
                        style={{
                            fontSize: Dpi.s(30),
                            color: appTheme.groupTitleTextColor
                        }}
                    >添加喜欢的小说</Text>
                </View>
            </TouchableHighlight>

        )
    }

    render() {
        let that = this;
        let bookCaseStore = this.props.appStore.bookCaseStore;
        let itemViews = [];
        let appTheme = this.props.appStore.appTheme;
        // if (bookCaseStore.bookCaseList && bookCaseStore.bookCaseList.length > 0) {
        //     itemViews = bookCaseStore.bookCaseList.map((item, index) => {
        //         return (
        //             <ListItem key={index} data={item}></ListItem>
        //         )
        //     })
        // }
        return (
            <View
                style={{
                    backgroundColor: appTheme.greyBgColor,
                    flex: 1
                }}
            >

                <FlatList
                    // refreshControl={
                    //     < RefreshControl
                    //         colors={[appTheme.hightLightColor]}
                    //         refreshing={false}
                    //         onRefresh={that._onRefresh.bind(that)}
                    //     />
                    // }
                    data={Array.from(bookCaseStore.bookCaseList)}
                    renderItem={({ item }) => <ListItem navigation={that.props.navigation} data={item}></ListItem>}
                    getItemLayout={(item, index) => ({ length: Dpi.d(200), offset: Dpi.d(200) * index, index: index })}
                    ListFooterComponent={that._renderAddBookView()}
                ></FlatList>
            </View>
            // <ScrollView style={{ flex: 1 }}>
            //     <View style={{ flex: 1 }}>
            //         {itemViews}
            //     </View>
            // </ScrollView>
        );
    }
}

