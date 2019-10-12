import MySorage from '../../../Utils/MyStore/MySorage'
import GlobleKey from '../../../Globle/GlobleKey'
import BookMenuInfoBean from './BookMenuInfoBean'
import BookMenuInfoStore from './BookMenuInfoStore'
export default class StoreUtil {
    /**
     * 从源数据格式化成store以便统一数据格式
     */
    static formatStore(sourctData) {
        // console.log('书单详情页面列表 = ' + JSON.stringify(sourctData))
        console.log('书单详情页面列表 = ' + JSON.stringify(sourctData))
        if (sourctData && sourctData !== null && sourctData.books && sourctData.books.length > 0 && sourctData.list) {
            let infoStore = new BookMenuInfoStore();
            infoStore.bookCount = sourctData.list.bookCount;
            infoStore.bookMenuCover = sourctData.list.cover;
            infoStore.bookMenuDescript = sourctData.list.listDesc;
            infoStore.bookMenuId = sourctData.list.listId;
            infoStore.isBagBook = (sourctData.list.inBag == 1) ? true : false;
            infoStore.bookMenuName = sourctData.list.listName;
            let list = StoreUtil.getList(sourctData.books);
            if (list && list !== null && list.length > 0) {
                infoStore.bookList = list;
                return infoStore;
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
                let bean = new BookMenuInfoBean();
                bean.bookAuthor = item.authorName;
                bean.bookCategory = item.categoryName;
                bean.bookCoverUrl = item.icon;
                bean.bookDescript = item.recommend;
                bean.bookId = item.id;
                bean.bookName = item.bookName;
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

