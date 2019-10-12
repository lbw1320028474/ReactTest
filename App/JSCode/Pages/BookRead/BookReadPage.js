/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    FlatList,
    StatusBar,
    Button
} from 'react-native'
import Dpi from '../../Utils/Dpi'
import AppUtils from '../../Utils/AppUtils'
// import MenuView from './SubViews/MenuView/MenuView'
import MenuViewBottom from './SubViews/MenuView/MenuViewBottom'
import MenuViewTop from './SubViews/MenuView/MenuViewTop'
import SettingView from './SubViews/MenuView/SettingView'
import ReadView from './SubViews/ReadView/ReadView'
import BackgroundView from './SubViews/BackgroundView/BackgroundView'
import CatchChoseView from './SubViews/CatchView/CatchChoseView'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react/native';
import ChapterTrueCount from './SubViews/ReadView/Manager/ChapterTrueCount';
import ChapterChangType from './SubViews/ReadView/Utils/ChapterChangType';
@inject('appStore')
@observer
export default class BookRoomPage extends Component {
    @observable refreshing = false;
    constructor(props) {
        super(props);

    }

    //供外部打开此界面的静态方法
    static open(navigation, novelId, chapterId, pageIndex) {
        if (navigation) {
            navigation.navigate('KEY_SceneBookReadPage', { bookId: novelId, chapterOrder: chapterId, pageIndex: pageIndex });
        }
    }

    componentWillUnmount() {
        ChapterChangType.changeType = 0;
    }

    render() {
        let that = this;
        let appTheme = this.props.appStore.appTheme;
        let readPageStore = that.props.appStore.readPageStore;
        let readTheme = readPageStore.readTheme;
        let novelId = that.props.data.bookId;
        let chapterId = that.props.data.chapterOrder;
        let pageIndex = that.props.data.pageIndex;
        return (
            <View style={{ flex: 1 }}>
                <BackgroundView></BackgroundView>
                <StatusBar
                    hidden={true}
                ></StatusBar>
                <ReadView navigation={that.props.navigation} data={{ bookId: novelId, chapterOrder: chapterId, pageIndex: pageIndex }}></ReadView>
                <MenuViewTop navigation={that.props.navigation} data={novelId}></MenuViewTop>
                <MenuViewBottom data={novelId} navigation={that.props.navigation}></MenuViewBottom>
                <SettingView ></SettingView>
            </View>
        );
    }
}

