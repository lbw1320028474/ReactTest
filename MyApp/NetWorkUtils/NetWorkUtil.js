import React, { Component } from 'react';
import {
    Dimensions,
    PixelRatio
} from 'react-native';

module.exports = {
    /**
 * 基于fetch的get方法
 * @method post
 * @param {string} url
 * @param {function} callback 请求成功回调
 */
    getJsonByUrl: function (url, successCallback, failCallback) {
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                successCallback(JSON.parse(responseText));
            })
            .catch(function (err) {
                if (failCallback && failCallback !== null) {
                    failCallback(err);
                }
            });
    },
}