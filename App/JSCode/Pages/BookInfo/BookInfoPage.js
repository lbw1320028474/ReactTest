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
  InteractionManager,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native'
import ActionBar from './ActionBar/ActionBar'
import TopCoverView from './SubViews/TopCoverView'
import ChapterView from './SubViews/ChapterView'
import RecommendView from './SubViews/RecommendView'
import StoreUtil from './Store/StoreUtil'
import BottomView from './SubViews/BottomView'
import FastImage from '../../Components/react-native-fast-image'
import Dpi from '../../Utils/Dpi'
import EventBus from '../../Utils/EventBus'
import GlobleUrl from '../../Globle/GlobleUrl'
import ImageResource from '../../../Resource/ImageResource'
import { observer, inject } from 'mobx-react/native';
import { observable, autorun, transaction } from 'mobx';
import BookInfoStore from './Store/BookInfoStore'
import Toast from '../../Components/teaset/components/Toast/Toast'
import GetBookDetailRequest from '../../Protocol/GetBookDetailRequest'
import NetWorkUtil from '../../Network/NetWorkUtil'
import GlobleKey from '../../Globle/GlobleKey';
import ErrActionBar from './ErrActionBar/ErrActionBar'
import RecordUtil from '../../Record/RecordUtil'
import RecordVar from '../../Record/RecordVar'
import { Bars } from '../../Components/react-native-loader'
@inject('appStore')
@observer
export default class BookInfoPage extends Component {
  @observable
  dataLoadState = 0;
  constructor(props) {
    super(props);
    let that = this;
    this.bookId;
    this.scrollViewRef;
    this.loadViewKey;
    this.isUnMontent = false;   //组件是否已经销毁
    this.loadNewBookListener = (newBookId) => {
      if (newBookId && newBookId !== null) {
        that.bookId = newBookId;
        that.showLoadView();
        that._toLoadData(newBookId);
      }
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


  _toLoadData(bookId) {
    let that = this;
    // let bookInfo = that.props.appStore.bookInfoStore;
    if (bookId) {
      that.bookId = bookId;
      let detailRequest = new GetBookDetailRequest();
      detailRequest.bookId = bookId;
      if (that.props.appStore.myPageStore.isLoaded === true
        && that.props.appStore.myPageStore.userId) {
        detailRequest.userId = that.props.appStore.myPageStore.userId;
      }
      timers = setInterval(() => {
        transaction(() => {
          that.props.appStore.bookInfoStore = new BookInfoStore();
        })
        if (that.scrollViewRef) {
          that.scrollViewRef.scrollTo({ x: 0, y: 0, animated: false })
        }
        that.dataLoadState = 1;
        if (timers) {
          clearInterval(timers)
        }
      }, 500)
      // 网络请求部分被注释了，用伪造数据代替
      // NetWorkUtil.getJsonByPost(
      //   GlobleUrl.URL_BASE_URL + GlobleUrl.URL_BOOK_INFO,
      //   JSON.stringify(detailRequest),
      //   (data) => {
      //     // alert((that) ? true : false)
      //     if (data && data.msgCode === 200) {
      //       // console.log(JSON.stringify(data) + ' = 图书详情页面')
      //       let bookInfoStore = StoreUtil.formatStore(data);
      //       if (bookInfoStore && bookInfoStore !== null) {
      //         transaction(() => {
      //           that.props.appStore.bookInfoStore = bookInfoStore;
      //         })
      //         if (that.scrollViewRef) {
      //           that.scrollViewRef.scrollTo({ x: 0, y: 0, animated: false })
      //         }
      //         that.dataLoadState = 1;
      //       } else {
      //         that.dataLoadState = 2;
      //       }
      //     } else {
      //       that.dataLoadState = 2;
      //     }
      //   }, (error) => {
      //     that.dataLoadState = 2;
      //     // // that.setState({ pageState: 2 });
      //     // if (!that || that.isUnMontent === true) {
      //     //   return;
      //     // }
      //   }
      // )

    } else {
      that.dataLoadState = 2;
      // if (!that || that.isUnMontent === true) {
      //   return;
      // }
      // that.setState({ pageState: 2 });
    }
  }

  componentWillUnmount() {
    let that = this;
    EventBus.removeListener(GlobleKey.EVENT_BOOKINFO_LOAD_NEWBOOK, this.loadNewBookListener);
    that.isUnMontent = true;
    this.hideLoadView();
  }

  componentDidMount() {
    let that = this;
    that.isUnMontent = false;
    that.showLoadView();
    if (that.props.data) {
      RecordUtil.showRecord(that.props.data, RecordVar.show_room_info, (new Date()).getTime());
    }
    autorun(() => {
      if (that && that.isUnMontent === false) {
        if (that.props.appStore.myPageStore.isLoaded) {
          that._toLoadData(that.props.data)
        } else {
          that._toLoadData(that.props.data)
        }
      }
    })
    EventBus.on(GlobleKey.EVENT_BOOKINFO_LOAD_NEWBOOK, this.loadNewBookListener)
    // InteractionManager.runAfterInteractions(() => {
    //   that.dataLoadState = 1;
    // })
  }

  render() {
    let that = this;
    let appTheme = that.props.appStore.appTheme;
    let bookInfoStore = that.props.appStore.bookInfoStore;
    if (that.dataLoadState === 0) {
      return (
        <View></View>
      )
    } else if (that.dataLoadState === 1 && bookInfoStore && bookInfoStore != null) {
      return (
        <View
          style={{ backgroundColor: appTheme.greyBgColor }}
        >
          <ScrollView
            ref={ref => that.scrollViewRef = ref}
            scrollEventThrottle={25}
            onScroll={(event) => {
              that.props.appStore.bookInfoStore.scrollViewOfsetY = event.nativeEvent.contentOffset.y;
            }}
            style={{ marginBottom: Dpi.d(96) }}>
            <TopCoverView></TopCoverView>
            <ChapterView navigation={that.props.navigation}></ChapterView>
            <Text style={{ padding: Dpi.s(30), fontSize: Dpi.s(26), color: appTheme.greyTextColor }}>本书所有内容均由搜索引擎提供，搜索结果系搜索引擎技术自动收录所得，若包含不良信息，请联系我们。</Text>
            <RecommendView></RecommendView>
          </ScrollView>
          <ActionBar navigation={that.props.navigation}></ActionBar>
          <BottomView navigation={that.props.navigation} data={bookInfoStore.bookId}></BottomView>
          {
            that.hideLoadView()
          }
        </View>
      );
    } else {
      return (
        <View
          style={{ flex: 1, backgroundColor: appTheme.mainColor }}
        >
          <ErrActionBar navigation={that.props.navigation}></ErrActionBar>
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
                that._toLoadData(that.bookId)
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
    }
  }
}

