import BookRoomStore from './BookRoomStore'
import BookMenuBean from '../BookMenu/Store/BookMenuBean'
import HotBookBean from '../HotBookList/Store/HotBookBean'
import SubBannerBean from '../SubBanner/Store/SubBannerBean'
import NormalBookBean from '../NormalList/Store/NormalBookBean'
import GroupStore from './GroupStore'
import BannerBean from '../HeadBanner/Store/BannerBean'
import MySorage from '../../../Utils/MyStore/MySorage'
import GlobleKey from '../../../Globle/GlobleKey'
import Dpi from '../../../Utils/Dpi'
export default class StoreUtil {
    /**
     * 从源数据格式化成store以便统一数据格式
     */
    static formatStore(sourctData) {
        console.log(JSON.stringify(sourctData))
        if (sourctData && sourctData !== null && sourctData.navi && sourctData.navi.modules && sourctData.navi.modules.length > 0) {
            let bookRoomStore = new BookRoomStore();
            let groupBean = [];
            let totalOfset = 0;
            for (let i = 0; i < sourctData.navi.modules.length; ++i) {
                let item = sourctData.navi.modules[i];
                if (item && item.moduleType === 1 && item.groups && item.groups.length > 0) {
                    let bannerBean = StoreUtil.getBannerGroup(item.groups)
                    if (bannerBean && bannerBean != null) {
                        bannerBean.groupType = 0;
                        bannerBean.viewHeight = Dpi.d(392);
                        bannerBean.viewOffset = totalOfset;
                        totalOfset += Dpi.d(392);
                        bannerBean.groupName = item.moduleName;
                        bannerBean.groupId = item.moduleId;
                        groupBean.push(bannerBean);
                    }
                } else if (item) {
                    if (item.lists && item.lists.length > 0) {
                        let bookMenuGroup = StoreUtil.getBookMenuGroup(item.lists);
                        if (bookMenuGroup && bookMenuGroup !== null) {
                            bookMenuGroup.groupType = 1;
                            bookMenuGroup.groupId = item.moduleId;
                            bookMenuGroup.viewHeight = Dpi.d(840);
                            bookMenuGroup.viewOffset = totalOfset;
                            totalOfset += Dpi.d(840) + Dpi.d(20);
                            bookMenuGroup.groupName = '推荐书单';
                            groupBean.push(bookMenuGroup)
                        }
                    }
                    if (item.groups && item.groups.length > 0) {
                        item.groups.map((item, index) => {
                            if (item.groupStyle == 2) {
                                let hotGroup = StoreUtil.getHotGroup(item);
                                if (hotGroup && hotGroup !== null) {
                                    hotGroup.groupId = item.groupId;
                                    hotGroup.groupName = item.groupName;
                                    hotGroup.viewHeight = Dpi.d(760);
                                    hotGroup.viewOffset = totalOfset;
                                    totalOfset += Dpi.d(760) + Dpi.d(20);
                                    hotGroup.groupType = 2;     //这里的这个groupType和服务端的类型不统一，这个在显示的时候以本地说明为主， //分组类型，0:大banner,  1：3-3书单列表 , 2: 1-3样式， 3：小banner， 4：正常列表   ,5:3-1样式,  6:3-3图书列表样式
                                    groupBean.push(hotGroup)
                                }
                            } else if (item.groupStyle === 1) {
                                let normalGroup = StoreUtil.getNormalGroup(item);
                                if (normalGroup && normalGroup !== null) {
                                    normalGroup.groupId = item.groupId;
                                    normalGroup.groupName = item.groupName;
                                    normalGroup.viewHeight = Dpi.d(3060);
                                    normalGroup.viewOffset = totalOfset;
                                    totalOfset += Dpi.d(3060) + Dpi.d(20);
                                    normalGroup.groupType = 4;//这里的这个groupType和服务端的类型不统一，这个在显示的时候以本地说明为主， //分组类型，0:banner,  1：3-3书单列表 , 2: 1-3样式， 3：小banner， 4：正常列表   ,5:3-1样式,  6:3-3图书列表样式
                                    groupBean.push(normalGroup)
                                }
                            } else if (item.groupStyle === 3) {
                                let normalGroup = StoreUtil.getNormalGroup(item);
                                if (normalGroup && normalGroup !== null) {
                                    normalGroup.groupId = item.groupId;
                                    normalGroup.groupName = item.groupName;
                                    normalGroup.groupType = 5;
                                    normalGroup.viewHeight = Dpi.d(480);
                                    normalGroup.viewOffset = totalOfset;
                                    totalOfset += Dpi.d(480) + Dpi.d(20);
                                    groupBean.push(normalGroup)
                                }
                            } else if (item.groupStyle === 4) {
                                let subBanner = StoreUtil.getNormalGroup(item);
                                if (subBanner && subBanner !== null) {
                                    subBanner.groupId = item.groupId;
                                    subBanner.groupName = item.groupName;
                                    subBanner.viewHeight = Dpi.d(850);
                                    subBanner.viewOffset = totalOfset;
                                    totalOfset += Dpi.d(850) + Dpi.d(20);
                                    subBanner.groupType = 6;//这里的这个groupType和服务端的类型不统一，这个在显示的时候以本地说明为主， //分组类型，0:banner,  1：3-3书单列表 , 2: 1-3样式， 3：小banner， 4：正常列表   ,5:3-1样式,  6:3-3图书列表样式
                                    groupBean.push(subBanner)
                                }
                            } else if (item.groupStyle === 5) {
                                let subBanner = StoreUtil.getSubBannerGroup(item);
                                if (subBanner && subBanner !== null) {
                                    subBanner.groupId = item.groupId;
                                    subBanner.groupName = item.groupName;
                                    subBanner.viewHeight = Dpi.d(274);
                                    subBanner.viewOffset = totalOfset;
                                    totalOfset += Dpi.d(274) + Dpi.d(20);
                                    subBanner.groupType = 3;//这里的这个groupType和服务端的类型不统一，这个在显示的时候以本地说明为主， //分组类型，0:banner,  1：3-3书单列表 , 2: 1-3样式， 3：小banner， 4：正常列表   ,5:3-1样式,  6:3-3图书列表样式
                                    groupBean.push(subBanner)
                                }
                            } else if (item.groupStyle == 6) {
                                let hotGroup = StoreUtil.getHotGroup(item);
                                if (hotGroup && hotGroup !== null) {
                                    hotGroup.groupId = item.groupId;
                                    hotGroup.groupName = item.groupName;
                                    hotGroup.viewHeight = Dpi.d(760);
                                    hotGroup.viewOffset = totalOfset;
                                    totalOfset += Dpi.d(760) + Dpi.d(20);
                                    hotGroup.groupType = 7;     //这里的这个groupType和服务端的类型不统一，这个在显示的时候以本地说明为主， //分组类型，0:大banner,  1：3-3书单列表 , 2: 1-3样式， 3：小banner， 4：正常列表   ,5:3-1样式,  6:3-3图书列表样式
                                    groupBean.push(hotGroup)
                                }
                            } else {
                                let hotGroup = StoreUtil.getHotGroup(item);
                                if (hotGroup && hotGroup !== null) {
                                    hotGroup.groupId = item.groupId;
                                    hotGroup.groupName = item.groupName;
                                    hotGroup.viewHeight = Dpi.d(760);
                                    hotGroup.viewOffset = totalOfset;
                                    totalOfset += Dpi.d(760) + Dpi.d(20);
                                    hotGroup.groupType = 2;     //这里的这个groupType和服务端的类型不统一，这个在显示的时候以本地说明为主， //分组类型，0:大banner,  1：3-3书单列表 , 2: 1-3样式， 3：小banner， 4：正常列表   ,5:3-1样式,  6:3-3图书列表样式
                                    groupBean.push(hotGroup)
                                }
                            }
                        })
                    }
                }
            }
            if (groupBean && groupBean.length > 0) {
                bookRoomStore.groupList = groupBean;
                return bookRoomStore;
            } else {
                return null;
            }
            // let groupBean = sourctData.navi.modules.map((item, index) => {
            //     if (item.moduleType === 1) {
            //         item.
            //     }
            // })
            // let tabStore = new BookRoomStore();
            // return tabStore;
        } else {
            return null;
        }
    }

