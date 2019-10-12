/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
// import {
//     Scene,
//     Router,
//     Actions,
//     Tabs,
//     Stack,

// } from 'react-native-router-flux';
import React from 'react';
import { StackNavigator } from '../Components/react-navigation'; // 1.0.0-beta.14
import TabView from '../Pages/Tab/TabView'
import BookMenuInfoView from '../Pages/BookMenuInfoPage/BookMenuInfoView'
import CardStackStyleInterpolator from '../Components/react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import BookMenuListView from '../Pages/BookMenuListPage/BookMenuListView'
import MyPage from '../Pages/MyPage/MyPage'
import LoadPage from '../Pages/Load/LoadPage'
import RegisterPage from '../Pages/Register/RegisterPage'
import FindPasswordPage from '../Pages/FindPassword/FindPasswordPage'
import BookIReadPageDraw from '../Pages/BookRead/BookIReadPageDraw'
// import BookReadPage from '../Pages/BookRead/BookReadPage'
import BookInfoDraw from '../Pages/BookInfo/BookInfoDraw'
import CommunityPage from '../Pages/CommunityPage/CommunityPage'
import BookListPage from '../Pages/BookList/BookListPage'
// import PathDemo from '../Pages/PathTestDemo/PathDemo'
import WebViewPage from '../Pages/WebPage/WebViewPage'
import AboutPage from '../Pages/AboutWe/AboutPage'
import PowerPage from '../Pages/PowerPage/PowerPage'
import UserProtocal from '../Pages/UserProtocal/UserProtocal'
import ReadLogPage from '../Pages/ReadLogPage/ReadLogPage'

const SceneTabView = ({ navigation }) => (     //排行
    <TabView navigation={navigation}></TabView>
);
const SceneBookMenuInfoView = ({ navigation }) => (     //排行
    <BookMenuInfoView navigation={navigation}></BookMenuInfoView>
);
const SceneBookMenuListView = ({ navigation }) => (     //排行
    <BookMenuListView navigation={navigation}></BookMenuListView>
);
const SceneMyPage = ({ navigation }) => (     //排行
    <MyPage navigation={navigation}></MyPage>
);
const SceneLoadPage = ({ navigation }) => (     //排行
    <LoadPage navigation={navigation}></LoadPage>
);
const SceneRegisterPage = ({ navigation }) => (     //排行
    <RegisterPage navigation={navigation}></RegisterPage>
);
const SceneFindPasswordPage = ({ navigation }) => (     //排行
    <FindPasswordPage navigation={navigation}></FindPasswordPage>
);
const SceneBookInfoDraw = ({ navigation }) => (     //排行
    <BookInfoDraw navigation={navigation}></BookInfoDraw>
);
const SceneBookIReadPageDraw = ({ navigation }) => (     //排行
    <BookIReadPageDraw navigation={navigation}></BookIReadPageDraw>
);
const SceneCommunityPage = ({ navigation }) => (     //排行
    <CommunityPage navigation={navigation}></CommunityPage>
);
const SceneBookListPage = ({ navigation }) => (     //排行
    <BookListPage navigation={navigation}></BookListPage>
);
const SceneWebViewPage = ({ navigation }) => (     //排行
    <WebViewPage navigation={navigation}></WebViewPage>
);
const SceneAboutPage = ({ navigation }) => (     //排行
    <AboutPage navigation={navigation}></AboutPage>
);
const ScenePowerPage = ({ navigation }) => (     //排行
    <PowerPage navigation={navigation}></PowerPage>
);
const SceneReadLogPage = ({ navigation }) => (     //排行
    <ReadLogPage navigation={navigation}></ReadLogPage>
);
const SceneUserProtocal = ({ navigation }) => (     //排行
    <UserProtocal navigation={navigation}></UserProtocal>
);
// const ScenePathDemo = ({ navigation }) => (     //排行
//     <PathDemo navigation={navigation}></PathDemo>
// );

const NavitationTest = StackNavigator(
    {
        KEY_Tab: {
            screen: SceneTabView,
            navigationOptions: ({ navigation }) => ({
                header: null,
                gesturesEnabled: true,
            }),
        },
        KEY_BookMenuInfoView: {
            screen: SceneBookMenuInfoView,
            navigationOptions: ({ navigation }) => ({
                header: null,
                gesturesEnabled: true,
            }),
        },
        KEY_BookMenuListView: {
            screen: SceneBookMenuListView,
            navigationOptions: ({ navigation }) => ({
                header: null,
                gesturesEnabled: true,
            }),
        },
        KEY_SceneMyPage: {
            screen: SceneMyPage,
            navigationOptions: ({ navigation }) => ({
                header: null,
                gesturesEnabled: true,
            }),
        },
        KEY_LoadPage: {
            screen: SceneLoadPage,
            navigationOptions: ({ navigation }) => ({
                header: null,
                gesturesEnabled: true,
            }),
        },
        KEY_RegisterPage: {
            screen: SceneRegisterPage,
            navigationOptions: ({ navigation }) => ({
                header: null,
                gesturesEnabled: true,
            }),
        },
        KEY_FindPasswordPage: {
            screen: SceneFindPasswordPage,
            navigationOptions: ({ navigation }) => ({
                header: null,
                gesturesEnabled: true,
            }),
        },
        KEY_SceneBookInfoDraw: {
            screen: SceneBookInfoDraw,
            navigationOptions: ({ navigation }) => ({
                header: null,
                gesturesEnabled: true,
            }),

        },
        KEY_SceneBookInfoDrawView: {
            screen: SceneBookIReadPageDraw,
            navigationOptions: ({ navigation }) => ({
                header: null,
            }),
        },
        KEY_SceneCommunityPage: {
            screen: SceneCommunityPage,
            navigationOptions: ({ navigation }) => ({
                header: null,
                gesturesEnabled: true,
            }),
        },
        KEY_SceneBookListPage: {
            screen: SceneBookListPage,
            navigationOptions: ({ navigation }) => ({
                header: null,
                gesturesEnabled: true,
            }),
        },
        KEY_SceneWebViewPage: {
            screen: SceneWebViewPage,
            navigationOptions: ({ navigation }) => ({
                header: null,
                gesturesEnabled: true,
            }),
        },
        KEY_SceneAboutPage: {
            screen: SceneAboutPage,
            navigationOptions: ({ navigation }) => ({
                header: null,
                gesturesEnabled: true,
            }),
        },
        KEY_ScenePowerPage: {
            screen: ScenePowerPage,
            navigationOptions: ({ navigation }) => ({
                header: null,
                gesturesEnabled: true,
            }),
        },
        KEY_SceneReadLogPage: {
            screen: SceneReadLogPage,
            navigationOptions: ({ navigation }) => ({
                header: null,
                gesturesEnabled: true,
            }),
        },
        KEY_SceneUserProtocal: {
            screen: SceneUserProtocal,
            navigationOptions: ({ navigation }) => ({
                header: null,
                gesturesEnabled: true,
            }),
        },
        // KEY_SceneBookInfoDrawView: {    //测试的deeplink链接，忽视就好
        //     screen: ScenePathDemo,
        //     path: "/pages/Home",
        //     navigationOptions: ({ navigation }) => ({
        //         header: null,
        //     }),
        // }
    },
    {
        initialRouteName: 'KEY_Tab',
        transitionConfig: () => {
            return (
                {
                    screenInterpolator: CardStackStyleInterpolator.forHorizontal,
                }
            )
        }
    }
);


export default NavitationTest;



