/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, ListView, ActivityIndicator, InteractionManager, TouchableHighlight } from 'react-native'
import Toast from '../../Components/teaset/components/Toast/Toast'
// import BookItem from './BookItem'
import ActionBar from './ActionBar/ActionBar'
import { observer, inject } from 'mobx-react/native';
import GetGroupBookListRequest from '../../Protocol/GetGroupBookListRequest'
import NetWorkUtil from '../../Network/NetWorkUtil'
import GlobleUrl from '../../Globle/GlobleUrl'
import StoreUtil from './Store/StoreUtil'
import Dpi from '../../Utils/Dpi'
import BookInfoDraw from '../BookInfo/BookInfoDraw'
// import { LargeList } from '../../Components/react-native-largelist'
import { observable } from 'mobx'
import FastImage from '../../Components/react-native-fast-image';
import { BoxShadow } from '../../Components/react-native-shadow'
import ImageResource from '../../../Resource/ImageResource'
import { Bars } from '../../Components/react-native-loader'
import RecordUtil from '../../Record/RecordUtil'
import RecordVar from '../../Record/RecordVar'
@inject('appStore')
@observer
export default class BookListPage extends Component {
  @observable
  listViewData = [];
  @observable
  dataLoadState = 0;
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.loadViewKey;
    this.isInLoad = false;
    this.groupId = this.props.navigation.state.params.groupId
    this.groupName = this.props.navigation.state.params.groupName
    this.props.appStore.bookListStore.listName = this.groupName;
    this.props.appStore.bookListStore.listId = this.groupId;
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

  _loadData(start = 0, limit = 20) {
    // that.setState({ dataState: 2 });
    let that = this;
    that.isInLoad = true;
    if (that.groupId) {
      let listResquest = new GetGroupBookListRequest();
      listResquest.start = start;
      listResquest.limit = limit;
      listResquest.groupId = that.groupId;
      // let url = 'http://172.16.10.65:8482/zm-nvl-mis/nvl/groupbook/query.do';
      NetWorkUtil.getJsonByPost(
        GlobleUrl.URL_BASE_URL + GlobleUrl.URL_GROUP_LIST,
        JSON.stringify(listResquest),
        (data) => {
          that.isInLoad = false;
          that.hideLoadView();
          if (data && data.msgCode === 200) {
            let bookList = StoreUtil.formatStore(data);
            if (bookList && bookList !== null && bookList.length > 0) {
              // that.props.appStore.bookListStore.boolList = bookList;
              that.listViewData = that.listViewData.concat(bookList);
              that.dataLoadState = 1;
            } else {
              if (that.listViewData.length <= 0) {
                that.dataLoadState = 2;
              }
            }
          } else {
            if (that.listViewData.length <= 0) {
              that.dataLoadState = 2;
            }
          }
        },
        (err) => {
          that.isInLoad = false;
          that.hideLoadView();
          if (that.listViewData.length <= 0) {
            that.dataLoadState = 2;
          }
        }
      )
    } else {
      that.isInLoad = false;
      that.hideLoadView();
    }
  }

  componentWillUnmount() {
    this.hideLoadView();
  }

  componentDidMount() {
    let that = this;
    that.showLoadView();
    that._loadData();
  }

  hideLoadView() {
    let that = this;
    if (!that.loadViewKey) return;
    Toast.hide(that.loadViewKey);
    that.loadViewKey = undefined;
  }

  // //供外部打开此界面的接口
  // static open(navigation, novelId = 220552) {
  //   if (navigation) {
  //     navigation.navigate('KEY_SceneBookInfoDraw', { bookId: novelId });
  //   }
  // }

  static open(navigation, groupId, groupName = '') {
    if (navigation && groupId) {
      navigation.navigate('KEY_SceneBookListPage', { groupId: groupId, groupName: groupName });
    }
  }




