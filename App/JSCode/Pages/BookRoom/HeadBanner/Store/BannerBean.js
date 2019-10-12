import { observable, computed, action } from 'mobx'
/**
 * 整个App共享数据全部放在这里
 */
export default class BannerBean {
    static BANNER_TYPE_LINK = 1;        //连接
    static BANNER_TYPE_BOOK_INFO = 2;   //单本
    static BANNER_TYPE_BOOK_LIST = 3;   //列表
    static BANNER_TYPE_BOOK_MENU_LIST = 4;//书单
    /**
     * banner的id
     */
    // @observable
    bannerId = '';
    /**
    * banner的名称
    */
    //@observable
    bannerName = '';

    /**
     * banner的类型， 类型值在HeadBannerStore
     */
    //@observable
    bannerType = 0;

    /**
     * banner图片
     */
    // @observable
    bannerImage = '';


    /**
     * banner url
     */
    bannerUrl = '';
}



