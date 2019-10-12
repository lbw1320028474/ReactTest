import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Platform,
    ScrollView
} from 'react-native';
import Dpi from '../../Utils/Dpi'
import GlobleKey from '../../Globle/GlobleKey'
import GlobleVar from '../../Globle/GlobleVar'
import AppUtils from '../../Utils/AppUtils'
import DeviceInfo from 'react-native-device-info'
import PushUtil from '../../Components/Umeng/PushUtil'
import { observer, inject } from 'mobx-react/native';
import GlobleUrl from '../../Globle/GlobleUrl'
import ActionBar from './ActionBar/ActionBar'
import ImageResource from '../../../Resource/ImageResource'
import { observable, autorun, transaction } from 'mobx';

@inject('appStore')
@observer
export default class PowerPage extends Component {
    constructor(props) {
        super(props);
        this.lastClickTime = 0;
        this.clickTimes = 0;
        this.state = {
            renderState: 0,
        };
    }

    // componentDidMount() {
    //     let that = this;
    //     // this.timer = setTimeout(function () {
    //     //     that.setState({ renderPlaceholderOnly: false });
    //     // }, 2000);
    //     // InteractionManager.runAfterInteractions(() => {
    //     //     that.setState({ renderState: 1 });
    //     // });
    // }



    static open(navigation) {
        if (navigation) {
            navigation.navigate('KEY_ScenePowerPage');
        }
    }

    // _renderView(that) {
    //     if (this.state.renderState) {

    //     }
    // }

    render() {
        let that = this;
        let appTheme = that.props.appStore.appTheme;
        let jsonText = require('./Text')
        return (
            <View style={{ flex: 1, backgroundColor: appTheme.mainColor }}>
                <ActionBar navigation={that.props.navigation}></ActionBar>
                <ScrollView
                    style={{
                        flex: 1
                    }}
                >
                    <Text
                        style={{
                            color: appTheme.groupTitleTextColor,
                            padding: Dpi.d(20),
                            fontSize: Dpi.s(27)
                        }}
                    >
                        {
                            jsonText.text
                        }
                    </Text>
                </ScrollView>
            </View >
        )
    }
}



