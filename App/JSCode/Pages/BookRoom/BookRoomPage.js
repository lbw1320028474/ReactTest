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
  RefreshControl,
  FlatList,
  ActivityIndicator,
  InteractionManager,
  TouchableHighlight,
  Platform,
  BackHandler,
  StyleSheet,
  ListView,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import ImageResource from '../../../Resource/ImageResource'
import HeadBanner from './HeadBanner/HeadBanner'
import SubBanner from './SubBanner/SubBanner'
import BookMenu from './BookMenu/BookMenu'
import FastImage from '../../Components/react-native-fast-image'
import HotBookView from './HotBookList/HotBookView'
import OttBookView from './OTTBookList/OttBookView'
import ThreeBookView from './ThreeBookList/ThreeBookView'
import ActionBar from './ActionBar/ActionBar'
import StoreUtil from './Store/StoreUtil'
import NetWorkUtil from '../../Network/NetWorkUtil'
import { LargeList } from '../../Components/react-native-largelist'
import Toast from '../../Components/teaset/components/Toast/Toast'
import NormalListView from './NormalList/NormalListView'
import GetNaviDetailRequest from '../../Protocol/GetNaviDetailRequest'
import EventBus from '../../Utils/EventBus'
import MySorage from '../../Utils/MyStore/MySorage'
import Dpi from '../../Utils/Dpi'
import GlobleKey from '../../Globle/GlobleKey';
import ErrActionBar from './ErrActionBar/ErrActionBar'
import GlobleUrl from '../../Globle/GlobleUrl';
import { Bars } from '../../Components/react-native-loader'
import { observable, transaction, autorun } from 'mobx'
import { observer, inject } from 'mobx-react/native';
import Overlay from '../../Components/teaset/components/Overlay/Overlay'
import PushUtil from '../../Components/Umeng/PushUtil'
import MyToast from '../../Components/MyToast'
import BookInfoDrawView from '../BookInfo/BookInfoDraw';
import BookListPage from '../BookList/BookListPage';
import ApkUtil from '../../NativeModul/ApkUtil'
import TtoTView from './TtoTView/TtoTView'
import CatchDataManager from '../../Catch/CatchDataManager';
import RecordUtil from '../../Record/RecordUtil';
import RecordVar from '../../Record/RecordVar'
import MyText from '../../Components/MyText'
import PTRControl from '../../Components/react-native-ptr-control'
import GlobleVar from '../../Globle/GlobleVar';
@inject('appStore')
@observer
export default class BookRoomPage extends Component {
  @observable
  refreshing = false;
  @observable
  dataLoadState = 0;
  @observable
  listViewData = [];
  constructor(props) {
    super(props);
    let that = this;
    this.lastBackPressTime = 0;
    this.refreshRef;
    this.lastLoadTime = 0;
    this.footTextViewRef;
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.isReload = true;
    this.state = {
      refreshing: false
    }
    this.loadViewKey;
    this.hasCatch = false;
    this.catchListener = (data) => {
      chapterStore = that.props.appStore.chapterListStore;
      if (data && chapterStore && chapterStore.bookId == data.bookId && data.chapterOrder) {
        if (chapterStore.chapterList && data.chapterOrder - 1 < chapterStore.chapterList.length) {
          chapterStore.chapterList[data.chapterOrder - 1].catchState = 2;
        }
      }
    }


    this.backHandler = () => {
      if (Platform.OS === 'android') {
        let backTimer = new Date();
        if (backTimer - that.lastBackPressTime <= 1500) {
          that.lastBackPressTime = backTimer.getTime();
          if (CatchDataManager.allCatchQueue && CatchDataManager.allCatchQueue.size > 0) {
            that._showCancleDialog(CatchDataManager.allCatchQueue.size);
            return true;
          } else {
            // ApkUtil.killApp();
            // return false;
            BackHandler.exitApp();
            ApkUtil.killApp();
            // let timer = setTimeout(()=>{
            // }, 500);
            return true;
          }
        } else {
          that.lastBackPressTime = backTimer.getTime();
          MyToast.show('双击返回键退出')
          return true;
        }
      }
    }
  }

