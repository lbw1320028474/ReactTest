/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { observer, inject } from 'mobx-react/native';
import { autorun } from 'mobx';
import ActionBar from './ActionBar/ActionBar'
import HotSearch from './HotSearch/HotSearch'
import MySorage from '../../Utils/MyStore/MySorage'
import GlobleKey from '../../Globle/GlobleKey'
import SearchHistory from './SearchHistory/SearchHistory'
import SearchList from './SearchList/SearchList'
import GuessWordView from './GessWord/GuessWordView'
@inject('appStore')
@observer
export default class SearchPage extends Component {
  static openFrom = "SearchPage";
  constructor(props) {
    super(props);
    let that = this;
    autorun(() => {
      if (that.props.appStore.searchStore.searchHistoryList.length > 0) {
        MySorage._sava(GlobleKey.KeySearchHistoryList, that.props.appStore.searchStore.searchHistoryList)
      }
    })
  }



  render() {
    let that = this;
    let searchStore = that.props.appStore.searchStore;
    let appTheme = that.props.appStore.appTheme;
    return (
      <View style={{ flex: 1, backgroundColor: appTheme.mainColor }}>
        <ActionBar></ActionBar>
        <View style={{
          flex: 1
        }}>
          {
            (searchStore.searchKeWord && searchStore.searchKeWord.length > 0) ? <SearchList navigation={that.props.navigation}></SearchList> : null
          }
          {
            (searchStore.searchKeWord && searchStore.searchKeWord.length > 0) ? null : <HotSearch></HotSearch>
          }
          {
            (searchStore.searchKeWord && searchStore.searchKeWord.length > 0) ? null : <SearchHistory></SearchHistory>
          }
          <GuessWordView></GuessWordView>
        </View>
      </View>
    );
  }
}

