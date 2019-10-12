import { observable, computed, action } from 'mobx'
import ImageResource from '../../../../Resource/ImageResource';
import MySorage from '../../../Utils/MyStore/MySorage'
import GlobleKey from '../../../Globle/GlobleKey'
import EventBus from '../../../Utils/EventBus';
import UserInfo from '../UserInfo'
/**
 * 整个App共享数据全部放在这里
 */
export default class MyPageStore {
    /**
     * 用户是否已经登录
     */
    @observable
    isLoaded = false;
    /**
     * 缓存大小
     */
    @observable
    catchSize = 23;

    @observable
    userName = '';

    @observable
    userId = '';

    @observable
    loadType = 0;       //登录方式， 0：手机号， 1：qq， 2：微信， 3：微博

    @observable
    userCover = ImageResource.myNormalIcon;


    /**
     * 注销登录
     */
    @action
    cleanLoad() {
        if (this.isLoaded === true) {
            this.isLoaded = false;
            this.userName = '';
            this.userId = '';
            this.userCover = null;
        }
        UserInfo.isLoaded = true;
        UserInfo.userId = '';
        UserInfo.userName = '';
        /**
        * 清除用户登录状态
        */
        MySorage._remove(GlobleKey.KeyUserLoadData);
        EventBus.emit(GlobleKey.EVENT_BOOKCASE_RELOAD);
    }

    @action
    setUserData(userName, userId, userCover = ImageResource.myPageLoadedCover, loadType = 0) {
        this.loadType = loadType;
        // if (this.loadType === 0) {
        this.isLoaded = true;
        this.userName = userName;
        this.userId = userId;
        this.userCover = userCover;
        UserInfo.isLoaded = true;
        UserInfo.userId = userId;
        UserInfo.userName = userName;
        /**
         * 保存用户登录状态
         */
        MySorage._sava(GlobleKey.KeyUserLoadData, {
            loadType: this.loadType,
            isLoaded: true,
            userName: this.userName,
            userId: this.userId,
            userCover: (this.loadType === 0) ? '' : this.userCover
        })
        EventBus.emit(GlobleKey.EVENT_BOOKCASE_RELOAD);
        // } else if (loadType === 1) {

        // } else if (loadType === 2) {

        // }
    }
}