  _showCancleDialog(catchSize = 1) {
    let that = this;
    let appTheme = this.props.appStore.appTheme;
    let overlayView = (
      <Overlay.View
        style={{ alignItems: 'center', justifyContent: 'center' }}
        modal={true}
        overlayOpacity={0.5}
        ref={v => this.overlayView = v}
      >
        <View style={{ backgroundColor: appTheme.mainBgColor, borderRadius: Dpi.d(20), }}>
          <View>
            <Text style={{ textAlign: 'center', marginVertical: Dpi.d(66), marginHorizontal: Dpi.d(75), fontSize: Dpi.s(28), color: appTheme.groupTitleTextColor }}>当前存在缓存任务({catchSize}章正在缓存)，{'\n'}退出后任务将会停止。确定退出吗？</Text>
          </View>
          <View
            style={{ borderTopColor: appTheme.lowGreyTextColor, borderTopWidth: Dpi.d(1), flexDirection: 'row', justifyContent: 'space-around', }}
          >
            <TouchableOpacity
              onPress={() => {
                Overlay.hide(that.overlayViewKey);
              }}
            >
              <Text style={{ margin: Dpi.d(19), color: appTheme.groupTitleTextColor, fontSize: Dpi.d(30) }}>再看看</Text>
            </TouchableOpacity>
            <View style={{ width: Dpi.d(1), backgroundColor: appTheme.lowGreyTextColor }}></View>
            <TouchableOpacity
              onPress={() => {
                Overlay.hide(that.overlayViewKey);
                ApkUtil.killApp();
              }}
            >
              <Text style={{ margin: Dpi.d(19), color: appTheme.hightLightTextColor, fontSize: Dpi.d(30) }}>去意已决</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Overlay.View >
    );
    that.overlayViewKey = Overlay.show(overlayView);
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
    // that.setState({
    //   refreshing: false
    // })
    if (!that.loadViewKey) return;
    Toast.hide(that.loadViewKey);
    that.loadViewKey = undefined;
  }

  // _onRefresh() {
  //   let that = this;
  //   that.refreshing = true;
  //   let timer = setInterval(() => {
  //     that.refreshing = false;
  //     if (timer) {
  //       clearInterval(timer)
  //     }
  //   }, 2000);
  // }

  // _onRefresh() {
  //   let that = this;
  //   that.refreshing = true;
  //   let timer = setInterval(() => {
  //     that.refreshing = false;
  //     if (timer) {
  //       clearInterval(timer)
  //     }
  //   }, 2000);
  // }

