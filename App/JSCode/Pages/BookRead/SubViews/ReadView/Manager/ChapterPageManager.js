import GlobleVar from '../../../../../Globle/GlobleVar'
import GlobleKey from '../../../../../Globle/GlobleKey'
import ObjUtil from '../../../../../Utils/ObjUtil'
import ChapterDataManager from './ChapterDataManager'
import PageData from './PageData'
import TextInfoStatic from '../Utils/TextInfoStatic'
import PageTextUtil from '../Utils/PageTextUtil'
import ChapterNameUtil from '../../../../../Utils/ChapterNameUtil'
// import EventBus from '../../../../../Utils/EventBus'
export default class ChapterPageManager {
    // static previewLoadPreTimer = null;
    // static previewLoadNextTimer = null;
    static textWidthInfo;       //常见字符宽度数据
    static prevData;        //上一章节
    static currentData;     //当前章节
    static nextData;        //下一章节


    // //由于字体大小改变等原因，重新计算分行、分页
    //(TextInfoStatic.textInfo, ChapterPageManager.currentData.chapterSections, textCount);
    static pageDataReDivide(textCount, lineHeight) {

        if (ChapterPageManager.currentData && ChapterPageManager.currentData.chapterData) {
            ChapterPageManager.currentData.chapterLines = PageTextUtil.textDivideLines(TextInfoStatic.textInfo, ChapterPageManager.currentData.chapterSections, textCount);
            //ChapterPageManager.currentData.chapterPages = PageTextUtil.textDividePages(ChapterPageManager.currentData.chapterLines)
            ChapterPageManager.currentData.chapterPages = PageTextUtil.textDividePages(ChapterPageManager.currentData.chapterData.chapterName, ChapterPageManager.currentData.chapterLines, lineHeight, ChapterPageManager.currentData.bookId, ChapterPageManager.currentData.chapterOrder)
        }
        if (ChapterPageManager.prevData && ChapterPageManager.prevData.chapterData) {
            ChapterPageManager.prevData.chapterLines = PageTextUtil.textDivideLines(TextInfoStatic.textInfo, ChapterPageManager.prevData.chapterSections, textCount);
            // ChapterPageManager.prevData.chapterPages = PageTextUtil.textDividePages(ChapterPageManager.prevData.chapterLines)
            ChapterPageManager.prevData.chapterPages = PageTextUtil.textDividePages(ChapterPageManager.prevData.chapterData.chapterName, ChapterPageManager.prevData.chapterLines, lineHeight, ChapterPageManager.prevData.bookId, ChapterPageManager.prevData.chapterOrder)
        }
        if (ChapterPageManager.nextData && ChapterPageManager.nextData.chapterData) {
            ChapterPageManager.nextData.chapterLines = PageTextUtil.textDivideLines(TextInfoStatic.textInfo, ChapterPageManager.nextData.chapterSections, textCount);
            // ChapterPageManager.nextData.chapterPages = PageTextUtil.textDividePages(ChapterPageManager.nextData.chapterLines)
            ChapterPageManager.nextData.chapterPages = PageTextUtil.textDividePages(ChapterPageManager.nextData.chapterData.chapterName, ChapterPageManager.nextData.chapterLines, lineHeight, ChapterPageManager.nextData.bookId, ChapterPageManager.nextData.chapterOrder)
        }
    }
    //(res.data.chapter.chapterName, ChapterPageManager.currentData.chapterLines, lineHeight, bookId, chapterOrder);
    //由于行高改变，重新计算分页(字体大小不变,所以不需要重新遍历字符)
    static pageDataReDividePage(lineHeight) {
        try {
            if (ChapterPageManager.currentData && ChapterPageManager.currentData.chapterData) {
                ChapterPageManager.currentData.chapterPages = PageTextUtil.textDividePages(ChapterPageManager.currentData.chapterData.chapterName, ChapterPageManager.currentData.chapterLines, lineHeight, ChapterPageManager.currentData.bookId, ChapterPageManager.currentData.chapterOrder)
            }
            if (ChapterPageManager.prevData && ChapterPageManager.prevData.chapterData) {
                ChapterPageManager.prevData.chapterPages = PageTextUtil.textDividePages(ChapterPageManager.prevData.chapterData.chapterName, ChapterPageManager.prevData.chapterLines, lineHeight, ChapterPageManager.prevData.bookId, ChapterPageManager.prevData.chapterOrder)
                // ChapterPageManager.prevData.chapterPages = PageTextUtil.textDividePages(ChapterPageManager.prevData.chapterLines, lineHeight)
            }
            if (ChapterPageManager.nextData && ChapterPageManager.nextData.chapterData) {
                ChapterPageManager.nextData.chapterPages = PageTextUtil.textDividePages(ChapterPageManager.nextData.chapterData.chapterName, ChapterPageManager.nextData.chapterLines, lineHeight, ChapterPageManager.nextData.bookId, ChapterPageManager.nextData.chapterOrder)
                // ChapterPageManager.nextData.chapterPages = PageTextUtil.textDividePages(ChapterPageManager.nextData.chapterLines, lineHeight)
            }

        } catch (error) {
            //console.log('重新分页错误' + error)
        }

    }

