import BookInfoStore from './BookInfoStore'
import ChapterBean from './ChapterBean'
import RecommendBean from './RecommendBean'
import ChapterNameUtil from '../../../Utils/ChapterNameUtil'
export default class StoreUtil {
    /**
     * 从源数据格式化成store以便统一数据格式
     */
    static formatStore(sourctData) {
        if (sourctData && sourctData !== null) {
            let bookInfoStore = new BookInfoStore();
            if (sourctData.detail) {
                bookInfoStore.bookAuthor = sourctData.detail.authorName;
                bookInfoStore.bookCategory = sourctData.detail.categoryName;
                bookInfoStore.bookCover = sourctData.detail.icon;
                bookInfoStore.bookDescripte = sourctData.detail.recommend;
                bookInfoStore.bookId = sourctData.detail.id;
                bookInfoStore.bookName = sourctData.detail.bookName;
                bookInfoStore.chapter_01 = StoreUtil._getChapterBean(sourctData.chapterList, 0);
                bookInfoStore.chapter_02 = StoreUtil._getChapterBean(sourctData.chapterList, 1);
                bookInfoStore.chapter_03 = StoreUtil._getChapterBean(sourctData.chapterList, 2);
                bookInfoStore.lasterChapter = StoreUtil._getLasterBean(sourctData.latestChapterInfo);
                bookInfoStore.reCommendList = StoreUtil._getCommentlist(sourctData.recommendList);
                if (bookInfoStore.lasterChapter && bookInfoStore.lasterChapter.chapterOrder > 0) {
                    bookInfoStore.chapterCount = bookInfoStore.lasterChapter.chapterOrder;
                } else {
                    bookInfoStore.chapterCount = sourctData.detail.chapterCount;
                }
                bookInfoStore.isContinue = (sourctData.detail.isContinue === 1) ? true : false;
                bookInfoStore.isPagBook = (sourctData.detail.inBag === 1) ? true : false;
                return bookInfoStore;
            } else {
                return null;
            }
        } else {
            return;
        }
        // console.log('jsong数据 =' + JSON.stringify(sourctData));
    }

    static _getCommentlist(recommendList) {
        let recommendStoreList = [];
        if (recommendList && recommendList.length > 0) {
            for (let i = 0; i < recommendList.length && i < 4; ++i) {
                let recommendBean = new RecommendBean();
                recommendBean.id = recommendList[i].id;
                recommendBean.bookId = recommendList[i].bookId;
                recommendBean.bookName = recommendList[i].bookName;
                recommendBean.bookCover = recommendList[i].icon;
                recommendStoreList.push(recommendBean);
            }
        }
        return recommendStoreList;
    }

    static _getChapterBean(sourctList, index) {
        if (sourctList
            && sourctList !== null
            && sourctList.length > 0
            && index < sourctList.length) {
            let chapterBean = new ChapterBean();
            let chapter = sourctList[index];
            chapterBean.chapterId = chapter.id;
            chapterBean.chapterOrder = chapter.chapterOrder;
            chapterBean.chapterName = StoreUtil._formatName(chapter.chapterName, chapterBean.chapterOrder);
            chapterBean.chapterUrl = chapter.chapterUrl;
            return chapterBean;
        } else {
            return null;
        }
    }

    static _getLasterBean(latestChapterInfo) {
        if (latestChapterInfo
            && latestChapterInfo !== null
        ) {
            let chapterBean = new ChapterBean();
            let chapter = latestChapterInfo;
            chapterBean.chapterId = chapter.id;
            chapterBean.chapterOrder = chapter.chapterOrder;
            chapterBean.chapterName = StoreUtil._formatName(chapter.chapterName, chapterBean.chapterOrder);
            chapterBean.chapterUrl = chapter.chapterUrl;
            return chapterBean;
        } else {
            return null;
        }
    }

    static _formatName(name, order) {
        if (name) {
            let newName = ChapterNameUtil.formatChapterName(name, order)
            if (newName && newName !== null) {
                return newName;
            } else {
                return name;
            }
        } else {
            return name;
        }
    }
}