/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import {
    Scene,
    Router,
    Actions,
    Tabs,
    Stack,
} from 'react-native-router-flux';
import FastImage from 'react-native-fast-image';

import BookCasePage from '../Pages/BookCase/BookCasePage'
import BookRankPage from '../Pages/BookRank/BookRankPage'
import BookRoomPage from '../Pages/BookRoom/BookRoomPage'
import CategoryPage from '../Pages/Category/CategoryPage'
import SearchPage from '../Pages/Search/SearchPage'


import Dpi from '../Utils/Dpi'
import { observable, autorun } from 'mobx';
import { observer, inject } from 'mobx-react/native';
import ImageResource from '../../Resource/ImageResource';
import Tabicon from '../Components/Tabicon';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
// import AppTheme from '../Themes/AppTheme';


const onBackPress = () => {
    if (Actions.state.index === 0) {
        return false
    }
    Actions.pop()
    return true
}

@inject('appStore')
@observer
export default class AppRouter extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        let that = this;
        let tabData = this.props.appStore.tabData;
        let appTheme = this.props.appStore.appTheme;
        return (
            <Router
                backAndroidHandler={onBackPress}
            >
                <Stack
                    transitionConfig={() => ({
                        screenInterpolator: CardStackStyleInterpolator.forHorizontal
                    })}
                    hideNavBar={true}
                    key='rootTabView'>
                    <Tabs
                        tabBarStyle={{ alignItems: 'center' }}
                        showLabel={true}
                        activeTintColor={appTheme.hightLightColor}
                        animationEnabled={false}
                        key='tabBar'
                        wrap={true}
                        showLabel={true}
                        swipeEnabled={true}
                        headerMode='none'
                        icon={Tabicon}
                        lazy={false}
                        tabBarPosition={'bottom'}
                    >

                        <Scene title='书架'
                            image={tabData.tabBookCaseImageNormal}
                            selectedImage={tabData.tabBookCaseImageSelected}
                            component={BookCasePage} key="BookCasePage" />


                        <Scene title='书库'
                            image={tabData.tabBookRoomImageNormal}
                            selectedImage={tabData.tabBookRoomImageSelected}
                            component={BookRoomPage} key="BookRoomPage" />

                        <Scene title=' '
                            image={tabData.tabSearchImageNormal}
                            selectedImage={tabData.tabSearchImageSelected}
                            component={SearchPage} key="SearchPage" />

                        <Scene title='分类'
                            image={tabData.tabCategoryImageNormal}
                            selectedImage={tabData.tabCategoryImageSelected}
                            component={CategoryPage} key="CategoryPage" />

                        <Scene
                            title='排行'
                            image={tabData.tabRankImageNormal}
                            selectedImage={tabData.tabRankImageSelected}
                            component={BookRankPage} key="BookRankPage" />
                    </Tabs>
                </Stack>
            </Router >
        )
    }
}


