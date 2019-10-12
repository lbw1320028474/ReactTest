/**
 * Created by Rabbit 下午6:40
 */

import React, { Component } from 'react';
import {
    View,
    Image,
} from 'react-native';
import Dpi from '../../../Utils/Dpi'
import ImageResource from '../../../../Resource/ImageResource'

export default class PageIndicator extends Component {
    constructor(props) {
        super(props);
        let pageSize = props.size;
        this.state = {
            selectedIndex: 0
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.size) {
            this.pageSize = nextProps.size;
        }
    }

    _renderPoint() {
        let that = this;
        let pointViews = [];
        for (let i = 0; i < that.pageSize; ++i) {
            if (i === that.state.selectedIndex) {
                pointViews.push(
                    <Image
                        key={i}
                        resizeMode='stretch'
                        style={{
                            width: Dpi.d(12),
                            height: Dpi.d(12),
                            marginHorizontal: Dpi.d(10)
                        }}
                        source={ImageResource.autoplay_viewpage_selected}
                    ></Image>
                )
            } else {
                pointViews.push(
                    <Image
                        key={i}
                        resizeMode='stretch'
                        style={{
                            width: Dpi.d(12),
                            height: Dpi.d(12),
                            marginHorizontal: Dpi.d(10)
                        }}
                        source={ImageResource.autoplay_viewpage_normal}
                    ></Image>
                )
            }
        }
        return pointViews;
    }

    render() {
        let that = this;
        if (that.pageSize > 0) {
            return (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        position: 'absolute',
                        bottom: Dpi.d(20),
                    }}
                >
                    {
                        that._renderPoint()
                    }
                </View>
            )
        } else {
            return (
                <View></View>
            )
        }
    }

    setSelected(point) {
        this.setState({
            selectedIndex: point
        })
    }
}
