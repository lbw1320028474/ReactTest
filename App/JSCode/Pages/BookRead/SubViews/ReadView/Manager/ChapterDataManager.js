import NetWorkUtil from '../../../../../Network/NetWorkUtil'
import GlobleVar from '../../../../../Globle/GlobleVar'
import GlobleUrl from '../../../../../Globle/GlobleUrl'
import GetChapterDetailRequest from '../../../../../Protocol/GetChapterDetailRequest'
import GetChapterDetailResponse from '../../../../../Protocol/GetChapterDetailResponse'
import NvlChapterInfo from '../../../../../Protocol/NvlChapterInfo'
// import ChapterListData from '../../BookRead/ChapterListData'
import ChapterNameUtil from '../../../../../Utils/ChapterNameUtil'
import CatchSqlLiteUtil from '../../../../../Catch/CatchSqlLiteUtil'
import CatchChapterBean from '../../../../../Catch/Bean/CatchChapterBean'
import ChapterTrueCount from './ChapterTrueCount'
import AppUseLog from '../../../../../Globle/AppUseLog'
import EventBus from '../../../../../Utils/EventBus'
import ChapterStatic from '../../../../ChapterList/Store/ChapterStatic'
import GlobleKey from '../../../../../Globle/GlobleKey';
export default class ChapterDataManager {
    static isShareded = false;




    static chapterDataMap = new Map();  //所有本次启动以来请求的章节数据,key值以bookId+chapterId