  componentDidMount() {
    let that = this;
    let tabData = that.props.appStore.tabData;
    let recordTimer = setInterval(() => {
      RecordUtil.showRecord(tabData.tab_02_id, RecordVar.show_room_page, (new Date()).getTime());
      if (recordTimer) {
        clearInterval(recordTimer)
      }
    }, 1000);
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.backHandler)
    }



    EventBus.on(GlobleKey.EVENT_CATCH_CHANGED, this.catchListener);
    // InteractionManager.runAfterInteractions(() => {
    MySorage.loadByDefault(GlobleKey.KeyBookRoomData, -1, (data) => {
      // 伪造数据开始
      data = {}
      data = require("../../../../JsonData/bookroomdata.json")
      // 伪造数据结束
      if (data && data !== -1) {
        
        let store = StoreUtil.formatStore(data);
        if (store && store !== null) {
          that.props.appStore.bookRoomStore = store;
          that.hasCatch = true;
          that.isReload = true;
          that._choseItemToRender();
        }
      }
      that._loadData();
    })
    // })
    that._pushAction(that);
    autorun(() => {
      if (that.props.appStore.tabData.selectedPage !== 'BookRoomPage') {
        that.hideLoadView()
      }
    })
  }


  listenerPush(that) {
    if (Platform.OS === 'android') {
      PushUtil.addPushActionListener((action, book_id, list_id, list_title, third_book_id) => {
        //console.log('获取到push数据' + "action = " + action + " + " + "book_id = " + book_id + " + list_id = " + list_id)
        if (action === '1' && book_id) {
          // BookInfoDrawView.open(that.props.navigation, book_id);
          BookInfoDrawView.open(that.props.navigation, book_id)
        } else if (action === '2' && list_id) {
          // BookListPage.open(that.props.navigation, list_id, list_title);
          BookListPage.open(that.props.navigation, list_id, list_title)
        }
        that.listenerPush(that);    //由于通过回调的方式和原生端通信，原生端只能调用一次回调后就会失效，所以在使用了回调后从新注册新的监听，以便下次回调
      });
    } else if (Platform.OS === 'ios') {
      PushUtil.addPushActionListener((err, data) => {
        //alert('接收到回调通知' + data);
        if (data && data.length === 4) {
          let action = data[0];
          let list_id = data[1];
          let list_title = data[2];
          let book_id = data[3];
          // alert('push详情 ：' + action + " + " + list_id + " + " + list_title + " + " + book_id);
          if (action == '1' && book_id && book_id !== '') {
            // alert('push详情 ：' + data);
            BookInfoDrawView.open(that.props.navigation, book_id)
            // BookInfoDrawView.open(that.props.navigation, parseInt(book_id));
          } else if (action == '2' && list_id && list_id !== '') {
            // alert('push1数据 ：' + data);
            BookListPage.open(that.props.navigation, parseInt(list_id), list_title);
            // BookListPage.open(that.props.navigation, parseInt(list_id), list_title)
          }
        }
        that.listenerPush(that);
      });
    }
  }
  _pushAction(that) {
    if (Platform.OS === 'android') {
      //console.log('开始请求push数据')
      //PushModule.pushListener.invoke(action, book_id, list_id, list_title, third_book_id);
      PushUtil.getPushData((action, book_id, list_id, list_title, third_book_id) => {
        //console.log('获取到push数据' + "action = " + action + " + " + "book_id = " + book_id + " + list_id = " + list_id);
        //console.log((action == '1') + ' + ' + book_id)
        if (action == '1' && book_id) {
          //console.log('获取到push数据1' + "action = " + action + " + " + "book_id = " + book_id + " + list_id = " + list_id)
          BookInfoDrawView.open(that.props.navigation, book_id)
        } else if (action == '2' && list_id) {
          //console.log('获取到push数据2' + "action = " + action + " + " + "book_id = " + book_id + " + list_id = " + list_id)
          BookListPage.open(that.props.navigation, list_id, list_title)
        }
      });
      that.listenerPush(that);

    } else if (Platform.OS === 'ios') {
      PushUtil.getPushData((err, data) => {
        if (data && data.length === 4) {
          let action = data[0];
          let list_id = data[1];
          let list_title = data[2];
          let book_id = data[3];
          //console.log('push详情 ：' + action + " + " + list_id + " + " + list_title + " + " + book_id);
          if (action == '1' && book_id && book_id !== '') {
            //console.log('push详情 ：' + data);
            BookInfoDrawView.open(that.props.navigation, book_id)
            // BookInfoDrawView.open(that.props.navigation, parseInt(book_id));
          } else if (action == '2' && list_id && list_id !== '') {
            //console.log('push1数据 ：' + data);
            BookListPage.open(that.props.navigation, parseInt(list_id), list_title);
          }
        }
      })
      that.listenerPush(that);
    }
  }


  _loadData() {
    let that = this;
    let request = new GetNaviDetailRequest();
    request.naviType = 2;
    //console.log('加载bookroom页数据开始，' + request.naviId)
    if ((new Date()).getTime() - that.lastLoadTime < 1000) {
      return;
    } else {
      that.lastLoadTime = (new Date()).getTime();
    }
    that.setState({
      refreshing: true
    })
    NetWorkUtil.getJsonByPost(
      GlobleUrl.URL_BASE_URL + GlobleUrl.URL_NAVIL_INFO,
      JSON.stringify(request),
      (data) => {
        //console.log('加载bookroom页数据完成')
        that.setState({
          refreshing: false
        })
        that.lastLoadTime = (new Date()).getTime();
        if (data && data.msgCode === 200) {
          //console.log('bookroom页面数据请求完成')
          let store = StoreUtil.formatStore(data);
          if (store && store !== null) {
            MySorage._sava(GlobleKey.KeyBookRoomData, data);
            that.props.appStore.bookRoomStore = store;
            that.hasCatch = true;
            that.isReload = true;
            that._choseItemToRender();
          } else {
            if (that.hasCatch === false) {
              that.dataLoadState = 2;
            }
          }
          // if (store && store !== null) {
          //   that.props.appStore.tabData = store;
          //   MySorage._sava(GlobleKey.KeyBookRoomData, data);
          // }
        } else {
          //console.log('加载bookroom页数据错误1 = ' + JSON.stringify(data))
          if (that.hasCatch === false) {
            that.dataLoadState = 2;
          }
        }
      }, (err) => {
        // that.lastLoadTime = (new Date()).getTime();
        //console.log('加载bookroom页数据错误2 = ' + err)
        that.setState({
          refreshing: false
        })
        if (that.hasCatch === false) {
          that.dataLoadState = 2;
        }
      }
    )
  }

  componentWillUnmount() {
    EventBus.removeListener(GlobleKey.EVENT_CATCH_CHANGED, this.catchListener);

    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
      // PushUtil.removePushActionListener();    //删除js端push监听
    }
  }

  _renderItem(item, index) {
    let that = this;
    if (item.groupType === 0) {
      return (
        <HeadBanner navigation={that.props.navigation} data={item}></HeadBanner>
      )
    } else if (item.groupType === 1) {
      return (
        <BookMenu navigation={that.props.navigation} data={item}></BookMenu>
      )
    } else if (item.groupType === 2) {
      return (
        <HotBookView data={item} navigation={that.props.navigation}></HotBookView>
      )
    } else if (item.groupType === 4) {
      return (
        <NormalListView data={item} navigation={that.props.navigation}></NormalListView>
      )
    } else if (item.groupType === 3) {
      return (
        <SubBanner data={item} navigation={that.props.navigation}></SubBanner>
      )
    } else if (item.groupType === 5) {
      return (
        <ThreeBookView data={item} navigation={that.props.navigation}></ThreeBookView>
      )
    } else if (item.groupType === 6) {
      return (
        <TtoTView data={item} navigation={that.props.navigation}></TtoTView>
      )
    } else if (item.groupType === 7) {
      return (
        <OttBookView data={item} navigation={that.props.navigation}></OttBookView>
      )
    }
  }

  //下拉刷新
  _onRefresh() {
    let that = this;
    if ((new Date()).getTime() - that.lastLoadTime > 10000) {
      that._loadData();
    } else {
      that._hildRefresth()
    }
  }

  //加载更多
  _onLoadMore() {
    let groupList = Array.from(this.props.appStore.bookRoomStore.groupList);
    if (groupList && groupList.length > 0) {
      if (this.listViewData.length >= groupList.length) {
        if (this.footTextViewRef) {
          this.footTextViewRef.setText('--------我是有底线的--------');
        }
      }
    }
    this._choseItemToRender();
    this._hildLoadMore();
  }

  //分组类型， 0:banner = 1.5,  1：推荐书单=2 , 2: 热门追更=2， 3：小banner=1， 4：正常列表=5   ,5:3-1样式=1,  6:3-3样式=2    //“ = ”号后面的数字是组件占比的比重
  _choseItemToRender() {
    transaction(() => {   //事务
      let that = this;
      let groupList = Array.from(that.props.appStore.bookRoomStore.groupList);
      if (that.isReload === true) {
        that.listViewData = [];
        if (that.footTextViewRef) {
          that.footTextViewRef.setText('正在加载更多')
        }
        that.isReload = false;
        that._hildRefresth();
      }
      if (groupList && groupList.length > 0) {
        if (that.listViewData.length < groupList.length) {
          let viewLenght = 0;
          for (let i = that.listViewData.length; i < groupList.length; ++i) {
            if (viewLenght >= 7) {
              if (that.dataLoadState !== 1) {
                that.dataLoadState = 1
              }
              return;
            }
            let item = groupList[i];
            that.listViewData.push(item);
            if (item && item.groupType === 0) {
              viewLenght += 1.5;
            } else if (item && item.groupType === 1) {
              viewLenght += 2;
            } else if (item && item.groupType === 2) {
              viewLenght += 2;
            } else if (item && item.groupType === 3) {
              viewLenght += 1;
            } else if (item && item.groupType === 4) {
              viewLenght += 5;
            } else if (item && item.groupType === 5) {
              viewLenght += 1;
            } else if (item && item.groupType === 6) {
              viewLenght += 2;
            } else if (item && item.groupType === 7) {
              viewLenght += 3;
            }
          }

          if (that.dataLoadState !== 1) {
            that.dataLoadState = 1
          }
        }
      } else {
        that.dataLoadState = 2
      }
    })
  }

  _hildLoadMore() {
    let timer = setInterval(() => {
      // PTRControl.headerRefreshDone();
      PTRControl.footerInfiniteDone();
      if (timer) {
        clearInterval(timer)
      }
    }, 1000);
  }

  _hildRefresth() {
    let timer = setInterval(() => {
      PTRControl.headerRefreshDone();
      // PTRControl.footerInfiniteDone();
      if (timer) {
        clearInterval(timer)
      }
    }, 1000);
  }

  render() {
    let that = this;
    let appTheme = this.props.appStore.appTheme;
    let bookRoomViews = [];

    //that.props.appStore.bookRoomStore.groupList
    if (that.dataLoadState === 0) {
      return (
        <View
          style={{ backgroundColor: appTheme.mainColor, flex: 1 }}
        >
          <ErrActionBar></ErrActionBar>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <ActivityIndicator size='large' color={appTheme.hightLightColor} />
          </View>
        </View>
      )
    } else if (that.dataLoadState === 1) {
      return (
        <View style={{ flex: 1 }}>
          <ListView
            enableEmptySections={true}
            style={{ flex: 1 }}
            dataSource={this.ds.cloneWithRows(Array.from(that.listViewData))}
            onEndReached={() => {
              that._onLoadMore();
            }}
            onScroll={(event) => {
              that.props.appStore.bookRoomStore.scrollViewOfsetY = event.nativeEvent.contentOffset.y;
            }}
            refreshControl={
              < RefreshControl
                colors={[appTheme.hightLightColor]}
                refreshing={that.refreshing}
                onRefresh={that._onRefresh.bind(that)}
              />
            }
            renderFooter={() => {
              return (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: Dpi.d(100),
                  }}
                >
                  <MyText
                    style={{
                      color: appTheme.subTextColor,
                      fontSize: Dpi.d(25)
                    }}
                    ref={ref => that.footTextViewRef = ref}
                    text='正在加载更多...'
                  ></MyText>
                </View>
              )
            }}
            onEndReachedThreshold={1}
            // getItemLayout={(item, index) => ({ length: Dpi.d(255), offset: Dpi.d(255) * index, index: index })}
            renderRow={(rowData) => that._renderItem(rowData)}
          />
          <ActionBar></ActionBar>
          {
            that.hideLoadView()
          }

        </View>
      )

    } else {
      return (
        <View style={{ flex: 1, backgroundColor: appTheme.greyBgColor }}>
          <ErrActionBar></ErrActionBar>
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
                  // that.showLoadView();
                  that._loadData();
                }}
                style={{
                  marginTop: Dpi.d(40)
                }}
              >
                <View
                  style={{ paddingHorizontal: Dpi.d(44), paddingVertical: Dpi.d(21), borderRadius: Dpi.d(8), borderWidth: Dpi.d(3), borderColor: appTheme.hightLightColor }}
                >
                  <Text style={{ color: appTheme.hightLightTextColor }}>重新加载</Text>
                </View>
              </TouchableHighlight>
              {
                that.hideLoadView()
              }
            </View >
          </View>
        </View>
      )
    }
  }
}


