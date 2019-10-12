import React, { Component } from 'react';
import Storage from 'react-native-storage';

import {
    AppRegistry,
    View, AsyncStorage
} from 'react-native';

import SYNC from './SYNC';

var storage;
var defaultExpires = 1000 * 3600 * 24;
var size = 100000000;

export default class MySorage extends Component {

    static sorageInstance;
    static getInstance() {
        if (storage == undefined) {
            storage = new Storage({
                size: size,
                storageBackend: AsyncStorage,
                defaultExpires: null,
                enableCache: true,
                sync: SYNC
            });
        }
        if (MySorage.sorageInstance) {
            return MySoreage.sorageInstance;
        } else {
            MySoreage.sorageInstance = new MySorage();
            return MySoreage.sorageInstance;
        }
    }



    sava3(key, object, expires) {

        this.isInit();
        storage.save({
            key: key,
            data: object,
            expires: expires
        });

    }


    sava(key, object) {
        this._sava3(key, object, defaultExpires);
    }

    remove(key) {
        this.isInit();
        // 删除单个数据
        storage.remove({
            key: key,
        });
    }

    removeAll() {
        this.isInit();
        // 移除所有"key-id"数据（但会保留只有key的数据）
        storage.clearMap();
    }

    clearDataByKey(key) {
        this.isInit();
        // !! 清除某个key下的所有数据
        storage.clearMapForKey(key);
    }

    /**
      查询数据
    */

    load(key, callBack) {
        this._load3(key, null, null, callBack);
    }

    async loadByDefault(key, defaultValue, callBack) {
        this.isInit();
        let params = null;
        let someFlag = null;
        await storage.load({
            key: key,
            autoSync: true,
            syncInBackground: true,
            syncParams: {
                params,
                someFlag: someFlag,
            },
        }).then(ret => {
            callBack(ret);
            return ret;
        }).catch(err => {
            callBack(defaultValue);
        });
    }

    load3(key, params, someFlag, callBack) {

        this.isInit();
        storage.load({
            key: key,
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true,

            // 你还可以给sync方法传递额外的参数
            syncParams: {
                params,
                someFlag: someFlag,
            },
        }).then(ret => {
            callBack(ret);
            return ret;
        }).catch(err => {

            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            // console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        });
    }

    isInit() {
        if (storage == undefined) {
            throw "请先调用_getStorage()进行初始化";
        }
    }

}