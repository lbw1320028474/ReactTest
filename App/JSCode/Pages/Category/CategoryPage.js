/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableHighlight, ActivityIndicator, InteractionManager } from 'react-native'
import { observer, inject } from 'mobx-react/native';
import FastImage from '../../Components/react-native-fast-image'
import ActionBar from './ActionBar/ActionBar'
import ImageResource from '../../../Resource/ImageResource'
import StoreUtil from './Store/StoreUtil'
import GetNaviDetailRequest from '../../Protocol/GetNaviDetailRequest'
import GroupView from './Group/GroupView'
import Dpi from '../../Utils/Dpi'
import GlobleUrl from '../../Globle/GlobleUrl'
import Toast from '../../Components/teaset/components/Toast/Toast'
import NetWorkUtil from '../../Network/NetWorkUtil'
import { observable, autorun } from 'mobx';
import MySorage from '../../Utils/MyStore/MySorage';
import GlobleKey from '../../Globle/GlobleKey';
import { Bars } from '../../Components/react-native-loader'
@inject('appStore')
@observer
export default class CategoryPage extends Component {
  @observable
  dataLoadState = 0
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
      duration: 10000,
    });
  }

  hideLoadView() {
    let that = this;
    if (!that.loadViewKey) return;
    Toast.hide(that.loadViewKey);
    that.loadViewKey = undefined;
  }


  componentDidMount() {
    let that = this;
    // InteractionManager.runAfterInteractions(() => {
    this.showLoadView();
    MySorage.loadByDefault(GlobleKey.KeyCategoryData, -1, (data) => {
      // 伪造数据开始
      data = require("../../../../testjson/bookcategory.json")
      // 伪造数据结束
      if (data && data !== -1) {
        let store = StoreUtil.formatStore(data);
        if (store && store !== null) {
          // //console.log('分类页面数据 = ' + store.categoryGroupList.length)
          that.props.appStore.categoryStore = store;
          that.dataLoadState = 1;
        }
      }
      that._loadData();
    })
    autorun(() => {
      if (that.props.appStore.tabData.selectedPage !== 'CategoryPage') {
        that.hideLoadView()
      }
    })
    // })
  }

  _loadData() {
    let that = this;
    let request = new GetNaviDetailRequest();
    request.naviType = 4;
    //console.log('加载分类页数据开始，' + request.naviType)
    
    NetWorkUtil.getJsonByPost(
      GlobleUrl.URL_BASE_URL + GlobleUrl.URL_NAVIL_INFO,
      JSON.stringify(request),
      (data) => {
        //console.log('加载分类页数据完成')
        
        
        if (data && data.msgCode === 200) {
          //console.log('分类页面数据 = ')
          let store = StoreUtil.formatStore(data);
          if (store && store !== null) {
            //console.log('分类页面数据 = ' + store.categoryGroupList.length)
            that.props.appStore.categoryStore = store;
            MySorage._sava(GlobleKey.KeyCategoryData, data);
            that.dataLoadState = 1;
          } else {
            if (that.props.appStore.categoryStore.categoryGroupList.length <= 0) {
              that.dataLoadState = 2;
            }
          }
          // if (store && store !== null) {
          //   that.props.appStore.tabData = store;
          //   MySorage._sava(GlobleKey.KeyBookRoomData, data);
          // }
        } else {
          //console.log('加载分类页数据错误1 = ' + JSON.stringify(data))
        }
      }, (err) => {
        if (that.props.appStore.categoryStore.categoryGroupList.length <= 0) {
          that.dataLoadState = 2;
        }
      }
    )
  }

  _renderView() {
    let that = this;
    let appTheme = that.props.appStore.appTheme;
    if (that.dataLoadState === 0) {
      return <View
        style={{
          flex: 1
        }}>
      </View>
    } else if (that.dataLoadState === 1) {

      let categoryStore = that.props.appStore.categoryStore;
      let categoryViews = [];
      if (categoryStore.categoryGroupList.length > 0) {
        categoryViews = categoryStore.categoryGroupList.map((item, index) => {
          return (
            <GroupView navigation={that.props.navigation} data={item} index={index}></GroupView>
          )
        })
      }
      return (
        <View style={{ flex: 1, backgroundColor: appTheme.greyBgColor }}>
          <ScrollView>
            {
              categoryViews
            }
          </ScrollView>
          {
            that.hideLoadView()
          }
        </View>
      );
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
      return <View>
        {that.hideLoadView()}
      </View>
    }
  }

  render() {
    let that = this;
    return (
      <View style={{ flex: 1 }}>
        <ActionBar></ActionBar>
        {
          that._renderView()
        }
      </View>
    )
  }
}

