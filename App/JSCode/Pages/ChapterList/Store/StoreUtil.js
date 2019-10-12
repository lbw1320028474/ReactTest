import ChapterListStore from './ChapterListStore'
import ChapterListBean from './ChapterListBean'
import CatchSqlLiteUtil from '../../../Catch/CatchSqlLiteUtil'
import ChapterNameUtil from '../../../Utils/ChapterNameUtil'
import ChapterStatic from './ChapterStatic'
import ChapterTrueCount from '../../BookRead/SubViews/ReadView/Manager/ChapterTrueCount'
export default class StoreUtil {
    /**
     * 从源数据格式化成store以便统一数据格式
     */
    static formatStore(sourctData, callBack) {
        if (sourctData && sourctData !== null) {
            // console.log('章节列表jsong数据 =' + JSON.stringify(sourctData));
            let listStore = new ChapterListStore();
            listStore.chapterList = [];
            if (sourctData.detail) {
                listStore.bookId = sourctData.detail.id;
                listStore.bookAuthor = sourctData.detail.authorName;
                listStore.bookCover = sourctData.detail.icon;
                listStore.bookName = sourctData.detail.bookName;
            }
            if (sourctData.chapterList && sourctData.chapterList.length > 0) {
                StoreUtil._getChapterList(listStore.bookId, sourctData.chapterList, (msgCode, data) => {
                    listStore.chapterList = data;
                    ChapterStatic.chapterList = Array.from(data);
                    ChapterStatic.bookId = listStore.bookId;
                    listStore.chapterCount = listStore.chapterList.length;
                    if (ChapterStatic.chapterList && ChapterStatic.chapterList.length > 0) {
                        ChapterTrueCount.chapterCount = ChapterStatic.chapterList.length;
                        // alert('设置新值 = ' + ChapterTrueCount.chapterCount)
                        ChapterTrueCount.bookId = listStore.bookId;
                    }
                    if (callBack) {
                        callBack(200, listStore)
                    }
                });
            }
            // return listStore;
        } else {
            if (callBack) {
                callBack(100, '数据源错误')
            }
        }
        // } else {
        //     return;
        // }
        // // console.log('jsong数据 =' + JSON.stringify(sourctData));
    }

    static _getChapterList(bookId, chapterList, callBack) {
        let newChapterList = [];
        if (chapterList && chapterList.length > 0) {
            CatchSqlLiteUtil.queueCatchByBookId(bookId, (msgCode, data) => {
                if (msgCode === 200 && data) {
                    newChapterList = chapterList.map((item, index) => {
                        let chapterBean = new ChapterListBean();
                        if (data.has(bookId + 'a' + (index + 1)) && data.get(bookId + 'a' + (index + 1)).catchState === 200) {
                            chapterBean.catchState = 2;
                        } else {
                            chapterBean.catchState = 0;
                        }
                        chapterBean.chapterId = item.id;
                        chapterBean.chapterOrder = item.chapterOrder;
                        chapterBean.readState = 0;
                        chapterBean.chapterName = StoreUtil._formatName(item.chapterName, item.chapterOrder);
                        // console.log('缓存查询解析完成 = ' + JSON.stringify(chapterBean))
                        return chapterBean;
                    })
                } else {
                    newChapterList = chapterList.map((item, index) => {
                        let chapterBean = new ChapterListBean();
                        chapterBean.catchState = 0;
                        chapterBean.chapterId = item.id;
                        chapterBean.chapterOrder = item.chapterOrder;
                        chapterBean.readState = 0;
                        chapterBean.chapterName = StoreUtil._formatName(item.chapterName, item.chapterOrder);
                        // console.log('网络查询解析完成 = ' + JSON.stringify(chapterBean))
                        return chapterBean;
                    })
                }
                callBack(200, newChapterList);
            })
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