/**
 * Created by Rabbit 下午6:40
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
    TextInput,
    Keyboard
} from 'react-native';
import Dpi from '../../../Utils/Dpi'
import AppUtils from '../../../Utils/AppUtils'
import FastImage from '../../../Components/react-native-fast-image'
import NavigationBar from '../../../Components/teaset/components/NavigationBar/NavigationBar'
import ImageResource from '../../../../Resource/ImageResource'
import Overlay from '../../../Components/teaset/components/Overlay/Overlay'
import CleanIcon from '../CleanIcon/CleanIcon'
import { observer, inject } from 'mobx-react/native';
import AppTheme from '../../../Themes/AppTheme';
import RecordUtil from '../../../Record/RecordUtil'
import RecordVar from '../../../Record/RecordVar'
import SearchPage from '../SearchPage'
import { autorun, } from 'mobx'
@inject('appStore')
@observer
export default class ActionBar extends Component {
    constructor(props) {
        super(props)
        this.overlayViewKey;
        this.menuRef;
        this.textInputViewRef;
        this.textInputStr = '';
        let that = this;
        autorun(() => {
            if (that.props.appStore.searchStore.searchKeWord.length <= 0) {
                this.textInputStr = '';
            } else {
                this.textInputStr = that.props.appStore.searchStore.searchKeWord;
            }
        })
    }

    _toSearch() {
        let that = this;
        let searchHistory = that.props.appStore.searchStore.searchHistoryList;
        if (that.textInputStr && that.textInputStr.length > 0) {
            that.props.appStore.searchStore.setSearchWord(that.textInputStr);
            that.props.appStore.searchStore.unSiftKeyWord(that.textInputStr);
        }
    }


    render() {
        let appTheme = this.props.appStore.appTheme;
        //let bookCaseStore = this.props.appStore.bookCaseStore;
        let that = this;
        return (
            <NavigationBar
                style={{ backgroundColor: appTheme.hightLightColor, position: 'relative' }}
                title={
                    <View style={{ paddingHorizontal: Dpi.d(37), height: Dpi.d(60), flex: 1, backgroundColor: appTheme.mainColor, marginLeft: Dpi.d(-50), marginRight: Dpi.d(24), justifyContent: 'center', borderRadius: Dpi.d(30) }}>
                        <TextInput
                            returnKeyType='search'
                            autoFocus={true}
                            numberOfLines={1}
                            onSubmitEditing={(event) => {
                                that._toSearch(that);
                            }}
                            multiline={false}
                            maxLength={12}
                            ref={ref => that.textInputViewRef = ref}
                            onChangeText={(text) => {
                                that.props.appStore.searchStore.setGessWord(text)
                                if (text && text.length > 0) {
                                    that.props.appStore.searchStore.setCanClean(true)
                                } else {
                                    that.props.appStore.searchStore.setCanClean(false)
                                }
                                that.textInputStr = text;


                            }}
                            defaultValue={that.props.appStore.searchStore.searchKeWord}
                            underlineColorAndroid="transparent"
                            placeholder='请输入小说名、作者、关键词'
                            style={{
                                paddingVertical: 0,
                                flex: 1,
                                height: Dpi.d(60),
                                fontSize: Dpi.s(30),
                                color: appTheme.groupTitleTextColor
                            }}></TextInput>
                        <CleanIcon cleanCallBack={() => {
                            if (that.textInputViewRef) {
                                that.textInputViewRef.clear();
                            }
                        }}></CleanIcon>
                    </View>
                }

                rightView={
                    <TouchableOpacity
                        ref={ref => that.menuRef = ref}
                        onPress={() => {
                            that.props.appStore.tabData.selectedPage = SearchPage.openFrom;
                            that.props.appStore.searchStore.setCanClean(false);
                            that.props.appStore.searchStore.cleanGessWord();
                            if (that.textInputViewRef) {
                                that.textInputViewRef.clear();
                            }
                            Keyboard.dismiss();
                        }}
                    >
                        <Text style={{ fontSize: Dpi.s(30), marginRight: Dpi.d(18), color: appTheme.mainColor }}>取消</Text>
                    </TouchableOpacity>
                }
            ></NavigationBar>
        )
    }
}
