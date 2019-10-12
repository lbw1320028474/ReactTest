/**
 * Created by Rabbit 下午6:40
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    Image
} from 'react-native';
import Dpi from '../Utils/Dpi'
import FastImage from 'react-native-fast-image'
// import { observer, inject } from 'mobx-react/native';

// @inject('appStore')
// @observer

export default class TabIcon extends Component {
    render() {
        let props = this.props;
        let iconHeight = (props.title === ' ') ? Dpi.d(90) : Dpi.d(40);
        let marginBottom = (props.title === ' ') ? Dpi.d(-20) : Dpi.d(0);
        return (
            <View style={{ marginBottom: marginBottom, justifyContent: 'center', alignItems: 'center' }}>
                <FastImage
                    source={!props.focused ? props.image : props.selectedImage}
                    style={[{ height: iconHeight, width: iconHeight, marginTop: Dpi.d(10) }]}
                />
                <Text>
                    
                </Text>
            </View>
        )
    }
}