    /**
     * 
     * @param {*} bookId 
     * @param {*} chapterOrder 
     * @param {*} callBack {msgCode:0：正在请求，1，返回成功，errMsg:错误信息     2：返回失败   data:chapterData}
     */
    static getChapterData(bookId, chapterOrder, callBack) {

        if (AppUseLog.isShared == false) {
            if (AppUseLog.useBean && AppUseLog.useBean != null) {
                AppUseLog.readChapterCount += 1;
                if (AppUseLog.readChapterCount >= 50) {
                    EventBus.emit(GlobleKey.EVENT_SHARE_DIALOG);
                    AppUseLog.readChapterCount = 0;
                }
            }
        }
        if (AppUseLog.isGiviStart == false) {
            if (AppUseLog.starUseBean && AppUseLog.starUseBean != null) {
                AppUseLog.startReadChapterCount += 1;
                if (AppUseLog.startReadChapterCount >= 60) {
                    EventBus.emit(GlobleKey.EVENT_STAR_DIALOG);
                    AppUseLog.startReadChapterCount = 0;
                }
            }
        }
        // if (ChapterListData.dataBookId === bookId
        //     && ChapterListData.dataState === 1
        //     && ChapterListData.listData
        //     && ChapterListData.listData !== null
        //     && ChapterListData.listData.length > 0) {
        //     while(true){

        //     }
        // }

        // try {
        if (bookId && chapterOrder) {
            // //console.log('章节请求开始:' + bookId)
            if (ChapterDataManager.chapterDataMap.has('content_' + bookId + '_' + chapterOrder)) {
                console.log('有内存缓存，从内存读取，');
                let chapter = ChapterDataManager.chapterDataMap.get('content_' + bookId + '_' + chapterOrder);
                // ChapterDataManager.chapterDataMap.delete('content_' + bookId + '_' + chapterOrder);     //先删除然后下一步再插入，以便对数据的位置做调整，这是为了在数据量大时做清除做准备
                // ChapterDataManager.chapterDataMap.set('content_' + bookId + '_' + chapterOrder, chapter)
                ChapterDataManager.getTrueChapterCount(bookId, chapterOrder);
                callBack({ msgCode: 1, data: chapter })
            } else {
                CatchSqlLiteUtil.queryChapterBean(bookId, chapterOrder, (msgCode, data) => {
                    // alert(msgCode)
                    if (msgCode === 200 && data) {
                        console.log('有缓冲，从缓存数据库读取，' + JSON.stringify(data));
                        let chapterBean = new NvlChapterInfo();
                        chapterBean.bookId = data.bookId;
                        chapterBean.chapterContent = data.chapterContent;
                        chapterBean.chapterId = data.chapterId;
                        chapterBean.chapterName = data.chapterName;
                        chapterBean.chapterOrder = data.chapterOrder;
                        if (chapterBean.chapterName) {
                            chapterBean.chapterName = ChapterNameUtil.formatChapterName(chapterBean.chapterName, data.chapterOrder);
                        }
                        chapterBean.chapterUrl = data.chapterUrl;
                        chapterBean.id = data.id;
                        chapterBean.wordCount = data.wordCount;
                        //console.log('读取完成' + JSON.stringify(chapterBean))
                        let response = new GetChapterDetailResponse();
                        response.chapter = chapterBean;
                        response.count = chapterBean.wordCount;
                        if (ChapterTrueCount.chapterCount <= 0 || ((ChapterTrueCount.bookId + '') !== (bookId + ''))) {
                            ChapterTrueCount.bookId = bookId;
                            ChapterTrueCount.chapterCount = chapterBean.wordCount;
                        }
                        if (ChapterDataManager.chapterDataMap && ChapterDataManager.chapterDataMap !== null && ChapterDataManager.chapterDataMap.size > 10) {
                            ChapterDataManager.chapterDataMap.clear();
                        }
                        ChapterDataManager.chapterDataMap.set('content_' + bookId + '_' + chapterOrder, response);
                        ChapterDataManager.getTrueChapterCount(bookId, chapterOrder);
                        callBack({ msgCode: 1, data: response })
                    } else {
                        console.log('没有缓冲，从服务端读取');
                        callBack({ msgCode: 0 })
                        let chapterDetailRequest = new GetChapterDetailRequest();
                        chapterDetailRequest.bookId = bookId;
                        chapterDetailRequest.chapterOrder = chapterOrder;

                        NetWorkUtil.getJsonByPost(
                            GlobleUrl.URL_BASE_URL + GlobleUrl.URL_CHAPTER_INFO,
                            JSON.stringify(chapterDetailRequest),
                            (data) => {
                                if (data && data.msgCode === 200 && data.chapter) {
                                    try {
                                        if (ChapterStatic.chapterList && ChapterStatic.chapterList.length > 0 && ChapterStatic.bookId == bookId) {
                                            if (chapterOrder > 0 && chapterOrder <= ChapterStatic.chapterList.length) {
                                                let name = ChapterStatic.chapterList[chapterOrder - 1].chapterName;
                                                if (name && name !== null && name !== '') {
                                                    data.chapter.chapterName = ChapterNameUtil.formatChapterName(name, chapterOrder);
                                                } else {
                                                    if (data.chapter.chapterName) {
                                                        data.chapter.chapterName = ChapterNameUtil.formatChapterName(data.chapter.chapterName, chapterOrder);
                                                    }
                                                }
                                            } else {
                                                if (data.chapter.chapterName) {
                                                    data.chapter.chapterName = ChapterNameUtil.formatChapterName(data.chapter.chapterName, chapterOrder);
                                                }
                                            }
                                        } else if (data.chapter.chapterName) {
                                            if (data.chapter.chapterName) {
                                                data.chapter.chapterName = ChapterNameUtil.formatChapterName(data.chapter.chapterName, chapterOrder);
                                            }
                                        }
                                    } catch (error) {
                                        if (data.chapter.chapterName) {
                                            data.chapter.chapterName = ChapterNameUtil.formatChapterName(data.chapter.chapterName, chapterOrder);
                                        }
                                    }
                                    if (data.chapterContent && data.chapterContent.length > 0) {
                                        if (ChapterDataManager.chapterDataMap && ChapterDataManager.chapterDataMap !== null && ChapterDataManager.chapterDataMap.size > 10) {
                                            ChapterDataManager.chapterDataMap.clear();
                                        }
                                        ChapterDataManager.chapterDataMap.set('content_' + bookId + '_' + chapterOrder, data);
                                    }
                                    if (data.count) {
                                        if (ChapterTrueCount.chapterCount <= 0 || ((ChapterTrueCount.bookId + '') !== (bookId + ''))) {
                                            ChapterTrueCount.bookId = bookId;
                                            ChapterTrueCount.chapterCount = data.count;
                                        }

                                    }
                                    callBack({ msgCode: 1, data: data })
                                    // ChapterDataManager._getNextChapterData(bookId, chapterOrder + 1)
                                } else {
                                    callBack({ msgCode: 2, errMsg: '章节数据为空' })
                                }
                            },
                            (err) => {
                                callBack({ msgCode: 2, errMsg: '章节数据获取异常' })
                            }
                        )
                    }
                })




            }
        } else {
            //   //console.log('图书ID或章节ID不存在')
            callBack({ msgCode: 2, errMsg: '图书ID或章节ID不存在' })
        }
    }


    static getTrueChapterCount(bookId, chapterOrder) {
        if (bookId && chapterOrder) {
            if (ChapterTrueCount.bookId === bookId && ChapterTrueCount.chapterCount > 0) {
                //  //console.log('章节总数已经存在无需重新读取');
                return;
            } else {
                //  //console.log('开始读取章节总数');
                let chapterDetailRequest = new GetChapterDetailRequest();
                chapterDetailRequest.bookId = bookId;
                chapterDetailRequest.chapterOrder = chapterOrder;

                NetWorkUtil.getJsonByPost(
                    GlobleUrl.URL_BASE_URL + GlobleUrl.URL_CHAPTER_INFO,
                    JSON.stringify(chapterDetailRequest),
                    (data) => {
                        //  //console.log('章节请求结束:' + data.msgCode)
                        if (data && data.msgCode === 200 && data.chapter) {
                            //  //console.log('章节总数请求完成:' + JSON.stringify(data.count))
                            if (data.count) {
                                ChapterTrueCount.bookId = bookId;
                                ChapterTrueCount.chapterCount = data.count;
                            }
                        } else {
                        }
                    },
                    (err) => {
                    }
                )
            }
        }
    }

    // static loadData(bookId, chapterOrder, callBack) {

    // }
}