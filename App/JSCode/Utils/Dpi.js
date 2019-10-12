import React, { Component } from 'react';
import {
    Dimensions,
    PixelRatio
} from 'react-native';
module.exports = {
    //cfc83acc661fa394f6bcdc40b0c503d628227532
    d: (px) => px * Dimensions.get('window').width / 720.00,    //所有长度单位统一使用比例来计算，设置的所有单位以720 * 1280为基础
    s: (px) => px * Dimensions.get('window').width / 720.00,
}