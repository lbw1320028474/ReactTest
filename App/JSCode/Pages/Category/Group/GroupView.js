/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native'
import AppUtils from '../../../Utils/AppUtils'
import Dpi from '../../../Utils/Dpi'
import FastImage from '../../../Components/react-native-fast-image'
import { observer, inject } from 'mobx-react/native';
import { BoxShadow } from '../../../Components/react-native-shadow'
import ImageResource from '../../../../Resource/ImageResource';
import EventBus from '../../../Utils/EventBus'
import BookListPage from '../../BookList/BookListPage'
import GlobleKey from '../../../Globle/GlobleKey'
import RecordUtil from '../../../Record/RecordUtil'
import RecordVar from '../../../Record/RecordVar'

const shadowOpt = {
    border: 5,
    radius: 1,
    opacity: 0.05,
    y: 1,
}

@inject('appStore')
@observer
export default class GroupView extends Component {
    constructor(props) {
        super(props);
    }

    _renderSubCategory(item) {
        let that = this;
        return (
            <TouchableHighlight
                underlayColor='#f5f5f5'
                style={{

                }}
                onPress={() => {
                    RecordUtil.clickRecord(item.categoryId, RecordVar.click_category_group, (new Date()).getTime());
                    BookListPage.open(that.props.navigation, item.categoryId, item.categoryName);
                }}
            >
                <View
                    key={item.categoryId}
                    style={{
                        borderWidth: AppUtils.pixel,
                        borderColor: '#f5f5f5',
                        width: Dpi.d(501) / 3,
                        height: Dpi.d(129),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{ color: '#333333', fontSize: Dpi.s(25) }}
                    >{item.categoryName}</Text>
                    <Text
                        style={{ color: '#9f9f9f', fontSize: Dpi.s(20) }}
                    >{item.categoryCount}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        let that = this;
        let itemData = that.props.data;
        let appTheme = that.props.appStore.appTheme;
        let rightItemView = [];
        let bottomItemView = [];
        if (itemData.categoryList && itemData.categoryList.length > 0) {
            for (let i = 0; i < itemData.categoryList.length && i < 6; ++i) {
                rightItemView.push(that._renderSubCategory(itemData.categoryList[i]))
            }
            if (itemData.categoryList.length > 6) {
                for (let i = 6; i < itemData.categoryList.length; ++i) {
                    bottomItemView.push(that._renderSubCategory(itemData.categoryList[i]))
                }
            }
        }
        let coverColor = '#2664BE88';
        if (that.props.index % 5 === 1) {
            coverColor = '#D981E288';
        } else if (that.props.index % 5 === 2) {
            coverColor = '#DE5E5C88';
        } else if (that.props.index % 5 === 3) {
            coverColor = '#D3A66D88';
        } else if (that.props.index % 5 === 4) {
            coverColor = '#9691E788';
        }
        return (

            <View
                style={{ marginTop: Dpi.d(41), marginHorizontal: Dpi.d(20), backgroundColor: appTheme.mainBgColor, }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <View
                        style={{

                            width: Dpi.d(501) / 3,
                            height: Dpi.d(260)
                        }}
                    >
                        <FastImage
                            style={{
                                resizeMode: FastImage.resizeMode.stretch,
                                width: Dpi.d(501) / 3,
                                height: Dpi.d(260)
                            }}
                            source={{ uri: itemData.categoryGroupCover }}
                        >
                        </FastImage>

                        <View
                            style={{
                                backgroundColor: coverColor,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: Dpi.d(501) / 3,
                                height: Dpi.d(260),
                                position: 'absolute',
                            }}
                        >
                            <View
                                style={{
                                    opacity: 0.7,
                                    height: Dpi.d(2),
                                    width: Dpi.d(94),
                                    backgroundColor: appTheme.mainColor
                                }}
                            >

                            </View>
                            <Text
                                numberOfLines={2}
                                style={{
                                    textAlign: 'center',
                                    marginVertical: Dpi.d(30),
                                    marginHorizontal: Dpi.d(25),
                                    backgroundColor: 'transparent',
                                    color: appTheme.mainColor,
                                    fontSize: Dpi.d(47)
                                }}
                            >{itemData.categoryGroupName}</Text>
                            <View
                                style={{
                                    opacity: 0.7,
                                    height: Dpi.d(2),
                                    width: Dpi.d(94),
                                    backgroundColor: appTheme.mainColor
                                }}
                            >

                            </View>
                        </View>
                    </View>
                    <View
                        style={{ flexDirection: 'row', flexWrap: 'wrap', width: Dpi.d(501) }}
                    >
                        {rightItemView}
                    </View>
                </View>
                <View
                    style={{ flexDirection: 'row', flexWrap: 'wrap', width: Dpi.d(501) / 3 * 4 }}
                >
                    {bottomItemView}
                </View>
            </View>

        );
    }
}