    // @observable
    // bookId = '';

    // @observable
    // bookName = '';

    // @observable
    // bookCoverUrl = '';

    // @observable
    // bookAuthor = '';

    // @observable
    // bookDescript = '';

    // @observable
    // bookCategory = '';
    static getNormalGroup(data) {
        if (data && data.books && data.books.length > 0) {
            let groupStore = new GroupStore();
            let normalBookGroup = data.books.map((item, index) => {
                let normalBean = new NormalBookBean();
                normalBean.bookAuthor = item.authorName;
                normalBean.bookCategory = item.categoryName;
                normalBean.bookCoverUrl = item.icon;
                normalBean.bookDescript = item.recommend;
                normalBean.bookId = item.id;
                normalBean.bookName = item.bookName;
                return normalBean;
            })
            if (normalBookGroup && normalBookGroup.length > 0) {
                groupStore.groupBeanList = normalBookGroup;
                return groupStore;
            } else {
                return null;
            }
            // groupStore
        } else {
            return null;
        }
    }

    static getHotGroup(data) {
        if (data && data.books && data.books.length > 0) {
            let groupStore = new GroupStore();
            let hotBookGroup = data.books.map((item, index) => {
                let hotBookBean = new HotBookBean();
                hotBookBean.bookAuthor = item.authorName;
                hotBookBean.bookCategory = item.categoryName;
                hotBookBean.bookCoverUrl = item.icon;
                hotBookBean.bookDescript = item.recommend;
                hotBookBean.bookId = item.id;
                hotBookBean.bookName = item.bookName;
                return hotBookBean;
            })
            if (hotBookGroup && hotBookGroup.length > 0) {
                groupStore.groupBeanList = hotBookGroup;
                return groupStore;
            } else {
                return null;
            }
            // groupStore
        } else {
            return null;
        }
    }

