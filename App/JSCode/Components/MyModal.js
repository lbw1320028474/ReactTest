
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import AppUtils from '../Utils/AppUtils'
import Modal from './react-native-modal'
import Dpi from '../Utils/Dpi'
export default class MyModal extends Component {
    constructor(props) {
        super(props);
        this.modelRef = null;
        this._timer = null;
        this.showTimeOut;
        this.showCallBack;
        //this.showContent = props.contentView;
        this.state = {
            isVisibile: false
        }
    }

    componentWillUnmount() {
        if (this._timer && this._timer !== null) {
            clearInterval(this._timer);
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.isVisibile !== nextState.isVisibile) {
            return true;
        } else {
            return false;
        }
    }
    render() {
        let that = this;
        return (
            <Modal
                {...that.props}
                isVisible={that.state.isVisibile}
                onModalShow={() => {
                    if (that.showTimeOut && that.showTimeOut > 0) {
                        that._timer = setInterval(() => {
                            if (that.showCallBack && that.showCallBack !== null) {       //超时回调
                                that.showCallBack();
                            }
                            that.hideModel();
                        }, that.showTimeOut);
                    }
                }}
                onModalHide={() => {
                    if (this._timer && this._timer !== null) {
                        clearInterval(this._timer);
                    }
                }}
            >
                {
                    (this.props.contentView && this.props.contentView !== null) ? this.props.contentView : null
                }
            </Modal>
        )
    }

    // showModel(showContent, timeOutBack = null, timeout = 0, ) {
    //     this.showTimeOut = timeOut;
    //     this.showCallBack = timeOutBack;
    //     this.showContent = showContent;
    //     this.setState({ isVisibile: true })
    // }

    showModel(timeOutBack, timeOut = 0) {
        this.showTimeOut = timeOut;
        this.showCallBack = timeOutBack;
        this.setState({ isVisibile: true })
    }

    hideModel() {
        this.setState({ isVisibile: false })
    }

}

var styles = StyleSheet.create({
    lineStyle: {
        opacity: 0.2,
        backgroundColor: '#666666',
        height: AppUtils.pixel
    }
});