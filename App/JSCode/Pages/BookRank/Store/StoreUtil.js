
import MySorage from '../../../Utils/MyStore/MySorage'
import GlobleKey from '../../../Globle/GlobleKey'
import BookBean from './BookBean'
import BookRankStore from './BookRankStore'
import RankBean from './RankBean'
export default class StoreUtil {
    /**
     * 从源数据格式化成store以便统一数据格式
     */
    static formatStore(sourctData) {
        // console.log(JSON.stringify(sourctData))
        if (sourctData && sourctData !== null) {
            if (sourctData.navi && sourctData.navi.modules && sourctData.navi.modules.length > 0 && sourctData.navi.modules[0].groups) {
                let rankStore = new BookRankStore();
                let rankList = StoreUtil.getRankList(sourctData.navi.modules[0].groups)
                console.log(rankList.length)
                if (rankList && rankList !== null && rankList.length > 0) {
                    rankStore.rankList = rankList;
                }
                return rankStore;
            } else {
                console.log('开始转换21null')
                return null;
            }
        } else {
            console.log('开始转换null')
            return null;
        }
    }


    static getRankList(data) {
        if (data && data.length > 0) {
            let rankList = data.map((item, index) => {
                let rankBean = new RankBean();
                rankBean.rankId = item.groupId;
                rankBean.rankName = item.groupName;
                let bookList = StoreUtil.getBookList(item.books);
                if (bookList && bookList.length > 0) {
                    rankBean.bookList = bookList;
                }
                return rankBean;
            })
            if (rankList && rankList.length > 0) {
                return rankList;
            } else {
                return [];
            }
        } else {
            console.log('开始转换null')
            return null;
        }
    }


    static getBookList(data) {
        if (data && data.length > 0) {
            let books = [];
            books = data.map((item, index) => {
                let bookBean = new BookBean();
                bookBean.bookAuthor = item.authorName;
                bookBean.bookCategory = item.categoryName;
                bookBean.bookCoverUrl = item.icon;
                bookBean.bookDescript = item.recommend;
                bookBean.bookId = item.id;
                bookBean.bookName = item.bookName;
                bookBean.rankNum = index;
                return bookBean;
            })
            return books;
        } else {
            return null;
        }
    }
}

