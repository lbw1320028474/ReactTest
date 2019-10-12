
import MySorage from '../../../Utils/MyStore/MySorage'
import GlobleKey from '../../../Globle/GlobleKey'
import BookBean from '../Store/BookBean'
// import BookListStore from './BookListStore'
export default class StoreUtil {
    /**
     * 从源数据格式化成store以便统一数据格式
     */
    static formatStore(sourctData) {
        console.log("列表数据= " + JSON.stringify(sourctData));
        if (sourctData && sourctData !== null && sourctData.books && sourctData.books.length > 0) {
            let books = sourctData.books.map((item, index) => {
                let bookBean = new BookBean();
                bookBean.bookAuthor = item.authorName;
                bookBean.bookCategory = item.categoryName;
                bookBean.rankNum = 11;
                bookBean.bookCoverUrl = item.icon;
                bookBean.bookDescript = item.recommend;
                bookBean.bookId = item.id;
                bookBean.bookName = item.bookName;
                return bookBean;
            })
            if (books && books.length > 0) {
                return books;
            } else {
                return null;
            }
        } else {
            console.log('开始转换null')
            return null;
        }
    }
}

