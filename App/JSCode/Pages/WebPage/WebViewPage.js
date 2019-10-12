import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Image,
    WebView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    BackHandler,
    ActivityIndicator
} from 'react-native';
import GlobleVar from '../../Globle/GlobleVar'
import Dpi from '../../Utils/Dpi'
import AppUtils from '../../Utils/AppUtils'
import EventBus from '../../Utils/EventBus'
import { Bars } from '../../Components/react-native-loader';
import StringUtil from '../../Utils/StringUtil'
import ActionBar from './ActionBar/ActionBar'
import Toast from '../../Components/teaset/components/Toast/Toast'
import GlobleKey from '../../Globle/GlobleKey';
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react/native';
@inject('appStore')
@observer
export default class WebViewPage extends Component {
    constructor(props) {
        super(props);
        let that = this;
        this.webViewUrl = '';
        this.webViewRef = null;
        this.webViewUrlList = [];
        this.webViewCanGoBack = true;
        this.myModelRef;
        this.loadViewKey;
        this.backHandler = () => {
            that._webViewGoBack(that);
            return true;
        };
        this.webGoBack = () => {
            that._webViewGoBack(that);
        }
    }

    componentWillUnmount() {
        this.hideLoadView();
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
        EventBus.removeListener(GlobleKey.EVENT_WEB_BACK, this.webGoBack);
    }

    showLoadView() {
        let that = this;
        if (that.loadViewKey) return;
        that.loadViewKey = Toast.show({
            text: '加载中...',
            icon: <ActivityIndicator size='large' color={that.props.appStore.appTheme.mainColor} />,
            position: 'center',
            duration: 10000,
        });
    }

    hideLoadView() {
        let that = this;
        if (!that.loadViewKey) return;
        Toast.hide(that.loadViewKey);
        that.loadViewKey = undefined;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backHandler);
        EventBus.on(GlobleKey.EVENT_WEB_BACK, this.webGoBack);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;

    }

    static open(navigation, url, title = '', body = '') {
        if (navigation) {
            navigation.navigate('KEY_SceneWebViewPage', { linkUrl: url, title: title, body: body });
        }
    }

    _webViewGoBack(that) {
        if (that.webViewRef) {
            that.webViewRef.goBack();
        }
    }

    render() {
        let that = this;
        let urlSource;
        if (this.props.navigation.state.params.body) {
            urlSource = { uri: this.props.navigation.state.params.linkUrl, method: 'POST', body: this.props.navigation.state.params.body };
            // urlSource = { uri: this.props.navigation.state.params.linkUrl, method: 'POST', body: this.props.navigation.state.params.body };
            // alert('有body：' + this.props.navigation.state.params.body)
        } else {
            urlSource = { uri: this.props.navigation.state.params.linkUrl };
        }
        let title = '';
        if (this.props.navigation.state.params.title) {
            title = this.props.navigation.state.params.title;
        }
        return (
            <View style={{ flex: 1 }}>
                <ActionBar navigation={that.props.navigation} title={title}></ActionBar>
                <WebView
                    ref={ref => that.webViewRef = ref}
                    style={{ flex: 1 }}
                    scalesPageToFit={true}

                    onLoadStart={() => {
                        that.showLoadView();
                    }}
                    onLoadEnd={() => {
                        that.hideLoadView();
                    }}

                    saveFormDataDisabled={false}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    source={urlSource}
                    mixedContentMode='always'
                />
            </View >
        )
    }
}

