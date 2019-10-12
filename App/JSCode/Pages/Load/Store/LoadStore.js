import {
    Platform
} from 'react-native'
import { observable, computed, action } from 'mobx'
import UMShare from '../../../Components/react-native-puti-umeng-share'
import PushUtil from '../../../Components/Umeng/PushUtil'
import MySorage from '../../../Utils/MyStore/MySorage'
import GlobleKey from '../../../Globle/GlobleKey'
/**
 * 整个App共享数据全部放在这里
 */
export default class LoadStore {

    constructor() {
        let that = this;
        if (Platform.OS == 'ios') {
            PushUtil.qqIsInstall((data, isinstall) => {
                if (isinstall == 'true') {
                    that.qqIsInstall = true;
                } else {
                    that.qqIsInstall = false;
                }
            })
            // MySorage.loadByDefault(GlobleKey.QqIsInstall, -1, (data) => {
            //     if (data != -1) {
            //         that.qqIsInstall = true;
            //     } else {
            //         UMShare.isInstall(UMShare.QQ).then((isInstall) => {
            //             if (isInstall == true) {
            //                 that.qqIsInstall = true;
            //                 MySorage._sava(GlobleKey.QqIsInstall, 1);
            //             } else {
            //                 that.qqIsInstall = false;
            //             }
            //         });
            //     }
            // });
        } else {
            that.qqIsInstall = true;
        }
        if (Platform.OS == 'ios') {
            UMShare.isInstall(UMShare.WEIXIN).then((isInstall) => {
                if (isInstall == true) {
                    that.wxIsInstall = true;
                } else {
                    that.wxIsInstall = false;
                }
            })
        } else {
            that.wxIsInstall = true;
        }

    }

    @observable
    qqIsInstall = false;        //qq是否安装

    @observable
    wxIsInstall = false;        //微信是否安装
}



