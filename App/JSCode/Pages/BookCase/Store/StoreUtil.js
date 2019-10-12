import BookCaseBean from './BookCaseBean'
import BookCaseStore from './BookCaseStore'
export default class StoreUtil {
    /**
     * 从源数据格式化成store以便统一数据格式
     */
    static formatStore(sourctData) {
        if (sourctData && sourctData !== null) {
            let newBookCaseStore = new BookCaseStore();

            
            //图书列表
            let newBookCaseList = [];
            if (sourctData.req && sourctData.req.bags && sourctData.req.bags.length > 0) {
                sourctData.req.bags.map((item, index) => {
                    let bookBean = new BookCaseBean();
                    bookBean.bookCoverUrl = item.icon;
                    bookBean.bookId = item.bookId;
                    bookBean.bookName = item.bookName;
                    bookBean.hasNewChapter = false;
                    bookBean.isTop = item.top;
                    bookBean.index = item.index;
                    if (item.latestChapterInfo) {
                        bookBean.lastChapterId = item.latestChapterInfo.chapterId;
                        bookBean.lastChapterName = item.latestChapterInfo.chapterName;
                        bookBean.lastChapterOrder = item.latestChapterInfo.chapterOrder;
                        bookBean.lastChapterUrl = item.latestChapterInfo.chapterUrl;
                    }
                    bookBean.itemType = 0;
                    newBookCaseList.push(bookBean);
                })
            }
            // newBookCaseStore.bookCaseList = newBookCaseList;
            

            //书单列表
            let bookMenuCaseList = [];
            if (sourctData.req && sourctData.req.listBags && sourctData.req.listBags.length > 0) {
                sourctData.req.listBags.map((item, index) => {
                    let bookBean = new BookCaseBean();
                    bookBean.bookCoverUrl = item.cover;
                    bookBean.bookId = item.listId;
                    bookBean.bookName = item.listName;
                    bookBean.index = item.index;
                    bookBean.isTop = item.top;
                    bookBean.describe = item.recommend;
                    bookBean.hasNewChapter = false;
                    bookBean.lastChapterOrder = item.bookCount;
                    bookBean.itemType = 1;
                    newBookCaseList.push(bookBean);
                })
            }
            newBookCaseList.sort(function (a, b) {
                if ((a.isTop == 1 && b.isTop == 1) || (a.isTop == 0 && b.isTop == 0)) {
                    return a.index - b.index;
                } else {
                    if (a.isTop == 1) {
                        return -1;
                    } else {
                        return 1;
                    }
                }
            });
            newBookCaseStore.bookCaseList = newBookCaseList
            return newBookCaseStore;
        } else {
            return null;
        }
        // console.log('jsong数据 =' + JSON.stringify(sourctData));
    }


    static sortAsc(a, b) {
        try {

        } catch (error) {

        }
    }

}