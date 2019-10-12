/**
 * Created by Rabbit 下午6:40
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Dpi from '../../../Utils/Dpi'
import FastImage from '../../../Components/react-native-fast-image'
import { observer, inject } from 'mobx-react/native';
import GlobleVar from '../../../Globle/GlobleVar'
import AppUtils from '../../../Utils/AppUtils'
import ThreeBookItem from './ThreeBookItem'
import ImageResource from '../../../../Resource/ImageResource';
import BookListPage from '../../BookList/BookListPage'
@inject('appStore')
@observer
export default class ThreeBookView extends Component {

    constructor(props) {
        super(props);
        // this._bookMenuItemClick.bind(this);
    }


    // _bookMenuItemClick(item) {
    //     alert('点击了');
    // }

    render() {
        let that = this;
        let appTheme = this.props.appStore.appTheme;
        let bookMenuGroup = this.props.data;
        let itemViews = [];
        if (bookMenuGroup && bookMenuGroup.groupBeanList && bookMenuGroup.groupBeanList.length > 0) {
            itemViews = bookMenuGroup.groupBeanList.map((item, index) => {
                if (index < 3) {
                    return (
                        <ThreeBookItem key={index} data={item} navigation={that.props.navigation}></ThreeBookItem>
                    )
                }
            })
        }
        return (
            <View
                style={{
                    overflow: 'hidden',
                    backgroundColor: appTheme.mainBgColor,
                    marginBottom: Dpi.d(20),
                    justifyContent: 'center',
                    // height: Dpi.d(480)
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: Dpi.d(39), alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', color: appTheme.groupTitleTextColor, fontSize: Dpi.s(29) }}>{bookMenuGroup.groupName}</Text>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => {
                            BookListPage.open(that.props.navigation, bookMenuGroup.groupId, bookMenuGroup.groupName);
                        }}
                    >
                        <Text style={{ fontSize: Dpi.s(23), color: appTheme.mainTextColor }}>更多</Text>
                        <FastImage source={ImageResource.moreIcon} style={{ width: Dpi.d(16), height: Dpi.d(25), resizeMode: FastImage.resizeMode.stretch }}></FastImage>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Dpi.d(35) }}>
                    {itemViews}
                </View>
            </View>
        );
    }
}
