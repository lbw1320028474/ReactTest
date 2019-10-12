import React, {Component} from 'react';
import {NativeModules, Alert, Platform} from 'react-native';

const UMengShare = NativeModules.UMengShare;


export default class UMShare {
    //分享平台
    static QQ = "QQ";
    static QZONE = "QZONE";
    static WEIXIN = "WEIXIN";
    static WEIXIN_CIRCLE = "WEIXIN_CIRCLE";
    static WEIXIN_FAVORITE = "WEIXIN_FAVORITE";
    static SINA = "SINA";


    //分享类型
    static UMImage = "UMImage";
    static UMWeb = "UMWeb";
    static UMVideo = "UMVideo";
    static UMusic = "UMusic";

    /**
     * 是否是debug模式
     * @param debug
     */
    static debug(debug) {
        UMengShare.debug(debug == null ? false : debug);
    }

    /**
     * 设置微信参数
     * @param id
     * @param secret
     */
    static setWeixin(id, secret) {
        UMengShare.setWeixin(id, secret);
    }

    /**
     * 设置QQ参数
     * @param id
     * @param key
     */
    static setQQZone(id, key) {
        UMengShare.setQQZone(id, key);
    }

    /**
     * 设置新浪微博参数
     * @param key
     * @param secret
     * @param url
     */
    static setSinaWeibo(key, secret, url) {
        UMengShare.setSinaWeibo(key, secret, url);
    }

    /**
     * 是否安装应用,返回Promise，结果为bool
     * @param type
     * @returns {*}
     */
    static  isInstall(type) {
        if (Platform.OS === 'ios') {
            return new Promise((resolve, reject) => {
                UMengShare.isInstall(type, res => {
                    if (res === 'true') {
                        resolve(true);
                    } else if (res === 'false') {
                        resolve(false);
                    } else {
                        reject();
                    }
                });
            });
        }
        return UMengShare.isInstall(type);
    }

    /**
     * 分享    platform分享平台,如果想打开分享面板,以逗号相隔
     * @param params    分享参数
     * @param callback  回调一个布尔值，true分享成功，false分享失败
     */
    static share(params, callback) {
        UMengShare.share({text: '', type: '', image: '', title: '', url: '', desc: '', platform: '', ...params})
            .then(data => {
                callback(true)
            }).catch(() => callback(false))
    }

    /**
     * 第三方登录
     * @param platform  登录平台
     * @returns {Promise}
     */
    static login(platform) {
        return UMengShare.login(platform);
    }
}
