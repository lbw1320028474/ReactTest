/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, InteractionManager, ActivityIndicator, TouchableHighlight } from 'react-native'
import { observer, inject } from 'mobx-react/native';
import ActionBar from './ActionBar/ActionBar'
import GetNaviDetailRequest from '../../Protocol/GetNaviDetailRequest'
import Toast from '../../Components/teaset/components/Toast/Toast'
import Dpi from '../../Utils/Dpi'
import FastImage from '../../Components/react-native-fast-image'
import NetWorkUtil from '../../Network/NetWorkUtil'
import GlobleUrl from '../../Globle/GlobleUrl'
import ImageResource from '../../../Resource/ImageResource'
import GlobleKey from '../../Globle/GlobleKey'
import MySorage from '../../Utils/MyStore/MySorage'
import AppUtils from '../../Utils/AppUtils'
import ScrollBar from './ScrollBar/ScrollBar'
import RankTab from './ListViewBar/RankTab'
import StoreUtil from './Store/StoreUtil'
import { observable, autorun } from 'mobx';
import { Bars } from '../../Components/react-native-loader'
@inject('appStore')
@observer
export default class BookRankPage extends Component {
  @observable
  dataLoadState = 0
  constructor(props) {
    super(props);
    this.loadViewKey;
  }



  componentDidMount() {
    let that = this;
    // this.showLoadView();
    // InteractionManager.runAfterInteractions(() => {
    that.showLoadView();
    MySorage.loadByDefault(GlobleKey.KeyRankData, -1, (data) => {
      // 伪造数据开始
      data = require("../../../../testjson/bookrank.json")
      // 伪造数据结束
      if (data && data !== -1) {
        let store = StoreUtil.formatStore(data);
        //console.log('装好完成')
        // alert(store === null);
        if (store && store !== null) {
          that.props.appStore.bookRankStore = store;
          that.dataLoadState = 1;
        }
      }
      that._loadData();
    })
    autorun(() => {
      if (that.props.appStore.tabData.selectedPage !== 'BookRankPage') {
        that.hideLoadView()
      }
    })
    // })
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

  _loadData() {
    let that = this;
    let request = new GetNaviDetailRequest();
    request.naviType = 7;
    //console.log('加载排行页数据开始，' + request.naviType)
    NetWorkUtil.getJsonByPost(
      GlobleUrl.URL_BASE_URL + GlobleUrl.URL_NAVIL_INFO,
      JSON.stringify(request),
      (data) => {
        if (data && data.msgCode === 200) {
          // //console.log('排行页面数据 = ' + JSON.stringify(data))
          let store = StoreUtil.formatStore(data);
          //console.log('装好完成')
          // alert(store === null);
          if (store && store !== null) {
            that.props.appStore.bookRankStore = store;
            that.dataLoadState = 1;
            MySorage._sava(GlobleKey.KeyRankData, data);
          } else {
            that.dataLoadState = 2;
          }
        } else {
          //console.log('加载排行页数据错误1 = ' + JSON.stringify(data));
          if (that.props.appStore.bookRankStore.rankList.length <= 0) {
            that.dataLoadState = 2;
          }
        }
      }, (err) => {
        //console.log('加载排行页数据错误2 = ' + err)
        if (that.props.appStore.bookRankStore.rankList.length <= 0) {
          that.dataLoadState = 2;
        }
      }
    )
  }

  _renderView() {
    let that = this;
    appTheme = that.props.appStore.appTheme;
    if (that.dataLoadState === 0) {
      return (
        <View>
          {
            that.hideLoadView()
          }
        </View>
      )
    } else if (that.dataLoadState === 1) {
      return (
        <View style={{ flexDirection: 'row', height: AppUtils.size.height - Dpi.d(220) }}>
          <ScrollBar></ScrollBar>
          <RankTab navigation={that.props.navigation}></RankTab>
          {
            that.hideLoadView()
          }
        </View>
      )
    } else if (that.dataLoadState === 2) {
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
                that._loadData();
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
    } else {
      return (
        <View>
          {
            that.hideLoadView()
          }
        </View>
      )
    }
  }

  render() {
    let that = this;
    let appTheme = this.props.appStore.appTheme;
    return (
      <View style={{ flex: 1, backgroundColor: appTheme.mainBgColor, paddingBottom: Dpi.d(100) }}>
        <ActionBar></ActionBar>
        {
          that._renderView()
        }
      </View>
    );
  }
}