    //Data()
    // bookId;     //书ID
    // chapterData;      //数据
    // chapterOrder;   //章节序号
    // chapterSections;      //页数据分段
    // chapterLinex;//分页数据行s
    // chapterPages;//分页数据页
    // chapterViews;      //页组件
    /**
     * 
     * @param {*} bookId 
     * @param {*} chapterOrder 
     * @param {*} callBack {msgCode:0-正在加载， 1：成功,  2:失败,  errMsg:错误信息， data:pages}
     */
    static getPages(bookId, chapterOrder, textCount, lineHeight, callBack) {
        // if (!ObjUtil.objIsEmpty(ChapterPageManager.previewLoadPreTimer)) {
        //     clearInterval(ChapterPageManager.previewLoadPreTimer);
        // }
        // if (!ObjUtil.objIsEmpty(ChapterPageManager.previewLoadNextTimer)) {
        //     clearInterval(ChapterPageManager.previewLoadNextTimer);
        // }
        //try {
        if (ObjUtil.objIsEmpty(bookId) || ObjUtil.objIsEmpty(chapterOrder)) {
            callBack({ msgCode: 2, errMsg: '图书ID或章节id不存在' })
        } else {
            if (ChapterPageManager.currentData
                && ChapterPageManager.currentData.bookId === bookId
                && ChapterPageManager.currentData.chapterOrder === chapterOrder) {
                ChapterPageManager.currentData.chapterLines = PageTextUtil.textDivideLines(TextInfoStatic.textInfo, ChapterPageManager.currentData.chapterSections, textCount);
                ChapterPageManager.currentData.chapterPages = PageTextUtil.textDividePages(ChapterPageManager.currentData.chapterData.chapterName, ChapterPageManager.currentData.chapterLines, lineHeight, bookId, chapterOrder);
                ChapterPageManager.previewLoadNextChapter(bookId, chapterOrder + 1, textCount, lineHeight);    //预加载下一章
                ChapterPageManager.previewLoadPreChapter(bookId, chapterOrder - 1, textCount, lineHeight);    //预加载上一章 
                // EventBus.emit(GlobleKey.KEY_CHAPTERCOUNT_CHANGE_EVENT, { count: ChapterPageManager.currentData.chapterCount })
                callBack({ msgCode: 200 })
            } else if (ChapterPageManager.nextData
                && ChapterPageManager.nextData.bookId === bookId
                && ChapterPageManager.nextData.chapterOrder === chapterOrder) {

                ChapterPageManager.prevData = ChapterPageManager.currentData.copy();
                ChapterPageManager.currentData = ChapterPageManager.nextData.copy();

                ChapterPageManager.nextData = new PageData();        //空数据质为-1，标记为无效
                // ChapterPageManager.nextData.chapterOrder = -1;  //空数据质为-1，标记为无效
                ChapterPageManager.previewLoadNextChapter(bookId, chapterOrder + 1, textCount, lineHeight);        //预加载下一章
                // EventBus.emit(GlobleKey.KEY_CHAPTERCOUNT_CHANGE_EVENT, { count: ChapterPageManager.currentData.chapterCount })
                callBack({ msgCode: 200 })
            } else if (ChapterPageManager.prevData
                && ChapterPageManager.prevData.bookId === bookId
                && ChapterPageManager.prevData.chapterOrder === chapterOrder) {
                ChapterPageManager.nextData = ChapterPageManager.currentData.copy();
                ChapterPageManager.currentData = ChapterPageManager.prevData.copy();
                ChapterPageManager.prevDatad = new PageData();        //空数据质为-1，标记为无效
                //ChapterPageManager.prevData.chapterOrder = -1;  //空数据质为-1，标记为无效
                ChapterPageManager.previewLoadPreChapter(bookId, chapterOrder - 1, textCount, lineHeight);    //预加载上一章 
                // EventBus.emit(GlobleKey.KEY_CHAPTERCOUNT_CHANGE_EVENT, { count: ChapterPageManager.currentData.chapterCount })
                callBack({ msgCode: 200 })
            } else {
                ChapterDataManager.getChapterData(bookId, chapterOrder, (res) => {

                    if (!ObjUtil.objIsEmpty(res) && res.msgCode === 1 && res.data && res.data.chapter && res.data.chapter.chapterContent) {
                        // /**
                        //  * 格式化章节名称
                        //  */
                        // if (res.data.chapter.chapterName) {
                        //     res.data.chapter.chapterName = ChapterNameUtil.formatChapterName(res.data.chapter.chapterName, res.data.chapter.chapterOrder);
                        // }
                        ChapterPageManager.currentData = new PageData();
                        ChapterPageManager.currentData.bookId = bookId;
                        ChapterPageManager.currentData.chapterCount = res.data.count;
                        ChapterPageManager.currentData.chapterData = res.data.chapter;
                        ChapterPageManager.currentData.chapterUrl = res.data.chapter.chapterUrl;
                        ChapterPageManager.currentData.chapterOrder = chapterOrder;
                        // //console.log('获取到网络章节数据：' + JSON.stringify(ChapterPageManager.currentData))
                        ChapterPageManager.currentData.chapterSections = PageTextUtil.getSectionList(res.data.chapter.chapterContent);
                        ChapterPageManager.currentData.chapterLines = PageTextUtil.textDivideLines(TextInfoStatic.textInfo, ChapterPageManager.currentData.chapterSections, textCount);
                        ChapterPageManager.currentData.chapterPages = PageTextUtil.textDividePages(res.data.chapter.chapterName, ChapterPageManager.currentData.chapterLines, lineHeight, bookId, chapterOrder);
                        ChapterPageManager.previewLoadNextChapter(bookId, chapterOrder + 1, textCount, lineHeight);
                        // EventBus.emit(GlobleKey.KEY_CHAPTERCOUNT_CHANGE_EVENT, { count: ChapterPageManager.currentData.chapterCount })
                        callBack({ msgCode: 200 })
                    } else if (!ObjUtil.objIsEmpty(res) && res.msgCode === 0) {
                        callBack({ msgCode: 0 })
                    } else {
                        callBack({ msgCode: 2 });
                    }
                })
            }
        }
        // } catch (error) {
        //     //console.log('处理页面异常:' + error);
        // }
    }