class HeaderRefresh extends Component {
  static defaultProps = {
    gestureStatus: 2,
    offset: 0
  }

  constructor(props) {
    super(props)
  }

  render() {
    let { gestureStatus } = this.props, _refreshFont = ''
    switch (gestureStatus) {
      case 2:
        _refreshFont = '继续下拉刷新'
        break;
      case 3:
        _refreshFont = '释放刷新'
        break;
      case 4:
        _refreshFont = '正在刷新...'
        break;
      default:
        _refreshFont = '继续下拉刷新'
    }
    return (
      <View style={[Styles.headerRefresh, { height: Dpi.d(150) }]}>
        {gestureStatus === 4 ?
          <ActivityIndicator
            size={'small'}
            animating={true}
            color={'#ffffff'}
            style={{ marginRight: 10 }} /> : null}
        <Text style={Styles.refreshFont}>{_refreshFont}</Text>
      </View>
    )
  }
}


const Styles = StyleSheet.create({
  headerRefresh: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#45CAB9',

  },
  footerInfinite: {
    width: Dimensions.get('window').width,
    height: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  refreshFont: {
    fontSize: Dpi.d(22),
    color: '#ffffff'
  },
  footFont: {
    fontSize: Dpi.d(22),
    color: '#333333'
  }
})



class FooterInfinite extends Component {
  static defaultProps = {
    gestureStatus: 1
  }

  constructor(props) {
    super(props)
  }

  render() {
    let { gestureStatus } = this.props, _refreshFont = ''
    return (
      <View style={Styles.footerInfinite}>
      </View>
    );
  }
}