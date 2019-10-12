/**
 * Created by Rabbit 下午6:40
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native';
import NavigationBar from '../../../Components/teaset/components/NavigationBar/NavigationBar'
import { observer, inject } from 'mobx-react/native';
import { autorun } from 'mobx';
import Dpi from '../../../Utils/Dpi'
import BackgroundView from './BackgroundView'
@inject('appStore')
@observer
export default class ActionBar extends Component {
    constructor(props) {
        super(props)
        this.overlayViewKey;
        this.menuRef;
        this.bgOpacity;
        this.navigationBar;
    }

    render() {
        let that = this;
        let appTheme = this.props.appStore.appTheme;
        //let bookCaseStore = this.props.appStore.bookCaseStore;
        return (
            <NavigationBar
                style={{ backgroundColor: 'transparent' }}
                background={<BackgroundView></BackgroundView>}
                ref={ref => that.navigationBar = ref}

            ></NavigationBar>
        )
    }
}
