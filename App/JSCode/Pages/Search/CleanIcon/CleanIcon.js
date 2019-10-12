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
} from 'react-native';
import Dpi from '../../../Utils/Dpi'
import AppUtils from '../../../Utils/AppUtils'
import FastImage from '../../../Components/react-native-fast-image'
import ImageResource from '../../../../Resource/ImageResource'
import { observer, inject } from 'mobx-react/native';
import { autorun } from 'mobx'

@inject('appStore')
@observer
export default class CleanIcon extends Component {
    constructor(props) {
        super(props)
        let that = this;
        autorun(() => {
            if (that.props.appStore.searchStore.searchKeWord.length > 0) {
                that.props.appStore.searchStore.setCanClean(true);
            } else {
                that.props.appStore.searchStore.setCanClean(false);
            }
        })
    }

    render() {
        let that = this;
        let searchStore = that.props.appStore.searchStore;
        if (searchStore.canClean === true) {
            return (
                <TouchableOpacity
                    onPress={() => {
                        that.props.appStore.searchStore.setCanClean(false);
                        that.props.appStore.searchStore.cleanGessWord();
                        if (that.props.cleanCallBack) {
                            that.props.cleanCallBack();
                        }
                    }}
                    style={{
                        position: 'absolute',
                        right: Dpi.d(10),
                    }}
                >
                    <FastImage
                        style={{
                            resizeMode: FastImage.resizeMode.stretch,
                            width: Dpi.d(40),
                            height: Dpi.d(40),
                        }}
                        source={ImageResource.textInputCleanIcon}
                    >
                    </FastImage>
                </TouchableOpacity>
            )
        } else {
            return (
                <View></View>
            )
        }
    }
}
