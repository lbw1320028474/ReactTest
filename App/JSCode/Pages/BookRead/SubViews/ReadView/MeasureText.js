import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import AppUtils from '../../../../Utils/AppUtils'
import Dpi from '../../../../Utils/Dpi'
import TextInfo from './TextInfo'
export default class MeasureText extends Component {
    constructor(props) {
        super(props);
        this.measureCallBack;
        this.state = {
            reRender: false,
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.reRender !== nextState.reRender) {
            return true;
        } else {
            return false
        }
    }

    _callBack(textInfo, that) {
        if (textInfo.zhongwenWidth > 0
            && textInfo.danyinghaoWidth > 0
            && textInfo.shuangyinghaoWidth > 0
            && textInfo.daxieWidth > 0
            && textInfo.xiaoxieWidth > 0
            && textInfo.dazimuiWidth > 0
            && textInfo.xiaozimuiWidth > 0) {
            if (that.props.measureCallBack) {
                textInfo.zhongwen = 1;
                textInfo.danyinghao = textInfo.danyinghaoWidth / textInfo.zhongwenWidth;
                textInfo.shuangyinghao = textInfo.shuangyinghaoWidth / textInfo.zhongwenWidth;
                textInfo.daxie = textInfo.daxieWidth / textInfo.zhongwenWidth;
                textInfo.xiaoxie = textInfo.xiaoxieWidth / textInfo.zhongwenWidth;
                textInfo.dazimui = textInfo.dazimuiWidth / textInfo.zhongwenWidth;
                textInfo.xiaozimui = textInfo.xiaozimuiWidth / textInfo.zhongwenWidth;
                if (that.measureCallBack && that.measureCallBack !== null) {
                    that.measureCallBack(textInfo);
                }
            }
        }
    }

    reMeasure(measureCallBack) {
        this.measureCallBack = measureCallBack;
        this.setState({
            reRender: !(this.state.reRender)
        })
    }

    render() {
        let that = this;
        let textInfo = new TextInfo();
        let textSize = that.props.data;
        this.measureCallBack = that.props.measureCallBack;
        return (
            <View style={{ opacity: 0, position: 'absolute', alignItems: 'flex-start', bottom: 0, backgroundColor: 'transparent' }}>
                <Text style={{ fontSize: (textSize) ? textSize : 0 }} onLayout={(event) => {
                    textInfo.zhongwenWidth = event.nativeEvent.layout.width;
                    that._callBack(textInfo, that)
                }}>一</Text>
                <Text style={{ fontSize: (textSize) ? textSize : 0 }} onLayout={(event) => {
                    textInfo.danyinghaoWidth = event.nativeEvent.layout.width;
                    that._callBack(textInfo, that)
                }}>’</Text>
                <Text style={{ fontSize: (textSize) ? textSize : 0 }} onLayout={(event) => {
                    textInfo.shuangyinghaoWidth = event.nativeEvent.layout.width;
                    that._callBack(textInfo, that)
                }}>“</Text>
                <Text style={{ fontSize: (textSize) ? textSize : 0 }} onLayout={(event) => {
                    textInfo.daxieWidth = event.nativeEvent.layout.width;
                    that._callBack(textInfo, that)
                }}>A</Text>
                <Text style={{ fontSize: (textSize) ? textSize : 0 }} onLayout={(event) => {
                    textInfo.xiaoxieWidth = event.nativeEvent.layout.width;
                    that._callBack(textInfo, that)
                }}>a</Text>
                <Text style={{ fontSize: (textSize) ? textSize : 0 }} onLayout={(event) => {
                    textInfo.dazimuiWidth = event.nativeEvent.layout.width;
                    that._callBack(textInfo, that)
                }}>I</Text>
                <Text style={{ fontSize: (textSize) ? textSize : 0 }} onLayout={(event) => {
                    textInfo.xiaozimuiWidth = event.nativeEvent.layout.width;
                    that._callBack(textInfo, that)
                }}>i</Text>
            </View>
        )

    }
}
