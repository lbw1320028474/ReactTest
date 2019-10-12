import React, { Component } from 'react';
import {
    Dimensions,
    PixelRatio,
    Platform
} from 'react-native';
import DeviceInfoStatic from '../NativeModul/MyDeviceInfo/DeviceInfoStatic'
import DeviceInfo from 'react-native-device-info'

module.exports = {
    size: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    pixel: 1 / PixelRatio.get(),
    textScale: PixelRatio.getFontScale(),
    getImei: function () {
        try {
            let imei = DeviceInfo.getUniqueID();
            if (Platform.OS === 'ios') {
                imei = imei.replace(/-/g, '');
                return imei;
            } else {
                return DeviceInfoStatic.imei;
            }
        } catch (error) {
            return '';
        }

    },
}