    static previewLoadNextChapter(bookId, chapterOrder, textCount, lineHeight) {
        //console.log('预加载下一章：' + bookId + " + " + chapterOrder)
        if (ChapterPageManager.nextData && ChapterPageManager.nextData.bookId === bookId && ChapterPageManager.nextData.chapterOrder === chapterOrder) {
            ChapterPageManager.nextData.chapterLines = PageTextUtil.textDivideLines(TextInfoStatic.textInfo, ChapterPageManager.nextData.chapterSections, textCount);
            //textDividePages(chapterName, lines, lineHeight, bookId, chapterOrder) {        //对分行号的文本进行分页
            ChapterPageManager.nextData.chapterPages = PageTextUtil.textDividePages(ChapterPageManager.nextData.chapterData.chapterName, ChapterPageManager.nextData.chapterLines, lineHeight, bookId, chapterOrder)
            return;
        }
        // ChapterPageManager.previewLoadNextTimer = setInterval(      //2秒钟后开始预加载下一章
        //     () => {
        ChapterDataManager.getChapterData(bookId, chapterOrder, (res) => {
            if (!ObjUtil.objIsEmpty(res) && res.msgCode === 1 && res.data && res.data.chapter.chapterContent) {
                ChapterPageManager.nextData = new PageData();
                // /**
                //         * 格式化章节名称
                //         */
                // if (res.data.chapter.chapterName) {
                //     res.data.chapter.chapterName = ChapterNameUtil.formatChapterName(res.data.chapter.chapterName, res.data.chapter.chapterOrder);
                // }
                ChapterPageManager.nextData.bookId = bookId;
                ChapterPageManager.nextData.chapterCount = res.data.count;
                ChapterPageManager.nextData.chapterData = res.data.chapter;
                ChapterPageManager.nextData.chapterOrder = chapterOrder;
                ChapterPageManager.nextData.chapterUrl = res.data.chapter.chapterUrl;
                ChapterPageManager.nextData.chapterSections = PageTextUtil.getSectionList(res.data.chapter.chapterContent);
                ChapterPageManager.nextData.chapterLines = PageTextUtil.textDivideLines(TextInfoStatic.textInfo, ChapterPageManager.nextData.chapterSections, textCount);
                ChapterPageManager.nextData.chapterPages = PageTextUtil.textDividePages(res.data.chapter.chapterName, ChapterPageManager.nextData.chapterLines, lineHeight, bookId, chapterOrder)
            }
            // if (!ObjUtil.objIsEmpty(ChapterPageManager.previewLoadNextTimer)) {
            //     clearInterval(ChapterPageManager.previewLoadNextTimer);
            // }
        })
        //     },
        //     2000
        // )
    }

