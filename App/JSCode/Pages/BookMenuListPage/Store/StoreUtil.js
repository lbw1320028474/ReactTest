import MySorage from '../../../Utils/MyStore/MySorage'
import BookMenuListStore from './BookMenuListStore'
import BookMenuBean from './BookMenuBean'
import GlobleKey from '../../../Globle/GlobleKey'
export default class StoreUtil {
    /**
     * 从源数据格式化成store以便统一数据格式
     */
    static formatStore(sourctData) {
        // console.log('书单详情页面列表 = ' + JSON.stringify(sourctData))
        if (sourctData && sourctData !== null && sourctData.lists && sourctData.lists.length > 0) {
            let listStore = new BookMenuListStore();
            let list = StoreUtil.getList(sourctData.lists);
            if (list && list.length > 0) {
                listStore.bookMenuList = list;
                return listStore;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    static getList(data) {
        if (data && data.length > 0) {
            let lists = [];
            lists = data.map((item, index) => {
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
            if (lists && lists.length > 0) {
                return lists;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}

