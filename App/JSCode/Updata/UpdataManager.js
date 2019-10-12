import {
    Platform
} from 'react-native'
import RNFS from 'react-native-fs';
import Zip from '@remobile/react-native-zip'
import RNFetchBlob from 'react-native-fetch-blob';
import NetWorkUtil from '../Network/NetWorkUtil'
import GlobleVar from '../Globle/GlobleVar'
import GlobleUrl from '../Globle/GlobleUrl'
import GetUpgradeStrategyRequest from '../Protocol/GetUpgradeStrategyRequest'
import ApkUtil from '../NativeModul/ApkUtil'
import StaticVar from './StaticVar'
export default class UpdataManager {
    static lastCheckTimer;

    static checkUpdata(callBack) {
        try {
            //alert('地址：' + RNFS.DocumentDirectoryPath + '/Bundle/novel_');
            if (Platform.OS === 'ios') {
                return;
            }
            let curTime = new Date();
            if (UpdataManager.lastCheckTimer && (curTime.getTime() - UpdataManager.lastCheckTimer) < 30000) { //30秒内不会重复检测更新
                return;
            }
            UpdataManager.lastCheckTimer = curTime.getTime();
            //  UpdataManager.todownLoadByInstall('http://p003bt12y.bkt.clouddn.com/novel.mp4', 5000);
            // console.log('开始请求检测更新,');
            let upgradeStrategyRequest = new GetUpgradeStrategyRequest();
            // console.log(JSON.stringify(upgradeStrategyRequest));
            NetWorkUtil.getJsonByPost(
                GlobleUrl.URL_BASE_URL + GlobleUrl.URL_UPDATA_CHECK,
                JSON.stringify(upgradeStrategyRequest),
                (data) => {
                    //console.log('更新请求返回：' + JSON.stringify(data))
                    if (data && data.msgCode === 200 && data.strategy) {
                        if (callBack) {
                            callBack(data.strategy);
                        }

                    } else {
                        //console.log('不需要更新');
                    }
                },
                (err) => {
                    //console.log('检测更新失败' + err);
                }
            )
        } catch (err) {
            // console.log('检测更新异常');
        }
    }

    static checkUpdataInBackground() {

        try {
            if (Platform.OS === 'ios') {
                return;
            }
            let curTime = new Date();
            if (UpdataManager.lastCheckTimer && (curTime.getTime() - UpdataManager.lastCheckTimer) < 5000) { //5秒内不会重复检测更新
                return;
            }
            UpdataManager.lastCheckTimer = curTime.getTime();
            //  UpdataManager.todownLoadByInstall('http://p003bt12y.bkt.clouddn.com/novel.mp4', 5000);
            // console.log('开始请求检测更新,');
            let upgradeStrategyRequest = new GetUpgradeStrategyRequest();
            NetWorkUtil.getJsonByPost(
                GlobleVar.URL_BASE_URL + GlobleVar.URL_UPDATA_CHECK,
                JSON.stringify(upgradeStrategyRequest),
                (data) => {
                    //console.log('更新请求返回：' + JSON.stringify(data))
                    if (data && data.msgCode === 200 && data.strategy) {
                        //alert(JSON.stringify(data))
                        if (data.strategy.upgradeType === 1
                            && data.strategy.packDlUrl
                            && data.strategy.packDlUrl !== '') {
                            //console.log('开始更新,');
                            UpdataManager.todownLoad(data.strategy.packDlUrl, data.strategy);
                        } else if (data.strategy.upgradeType === 2
                            && data.strategy.packDlUrl
                            && data.strategy.packDlUrl !== '') {
                            UpdataManager.todownLoadByInstall(data.strategy.packDlUrl, data.strategy.appVersion);
                        } else {
                            //  console.log('不需要更新');
                        }
                    } else {
                        //console.log('不需要更新');
                    }
                },
                (err) => {
                    //console.log('检测更新失败' + err);
                }
            )
        } catch (err) {
            // console.log('检测更新异常');
        }
    }

    static todownLoadByInstall(packUrl, version, pressCallback) {
        //console.log('更新地址' + packUrl);
        if (Platform.OS === 'ios') {
            return;
        }
        let url = packUrl;
        let toPath = RNFS.ExternalStorageDirectoryPath + '/Bundle/novel_' + version + '.apk';
        // alert('toPath:' + toPath)
        ApkUtil.fileExist(toPath, (exit) => {
            if (exit && exit === true) {
                ApkUtil.installApk(toPath);
            } else {
                //alert('开始下')
                StaticVar.loadState = 1;
                RNFetchBlob.config({
                    // progress: () => { alert('下载进度更新') },
                    overwrite: true,
                    path: toPath,
                    fileCache: true,
                }).fetch('GET', url, {
                }).progress({ count: 10 }, (received, total) => {
                    if (pressCallback) {
                        pressCallback(received, total);
                    }
                }).then((res) => {
                    //alert('下载成功:' + res.path());
                    StaticVar.loadState = 0;
                    if (res) {
                        ApkUtil.installApk(res.path());
                    }
                })
            }
        })
        // if (ApkUtil.fileExist(toPath)) {
        //      alert('存在旧包' + toPath)
        //     ApkUtil.installApk(toPath);
        // } else {
        //     //alert('开始下')
        //     RNFetchBlob.config({
        //         // progress: () => { alert('下载进度更新') },
        //         overwrite: true,
        //         path: toPath,
        //         fileCache: true,
        //     }).fetch('GET', url, {
        //     }).progress({ count: 10 }, (received, total) => {
        //         if (pressCallback) {
        //             pressCallback(received, total);
        //         }
        //     }).then((res) => {
        //         //alert('下载成功:' + res.path());
        //         if (res) {
        //             ApkUtil.installApk(res.path());
        //         }
        //     })
        // }

        // }
    }
    static todownLoad(packUrl, version) {
        //console.log('更新地址' + packUrl);
        let url = packUrl;
        let toPath = RNFS.DocumentDirectoryPath + '/Bundle/JSBundle_' + version + '.zip'
        RNFetchBlob.config({
            overwrite: true,
            appendExt: 'zip',
            path: toPath,
            fileCache: true,
        }).fetch('GET', url, {
        }).then((res) => {
            if (res) {
                Zip.unzip(
                    res.path(),
                    RNFS.DocumentDirectoryPath + '/Bundle/JSBundle_' + version,
                    (err) => {
                        if (err) {
                            // 解压失败
                        }
                        else {
                            // 解压成功，将zip删除
                            RNFS.unlink(res.path()).then(() => {
                            });
                        }
                    }
                );
            }
        })
    }
}