    static previewLoadPreChapter(bookId, chapterOrder, textCount, lineHeight) {
        if (ChapterPageManager.prevData && ChapterPageManager.prevData.bookId === bookId && ChapterPageManager.prevData.chapterOrder === chapterOrder) {
            // ChapterPageManager.prevData.chapterSections = PageTextUtil.getSectionList(ChapterPageManager.prevData.chapterData.chapterContent);
            // ChapterPageManager.prevData.chapterLines = PageTextUtil.textDivideLines(TextInfoStatic.textInfo, ChapterPageManager.prevData.chapterSections);
            // ChapterPageManager.prevData.chapterPages = PageTextUtil.textDividePages(ChapterPageManager.prevData.chapterLines)
            ChapterPageManager.prevData.chapterLines = PageTextUtil.textDivideLines(TextInfoStatic.textInfo, ChapterPageManager.prevData.chapterSections, textCount);
            //textDividePages(chapterName, lines, lineHeight, bookId, chapterOrder) {        //对分行号的文本进行分页
            ChapterPageManager.prevData.chapterPages = PageTextUtil.textDividePages(ChapterPageManager.prevData.chapterData.chapterName, ChapterPageManager.prevData.chapterLines, lineHeight, bookId, chapterOrder)
            return;
        }
        if (chapterOrder > 0) {
            // ChapterPageManager.previewLoadNextTimer = setInterval(      //2秒钟后开始预加载下一章
            //     () => {
            ChapterDataManager.getChapterData(bookId, chapterOrder, (res) => {
                if (!ObjUtil.objIsEmpty(res) && res.msgCode === 1 && res.data && res.data.chapter.chapterContent) {
                    ChapterPageManager.prevData = new PageData();
                    // /**
                    //     * 格式化章节名称
                    //     */
                    // if (res.data.chapter.chapterName) {
                    //     res.data.chapter.chapterName = ChapterNameUtil.formatChapterName(res.data.chapter.chapterName, res.data.chapter.chapterOrder);
                    // }
                    ChapterPageManager.prevData.bookId = bookId;
                    ChapterPageManager.prevData.chapterCount = res.data.count;
                    ChapterPageManager.prevData.chapterData = res.data.chapter;
                    ChapterPageManager.prevData.chapterUrl = res.data.chapter.chapterUrl;
                    ChapterPageManager.prevData.chapterOrder = chapterOrder;
                    ChapterPageManager.prevData.chapterSections = PageTextUtil.getSectionList(res.data.chapter.chapterContent);
                    ChapterPageManager.prevData.chapterLines = PageTextUtil.textDivideLines(TextInfoStatic.textInfo, ChapterPageManager.prevData.chapterSections, textCount);
                    //textDividePages(chapterName, lines, lineHeight, bookId, chapterOrder) {        //对分行号的文本进行分页
                    ChapterPageManager.prevData.chapterPages = PageTextUtil.textDividePages(res.data.chapter.chapterName, ChapterPageManager.prevData.chapterLines, lineHeight, bookId, chapterOrder)
                }
                // if (!ObjUtil.objIsEmpty(ChapterPageManager.previewLoadNextTimer)) {
                //     clearInterval(ChapterPageManager.previewLoadNextTimer);
                // }
            })
            //     },
            //     2000
            // )
        }
    }
}