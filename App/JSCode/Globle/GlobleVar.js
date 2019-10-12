import Dpi from '../Utils/Dpi'
import React, { Component } from 'react';
import {
    Dimensions,
    PixelRatio,
    Platform
} from 'react-native';
export default class GlobleVar {
    static bookRoomHeadBannerHeight = Dpi.d(392);
    static bookRoomSubBannerHeight = Dpi.d(274);
    static jsBundleVersion = 4005;     //js代码版本
    //appChannelId='406058878';
    static appChannelId = 'gkmarket_01';
    static adjustHeight = (Platform.OS === 'android' && Platform.Version < 19) ? 0 : Dpi.d(50); //顶部需要空余位置给状态栏的高度，小于android4.4是0
}