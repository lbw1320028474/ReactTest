/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react/native';
import Dpi from '../../../../Utils/Dpi'
import AppUtils from '../../../../Utils/AppUtils'
import GlobleKey from '../../../../Globle/GlobleKey'
import EventBus from '../../../../Utils/EventBus'
import Toast from '../../../../Components/teaset/components/Toast/Toast'
import MyText from '../../../../Components/MyText'
import CatchDataManager from '../../../../Catch/CatchDataManager'
@inject('appStore')
@observer
export default class CatchView extends Component {
    @observable refreshing = false;
    constructor(props) {
        super(props);
        let that = this;
        this.textRef;
        this.catchCount = 0;
        this.bookId = 0;
        this.viewOpacity = 0;
        this.viewRef;
        this.catchListener = (data) => {
            // console.log('缓存数据更新：' + JSON.stringify(data));
            if (that.textRef && data) {
                // console.log('更新缓存进度1，that.bookId = ' + that.bookId + ' + ' + data.bookId);
                if (CatchDataManager.allCatchMap && CatchDataManager.allCatchMap.has(that.bookId + '')) {
                    // console.log('更新缓存进度1， that.catchCount = ' + that.catchCount)
                    let count = CatchDataManager.allCatchMap.get(that.bookId + '').size;
                    if (that.catchCount === 0 || (that.catchCount - count < 0)) {
                        that.catchCount = CatchDataManager.allCatchMap.get(that.bookId + '').size;
                    }
                    // console.log('更新缓存进度2， count = ' + count)
                    if (that.textRef) {
                        // console.log('更新缓存进度2， 缓存中。。。 ' + (that.catchCount - count) + ' / ' + that.catchCount)
                        if (that.catchCount - count === 0) {
                            that.textRef.setText('等待中。。。 ' + (that.catchCount - count) + ' / ' + that.catchCount);
                        } else {
                            that.textRef.setText('缓存中。。。 ' + (that.catchCount - count) + ' / ' + that.catchCount);
                        }
                    }
                    if (that.viewRef && that.viewOpacity === 0 && count > 0) {
                        // console.log('更新缓存进度2，设置透明度= 1');
                        that.viewRef.setNativeProps({
                            opacity: 1
                        })
                    } else if (that.viewRef) {
                        // console.log('更新缓存进度2，设置透明度= 0');
                        that.viewRef.setNativeProps({
                            opacity: 0
                        });
                        that.catchCount = 0;
                        Toast.message('缓存任务结束', 'short', 'center')
                    }
                } else {
                    // console.log('更新缓存进度1，缓存记录进度读取失败')
                    that.viewRef.setNativeProps({
                        opacity: 0
                    })
                    that.catchCount = 0;
                }
            } else if (that.textRef) {
                that.viewRef.setNativeProps({
                    opacity: 0
                })
                that.catchCount = 0;
            }
            // chapterStore = that.props.appStore.chapterListStore;
            // if (data && chapterStore && chapterStore.bookId === data.bookId) {
            //     if (chapterStore.chapterList && data.chapterOrder - 1 < chapterStore.chapterList.length) {
            //         chapterStore.chapterList[data.chapterOrder - 1].catchState = 2;
            //     }
            // }
        }
    }


    componentDidMount() {
        EventBus.on(GlobleKey.EVENT_CATCH_CHANGED, this.catchListener);
    }

    componentWillUnmount() {
        EventBus.removeListener(GlobleKey.EVENT_CATCH_CHANGED, this.catchListener)
    }

    render() {
        let that = this;
        let appTheme = this.props.appStore.appTheme;
        let readPageStore = this.props.appStore.readPageStore;
        let readTheme = readPageStore.readTheme;
        that.bookId = that.props.appStore.readPageStore.bookId;
        if (CatchDataManager.allCatchMap && CatchDataManager.allCatchMap.has(this.bookId + '')) {
            that.catchCount = CatchDataManager.allCatchMap.get(this.bookId + '').size;
        }
        return (
            <View
                ref={ref => that.viewRef = ref}
                style={{ opacity: 0, backgroundColor: readTheme.stressColor, width: AppUtils.size.width, justifyContent: 'center', height: Dpi.d(46), paddingHorizontal: Dpi.d(20) }}>
                <MyText
                    ref={ref => that.textRef = ref}
                    text=''
                    style={{ color: readTheme.mainTextColor, fontSize: Dpi.s(24) }}
                ></MyText>
            </View>
        );
    }
}

