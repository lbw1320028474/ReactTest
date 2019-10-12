/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native'
import Dpi from '../../../Utils/Dpi'
/**
 * 占位组件， 啥也没有
 */
export default class EmptyItem extends Component {
    render() {
        return (
            <View
                style={{ width: Dpi.d(192), }}
            >
            </View >
        )
    }
}

