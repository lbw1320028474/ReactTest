/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableHighlight } from 'react-native'
import { observer, inject } from 'mobx-react/native';
import ActionBar from './View/ActionBar'
import ShowByCover from './View/ShowByCover'
import ShowByList from './View/ShowByList'
import EventBus from '../../Utils/EventBus'
import GlobleKey from '../../Globle/GlobleKey'
import Dpi from '../../Utils/Dpi'
import MySorage from '../../Utils/MyStore/MySorage'
import Toast from '../../Components/teaset/components/Toast/Toast'
import Drawer from '../../Components/teaset/components/Drawer/Drawer'
import { observable, autorun, reaction, transaction } from 'mobx';
import BookCaseUtil from './Utils/BookCaseUtil';
import StoreUtil from './Store/StoreUtil';
import FastImage from '../../Components/react-native-fast-image';
import BookIReadPageDraw from '../BookRead/BookIReadPageDraw'
import ImageResource from '../../../Resource/ImageResource';
import LoadPage from '../Load/LoadPage'
import { Bars } from '../../Components/react-native-loader'
import BookMenuInfoView from '../BookMenuInfoPage/BookMenuInfoView';
import RecordUtil from '../../Record/RecordUtil'
import RecordVar from '../../Record/RecordVar'
/**
 * 分类页面
 */