  _renderView() {
    let that = this;
    appTheme = that.props.appStore.appTheme;
    if (that.dataLoadState === 0) {
      return (
        < View >
        </View >
      )
    } else if (that.dataLoadState === 1) {
      return (
        // <LargeList
        //   ref={ref => that.largeListRef = ref}
        //   style={{ flex: 1 }}
        //   bounces={false}
        //   numberOfRowsInSection={section => that.listViewData.length}
        //   numberOfSections={() => 1}
        //   safeMargin={600}
        //   heightForCell={(section, row) => Dpi.d(295)}
        //   renderCell={
        //     (section, row) => <BookItem navigation={that.props.navigation} data={(Array.from(that.listViewData))[row]}></BookItem>
        //   }
        // />
        <ListView
          removeClippedSubviews={true}
          enableEmptySections={true}
          style={{ flex: 1 }}
          dataSource={this.ds.cloneWithRows(Array.from(that.listViewData))}
          onEndReached={() => {
            if (that.isInLoad === true) {
              return;
            }
            that._loadData(that.listViewData.length)
          }}
          renderHeader={() => <View style={{ height: Dpi.d(20) }}></View>}
          onEndReachedThreshold={1}
          getItemLayout={(item, index) => ({ length: Dpi.d(255), offset: Dpi.d(255) * index, index: index })}
          renderRow={(rowData) => {
            return (
              // <BookItem navigation={that.props.navigation} data={rowData}></BookItem>
              // <ConstBookItem item={rowData} appTheme={that.props.appStore.appTheme}></ConstBookItem>
              ConstBookItem(rowData, that.props.appStore.appTheme, that.props.navigation)
            )
          }}
        />
      )
    } else {
      return (
        <View>
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
          </View >
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
      <View style={{ flex: 1, backgroundColor: appTheme.mainColor }}>
        <ActionBar navigation={that.props.navigation}>
        </ActionBar>
        {
          that._renderView()
        }
      </View>
    )
  }
}


const shadowOpt = {
  width: Dpi.d(192),
  height: Dpi.d(255),
  border: 5,
  radius: 1,
  opacity: 0.05,
  y: 1,
}

const ConstBookItem = (item, appTheme, navigation) => (
  // let that = this;
  // props.item = that.props.data;
  // let appTheme = that.props.appStore.appTheme;
  <TouchableHighlight
    style={{
      overflow: 'hidden',
    }}
    underlayColor={appTheme.greyBgColor}
    onPress={() => {
      BookInfoDraw.open(navigation, item.bookId);
      RecordUtil.clickRecord(item.bookId, RecordVar.click_list_item, (new Date()).getTime())
      //item.hasNewChapter = true;
    }}

  >
    <View
      style={{ alignItems: 'center', flexDirection: 'row', paddingVertical: Dpi.d(20), paddingHorizontal: Dpi.d(30) }}
    >
      {/* <BoxShadow
        setting={shadowOpt}
      > */}
      <FastImage
        style={{
          backgroundColor: '#f5f5f5',
          resizeMode: FastImage.resizeMode.stretch,
          width: Dpi.d(192),
          height: Dpi.d(255),
        }}
        source={{ uri: item.bookCoverUrl }}
      >
      </FastImage>
      {/* </BoxShadow> */}
      <View style={{ marginLeft: Dpi.d(19), height: Dpi.d(255), width: Dpi.d(443), justifyContent: 'space-around', paddingVertical: Dpi.d(15) }}>
        <Text numberOfLines={1} style={{ fontWeight: 'bold', color: appTheme.groupTitleTextColor, fontSize: Dpi.s(29) }}>{item.bookName}</Text>
        <Text numberOfLines={3} style={{ lineHeight: Dpi.d(40), fontSize: Dpi.d(25), color: appTheme.greyTextColor }}>{item.bookDescript}</Text>
        <View style={{ flexDirection: 'row', width: Dpi.d(443), justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', maxWidth: Dpi.d(221), }}>
            <FastImage source={ImageResource.authorIcon} style={{ width: Dpi.d(24), height: Dpi.d(25), resizeMode: 'stretch' }}></FastImage>
            <Text numberOfLines={1} style={{ marginLeft: Dpi.d(10), fontSize: Dpi.s(25), color: appTheme.lowGreyTextColor }}>{item.bookAuthor}</Text>
          </View>
          <Text style={{ maxWidth: Dpi.d(221), fontSize: Dpi.s(22), color: appTheme.lowGreyTextColor, borderRadius: Dpi.d(2), borderWidth: Dpi.d(1), borderColor: appTheme.lowGreyTextColor, padding: Dpi.d(5) }}>{item.bookCategory}</Text>
        </View>
      </View>
    </View>
  </TouchableHighlight >
)

