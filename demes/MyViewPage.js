/**
 * GradientNavigationBarDemo
 * 作者Git：https://github.com/guangqiang-liu
 * 技术交流群：620792950
 * 作者QQ：1126756952
 * Created by guangqiang on 2017/11/5
 */
import React, { Component } from 'react'
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    Dimensions,
    TextInput
} from 'react-native'
import ViewPager from '../Novel/novelJs/viewpager/ViewPager'
import AppUtils from '../Novel/novelJs/Utils/AppUtils'

export default class MyViewPage extends Component {
    render() {
        return (
            <ViewPager
                onScroll={(event) => {
                }}
                showsHorizontalScrollIndicator={false}
                horizontal={true}>
                <View style={{ width: AppUtils.size.width, height: AppUtils.size.height }}>
                    <Text>雷帮文1</Text>
                </View>
                <View style={{ width: AppUtils.size.width, height: AppUtils.size.height }}>
                    <Text>雷帮文2</Text>
                </View>
                <View style={{ width: AppUtils.size.width, height: AppUtils.size.height }}>
                    <Text>雷帮文3</Text>
                </View>
                <View style={{ width: AppUtils.size.width, height: AppUtils.size.height }}>
                    <Text>雷帮文4</Text>
                </View>
                <View style={{ width: AppUtils.size.width, height: AppUtils.size.height }}>
                    <Text>雷帮文5</Text>
                </View>
                <View style={{ width: AppUtils.size.width, height: AppUtils.size.height }}>
                    <Text>雷帮文6</Text>
                </View>
            </ViewPager>

        )
    }


}