@inject('appStore')
@observer
export default class BookCasePage extends Component {
  @observable
  dataLoadState = 0;
  constructor(props) {
    super(props);
    let that = this;
    this.loadViewKey;
    this.popuViewKey;
    /**
     * 
     * @param {*} itemData 操作的数据
     */
    this.itemLongClick = function (itemData) {
      that._showPopu(itemData);
    };
    this.bookCaseReloadListener = function () {
      that._loadBookCaseData();
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


  _loadBookCaseData() {
    let that = this;
    let myPageStore = that.props.appStore.myPageStore;
    let bookCaseStore = this.props.appStore.bookCaseStore;
    let readLogStore = this.props.appStore.readLogStore;
    if (myPageStore.isLoaded === true && myPageStore.userId) {
      //console.log('开始请求书包列表');
      BookCaseUtil.getBookBagList((data) => {
        //console.log('书包列表:' + JSON.stringify(data));
      //  伪造数据开始
      data.msgCode = 200
      data.req = require("../../../../JsonData/bookbagtestdata.json")       
      // 伪造数据结束
        that.hideLoadView();
        if (data.msgCode === 200) {
          let newBookCaseStore = StoreUtil.formatStore(data);
          if (newBookCaseStore && newBookCaseStore !== null) {
            bookCaseStore.bookCaseList = newBookCaseStore.bookCaseList;
            // bookCaseStore.bookCaseList = newBookCaseStore.bookCaseList;
            bookCaseStore.addDefaultBean();
            bookCaseStore.setHaveNewChapter();
            readLogStore.resetIsPag(bookCaseStore.bookCaseList);
            that.dataLoadState = 1;
            MySorage._sava(GlobleKey.KeyBookCaseData, data);
          } else {
            if (bookCaseStore.bookCaseList && bookCaseStore.bookCaseList.length > 0 && that.dataLoadState === 1) {

            } else {
              that.dataLoadState = 2;
            }
          }
          // bookCaseStore.bookCaseList = StoreUtil.formatStore(data);
        } else {
          if (bookCaseStore.bookCaseList && bookCaseStore.bookCaseList.length > 0 && that.dataLoadState === 1) {

          } else {
            that.dataLoadState = 2;
          }
        }
      }, myPageStore.userId)
    } else {
      that.dataLoadState = 3;
    }
  }



  componentDidMount() {
    let that = this;
    EventBus.on(GlobleKey.EVENT_BOOKCASEITEM_LONGCLICK, this.itemLongClick);
    EventBus.on(GlobleKey.EVENT_BOOKCASE_RELOAD, that.bookCaseReloadListener);
    // let myPageStore = that.props.appStore.myPageStore;
    // that.showLoadView();
    // that._loadBookCaseData();
    let ap = that.props.appStore.myPageStore;
    that.showLoadView();
    // autorun(() => {
    // alert('重新秦秋')
    if (that.props.appStore.myPageStore.userId && that.props.appStore.myPageStore.userId !== '') {
      // alert(JSON.stringify(that.props.appStore.myPageStore) + ' + ' + (ap === that.props.appStore.myPageStore));
      MySorage.loadByDefault(GlobleKey.KeyBookCaseData, -1, (data) => {
        if (data && data !== -1) {
          let bookCaseStore = that.props.appStore.bookCaseStore;
          let newBookCaseStore = StoreUtil.formatStore(data);
          let readLogStore = that.props.appStore.readLogStore;
          if (newBookCaseStore && newBookCaseStore !== null) {
            bookCaseStore.bookCaseList = newBookCaseStore.bookCaseList;
            bookCaseStore.addDefaultBean();
            bookCaseStore.setHaveNewChapter();
            readLogStore.resetIsPag(bookCaseStore.bookCaseList);
            that.dataLoadState = 1;
          }
        }
        that._loadBookCaseData();
      })
    } else {
      that.dataLoadState = 3;
    }

    autorun(() => {
      if (that.props.appStore.tabData.selectedPage !== 'BookCasePage') {
        that.hideLoadView()
      }
    })
    // })
  }

  componentWillUnmount() {
    EventBus.removeListener(GlobleKey.EVENT_BOOKCASEITEM_LONGCLICK, this.itemLongClick);
    EventBus.removeListener(GlobleKey.EVENT_BOOKCASE_RELOAD, this.bookCaseReloadListener);
  }

  _showPopu(itemData) {
    let appTheme = this.props.appStore.appTheme;
    let that = this;
    let bookCaseStore = this.props.appStore.bookCaseStore;

    let view = (
      <View style={{ backgroundColor: appTheme.mainBgColor, height: Dpi.d(511) }}>
        <TouchableHighlight
          style={{ height: Dpi.d(209), borderBottomColor: appTheme.devideLineColor, borderBottomWidth: Dpi.d(1) }}
          onPress={() => {
            if (that.popuViewKey && that.popuViewKey !== null) {
              that.popuViewKey.close();
            }

            bookCaseStore.addNewUpdataBean({
              bookId: itemData.bookId + '',
              nowChapterOrder: itemData.lastChapterOrder + ''
            })
            // BookIReadPageDraw.open(that.props.navigation, itemData.bookId, 1, 0);
            RecordUtil.clickRecord(itemData.bookId, RecordVar.click_bag_bookitem, (new Date()).getTime());
            if (itemData.itemType === 0) {
              MySorage.loadByDefault('bookid' + itemData.bookId + '', -1, (data) => {
                if (data && data !== -1) {
                  let bookId = data.bookId;
                  let chapterOrder = data.chapterOrder;
                  let pageIndex = data.pageIndex;
                  if (bookId && chapterOrder) {
                    BookIReadPageDraw.open(that.props.navigation, itemData.bookId + '', chapterOrder, pageIndex, itemData.bookName, '', itemData.bookCoverUrl);
                  } else {
                    BookIReadPageDraw.open(that.props.navigation, itemData.bookId, 1, 0, itemData.bookName, '', itemData.bookCoverUrl);
                  }
                } else {
                  BookIReadPageDraw.open(that.props.navigation, itemData.bookId, 1, 0, itemData.bookName, '', itemData.bookCoverUrl);
                }
              });

              let timer = setInterval(() => {
                BookCaseUtil.bookBagAction(itemData.bookId, that.props.appStore.myPageStore.userId, 4, (callback) => {
                })
                if (timer) {
                  clearInterval(timer);
                }
              }, 1000);
            } else {
              BookMenuInfoView.open(that.props.navigation, itemData.bookId);
              let timer = setInterval(() => {
                BookCaseUtil.bookMenuBagAction(itemData.bookId, that.props.appStore.myPageStore.userId, 4, (callback) => {
                })
                if (timer) {
                  clearInterval(timer);
                }
              }, 1000);
            }
          }}
          underlayColor={appTheme.greyBgColor}
        >
          <View style={{ flex: 1, flexDirection: 'row', paddingVertical: Dpi.d(50), paddingHorizontal: Dpi.d(40), height: Dpi.d(210), alignItems: 'center' }}>
            <FastImage
              style={{
                height: Dpi.d(150),
                width: Dpi.d(110),
                resizeMode: FastImage.resizeMode.stretch
              }}
              source={{ uri: itemData.bookCoverUrl }}
            ></FastImage>
            <View style={{ width: Dpi.d(500), height: Dpi.d(210), justifyContent: 'center', marginLeft: Dpi.d(20) }}>
              <Text numberOfLines={1} style={{ fontSize: Dpi.s(30), color: appTheme.groupTitleTextColor }}>{itemData.bookName}</Text>
              <Text numberOfLines={2} style={{ marginTop: Dpi.d(20), fontSize: Dpi.s(26), color: appTheme.mainTextColor }}>最新章节：{itemData.lastChapterName}</Text>
            </View>
            <FastImage source={ImageResource.moreIcon} style={{ width: Dpi.d(16), height: Dpi.d(25), resizeMode: FastImage.resizeMode.stretch }}></FastImage>
          </View>
        </TouchableHighlight>
        <TouchableHighlight

          onPress={() => {
            if (itemData.itemType === 0) {
              that.showLoadView();
              BookCaseUtil.bookBagAction(itemData.bookId, that.props.appStore.myPageStore.userId, 3, (callBack) => {
                if (that.popuViewKey && that.popuViewKey !== null) {
                  that.popuViewKey.close();
                }
                if (callBack && callBack.msgCode === 200) {
                  // that._loadBookCaseData();
                } else {
                  that.hideLoadView();
                  Toast.message('置顶失败', 'short', 'center');
                }
              })
            } else {
              that.showLoadView();
              BookCaseUtil.bookMenuBagAction(itemData.bookId, that.props.appStore.myPageStore.userId, 3, (callBack) => {
                if (that.popuViewKey && that.popuViewKey !== null) {
                  that.popuViewKey.close();
                }
                if (callBack && callBack.msgCode === 200) {
                  // that._loadBookCaseData();
                } else {
                  that.hideLoadView();
                  Toast.message('置顶失败', 'short', 'center');
                }
              })
            }
          }}
          underlayColor={appTheme.greyBgColor}
        >
          <View
            style={{ paddingVertical: Dpi.d(48), paddingHorizontal: Dpi.d(40), borderBottomColor: appTheme.devideLineColor, borderBottomWidth: Dpi.d(1) }}
          >
            <Text style={{ fontSize: Dpi.s(30), color: appTheme.groupTitleTextColor }}>置顶</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            if (itemData.itemType === 0) {
              that.showLoadView();
              BookCaseUtil.bookBagAction(itemData.bookId, that.props.appStore.myPageStore.userId, 2, (callBack) => {
                if (that.popuViewKey && that.popuViewKey !== null) {
                  that.popuViewKey.close();
                }
                if (callBack && callBack.msgCode === 200) {
                  // that._loadBookCaseData();
                } else {
                  that.hideLoadView();
                  Toast.message('删除失败', 'short', 'center');
                }
              })
            } else {
              that.showLoadView();
              BookCaseUtil.bookMenuBagAction(itemData.bookId, that.props.appStore.myPageStore.userId, 2, (callBack) => {
                if (that.popuViewKey && that.popuViewKey !== null) {
                  that.popuViewKey.close();
                }
                if (callBack && callBack.msgCode === 200) {
                  // that._loadBookCaseData();
                } else {
                  that.hideLoadView();
                  Toast.message('删除失败', 'short', 'center');
                }
              })
            }

          }}
          underlayColor={appTheme.greyBgColor}
        >
          <View
            style={{ paddingVertical: Dpi.d(48), paddingHorizontal: Dpi.d(40), }}
          >
            <Text style={{ fontSize: Dpi.s(30), color: appTheme.groupTitleTextColor }}>删除本书</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
    that.popuViewKey = Drawer.open(view, 'bottom');
  }

  _renderContent() {
    let that = this;
    let bookCaseStore = this.props.appStore.bookCaseStore;
    let appTheme = this.props.appStore.appTheme;
    if (that.dataLoadState === 3) {
      return (
        <View
          style={{ alignItems: 'center', marginTop: Dpi.d(146) }}
        >
          <FastImage
            source={ImageResource.nobookIcon}
            style={{
              width: Dpi.d(326),
              height: Dpi.d(223),
              resizeMode: FastImage.resizeMode.stretch
            }}
          >
          </FastImage>
          <Text
            style={{ fontSize: Dpi.s(30), color: appTheme.greyTextColor, marginTop: Dpi.d(44) }}
          >您是不是忘了登录？</Text>
          <TouchableHighlight
            underlayColor={appTheme.greyBgColor}
            onPress={() => {
              LoadPage.open(that.props.navigation)
            }}
            style={{
              marginTop: Dpi.d(40)
            }}
          >
            <View
              style={{ height: Dpi.d(80), width: Dpi.d(250), paddingVertical: Dpi.d(21), borderRadius: Dpi.d(8), justifyContent: 'center', alignItems: 'center', backgroundColor: appTheme.hightLightColor }}
            >
              <Text style={{ color: appTheme.mainColor, fontSize: Dpi.d(30) }}>现在去登录</Text>
            </View>
          </TouchableHighlight>
          {
            that.hideLoadView()
          }
        </View >
      )
    } else if (that.dataLoadState === 1) {
      if (bookCaseStore.bookCaseList && bookCaseStore.bookCaseList.length > 0) {
        if (bookCaseStore.listType === 1) {
          return (
            <ShowByCover navigation={that.props.navigation}></ShowByCover>
          )
        } else {
          return (
            <ShowByList navigation={that.props.navigation}></ShowByList>
          )
        }
      } else {
        return (
          <View
            style={{ alignItems: 'center', marginTop: Dpi.d(146) }}
          >
            <FastImage
              source={ImageResource.nobookIcon}
              style={{
                width: Dpi.d(326),
                height: Dpi.d(223),
                resizeMode: FastImage.resizeMode.stretch
              }}
            >
            </FastImage>
            <Text
              style={{ fontSize: Dpi.s(30), color: appTheme.greyTextColor, marginTop: Dpi.d(44) }}
            >书架上还没有书籍哦</Text>
            <TouchableHighlight
              underlayColor={appTheme.greyBgColor}
              onPress={() => {
                that.props.appStore.tabData.selectedPage = 'BookRoomPage';
              }}
              style={{

                marginTop: Dpi.d(40)
              }}
            >
              <View
                style={{ height: Dpi.d(80), width: Dpi.d(250), paddingVertical: Dpi.d(21), borderRadius: Dpi.d(8), justifyContent: 'center', alignItems: 'center', backgroundColor: appTheme.hightLightColor }}
              >
                <Text style={{ color: appTheme.mainColor, fontSize: Dpi.d(30) }}>去添加小说</Text>
              </View>
            </TouchableHighlight>
          </View >
        )
      }
    } else if (that.dataLoadState === 2) {
      return (
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
              that._loadBookCaseData();
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
      )
    } else {
      return (
        <View></View>
      )
    }
  }

  render() {
    let bookCaseStore = this.props.appStore.bookCaseStore;
    let appTheme = this.props.appStore.appTheme;
    let that = this;

    return (
      <View style={{ flex: 1, backgroundColor: appTheme.mainBgColor }}>
        <ActionBar navigation={this.props.navigation}></ActionBar>
        {
          that._renderContent()
        }
        {/* {
          that.hideLoadView()
        } */}
      </View>
    );
  }
}

