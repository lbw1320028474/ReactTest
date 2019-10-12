
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    BackHandler
} from 'react-native';
import AppUtils from '../Utils/AppUtils'
import Dpi from '../Utils/Dpi'
import UpdataManager from './UpdataManager'
import ApkUtil from '../NativeModul/ApkUtil'
import MyText from '../Components/MyText'
import StaticVar from './StaticVar'
export default class UpdataModul extends Component {
    constructor(props) {
        super(props);
        this.presessRef;
        this.pressTextRef;
        this.updataData;
        this.downLoadState = 0;
        //this.showContent = props.contentView;
        this.state = {
            dataState: 0
        }
    }

    componentWillUnmount() {

    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.dataState !== nextProps.dataState) {
            return true;
        }
    }
    render() {
        let that = this;
        if (that.state.dataState === 0) {
            return null;
        } else if (that.state.dataState === 1) {
            if (that.updataData) {
                return (
                    <View style={{ position: 'absolute', width: AppUtils.size.width, height: AppUtils.size.height, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <View style={{ width: Dpi.d(600), padding: Dpi.d(30), backgroundColor: '#ffffff', borderRadius: Dpi.d(10) }}>
                            <Text style={{ fontSize: Dpi.s(36) }}>更新提示</Text>
                            <Text style={{ fontSize: Dpi.s(30), marginTop: Dpi.d(30) }}>{that.updataData.upgradeText}</Text>
                            <View style={{ width: Dpi.d(540) }}>
                                <View style={{ width: Dpi.d(540), marginVertical: Dpi.d(20), height: Dpi.d(5), backgroundColor: '#666666' }}></View>
                                <View ref={ref => this.presessRef = ref} style={{ position: 'absolute', width: Dpi.d(0), marginVertical: Dpi.d(20), height: Dpi.d(5), backgroundColor: '#45CAB9' }}></View>
                                <MyText ref={ref => this.pressTextRef = ref} style={{ fontSize: Dpi.d(26) }} text='0 / 0'></MyText>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: Dpi.d(30) }}>
                                <TouchableOpacity
                                    style={{ alignItems: 'center', flex: 1, padding: Dpi.d(5) }}
                                    onPress={() => {

                                        that.setState({ dataState: 0 })
                                        if (that.updataData.forceUpgradeFl === 1) {
                                            ApkUtil.killApp();
                                        }
                                        //UpdataManager.todownLoadByInstall(that.updataData.packDlUrl, that.updataData.appVersion);
                                    }}
                                >
                                    <Text numberOfLines={1} style={{ fontSize: Dpi.s(30) }}>{that.updataData.cancelText}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ alignItems: 'center', flex: 1, padding: Dpi.d(5) }}
                                    onPress={() => {

                                        if (StaticVar.loadState === 1) {
                                            return;
                                        }
                                        UpdataManager.todownLoadByInstall(that.updataData.packDlUrl, that.updataData.appVersion, (receved, total) => {
                                            // console.log(receved + ' + ' + total + ' + ' + (receved / total))

                                            if (that.presessRef) {
                                                that.presessRef.setNativeProps({
                                                    width: Dpi.d(540) * (receved / total)
                                                })
                                            }
                                            if (that.pressTextRef) {
                                                that.pressTextRef.setText(parseFloat(receved / 1024000.0).toFixed(1) + 'M / ' + parseFloat(total / 1024000.0).toFixed(1) + 'M');
                                            }
                                        });
                                    }}
                                >
                                    <Text numberOfLines={1} style={{ color: '#45CAB9', fontSize: Dpi.s(30) }}>{that.updataData.okText}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View >
                )
            } else {
                return null;
            }
        }
    }
    showModel(upData) {
        if (upData) {
            this.updataData = upData;
            this.setState({
                dataState: 1
            })
        }
    }

}