    static getBookMenuGroup(data) {
        if (data && data.length > 0) {
            let groupStore = new GroupStore();
            let bookMenuList = data.map((item, index) => {
                let bean = new BookMenuBean();
                bean.bookCount = item.bookCount;
                bean.bookMenuCover = item.cover;
                bean.bookMenuDescript = item.listDesc;
                bean.bookMenuId = item.listId;
                bean.bookMenuName = item.listName;
                bean.isBagBook = item.inBag;
                bean.collectorCount = item.collectorCount;
                return bean;
            })
            if (bookMenuList && bookMenuList.length > 0) {
                groupStore.groupBeanList = bookMenuList;
                return groupStore;
            } else {
                return null;
            }
            // groupStore
        } else {
            return null;
        }
    }


    // @observable
    // groupType = 0;      //分组类型，0:banner,  1：推荐书单 , 2: 热门追更， 3：小banner， 4：正常列表   
    // /**
    //  * banner的id
    //  */
    // // @observable
    // bannerId = '';
    // /**
    // * banner的名称
    // */
    // //@observable
    // bannerName = '';

    // /**
    //  * banner的类型， 类型值在HeadBannerStore
    //  */
    // //@observable
    // bannerType = 0;

    // /**
    //  * banner图片
    //  */
    // // @observable
    // bannerImage = '';
    static getSubBannerGroup(data) {
        if (data) {
            if (data.groupType == 4) {
                let groupStore = new GroupStore();
                let subBannerGroup = [];
                let subBannerBean = new SubBannerBean();
                if (data.books && data.books.length > 0) {
                    subBannerBean.bannerName = data.books[0].bookName;
                    subBannerBean.bannerId = data.books[0].id;
                    subBannerBean.bannerImage = data.iconPicUrl;
                    subBannerBean.bannerType = 2;
                    subBannerGroup.push(subBannerBean);
                    if (subBannerGroup && subBannerGroup.length > 0) {
                        groupStore.groupBeanList = subBannerGroup;
                        return groupStore;
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }

            } else {
                let groupStore = new GroupStore();
                let subBannerGroup = [];
                let subBannerBean = new SubBannerBean();
                subBannerBean.bannerName = data.groupName;
                subBannerBean.bannerId = data.groupId;
                subBannerBean.bannerImage = data.iconPicUrl;
                subBannerBean.bannerType = 3;
                subBannerGroup.push(subBannerBean);
                if (subBannerGroup && subBannerGroup.length > 0) {
                    groupStore.groupBeanList = subBannerGroup;
                    return groupStore;
                } else {
                    return null;
                }
            }
            // groupStore
        } else {
            return null;
        }
    }


    // @observable

    static getBannerGroup(data) {
        if (data && data.length > 0) {
            let groupStore = new GroupStore();
            let groups = data.map((item, index) => {
                if (item.groupType === 4) {
                    if (item.books && item.books.length > 0) {
                        let headBannerBean = new BannerBean();
                        headBannerBean.bannerId = item.books[0].id;
                        headBannerBean.bannerImage = item.iconPicUrl;
                        headBannerBean.bannerUrl = item.clickUrl;
                        headBannerBean.bannerName = item.books[0].bookName;
                        headBannerBean.bannerType = 2;
                        return headBannerBean;
                    } else {
                        return null;
                    }

                } else {
                    let headBannerBean = new BannerBean();
                    headBannerBean.bannerId = item.groupId;
                    headBannerBean.bannerImage = item.iconPicUrl;
                    headBannerBean.bannerUrl = item.clickUrl;
                    headBannerBean.bannerName = item.groupName;
                    if (item.groupType === 1) {
                        headBannerBean.bannerType = 3;
                    } else if (item.groupType === 2) {
                        headBannerBean.bannerType = 1;
                    }
                    return headBannerBean;
                }
            })
            if (groups && groups.length > 0) {
                groupStore.groupBeanList = groups;
                return groupStore;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}
        //  //console.log('jsong数据 =' + JSON.stringify(sourctData));

