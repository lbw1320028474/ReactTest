/**
 * React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    Platform,
    TouchableOpacity
} from 'react-native'


/**
 * 这里是日志开关，true表示不需要要日志输出，false表示需要日志
 */
// if (true) {
//     global.console = {
//         info: () => {
//         },
//         log: () => {
//         },
//         warn: () => {
//         },
//         error: () => {
//         },
//     };
// }


export default class Test extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
       
    }


    componentDidMount() {
       
    }

    render() {
        return (
            <Text>leibangwen</Text>
        );
    }
}

