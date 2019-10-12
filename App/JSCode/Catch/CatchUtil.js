import CatchSqlLiteUtil from './CatchSqlLiteUtil'
import CatchDataManager from './CatchDataManager'
import NetWorkUtil from '../Network/NetWorkUtil'
import CatchChapterBean from './Bean/CatchChapterBean'
import GlobleUrl from '../Globle/GlobleUrl'
import GetChapterDetailRequest from '../Protocol/GetChapterDetailRequest'
import ChapterDataManager from '../Pages/BookRead/SubViews/ReadView/Manager/ChapterDataManager';
import Toast from '../Components/teaset/components/Toast/Toast'
import EventBus from '../Utils/EventBus'
import GlobleKey from '../Globle/GlobleKey';
export default class CatchUtil {


    /**
     * 
     * @param {*} bookId 缓存的图书id 
     * @param {*} catchChapterList  缓存章节数据
     */
    static addToCatchQueue(bookId, catchChapterList) {
        if (bookId && catchChapterList && catchChapterList.length > 0) {
            CatchSqlLiteUtil.queueCatchByBookId(bookId, (msgCode, data) => {
                let insertCatchList = [];
                if (msgCode === 200 && data) {
                    for (let i = 0; i < catchChapterList.length; ++i) {
                        let item = catchChapterList[i];
                        // //console.log('条件 = ' + (!(CatchDataManager.allCatchQueue.has(bookId + 'a' + item.chapterOrder)) && item.catchState === 100));
                        if (!data.has(bookId + 'a' + item.chapterOrder)) {
                            //console.log('新纪录，bookId = ' + bookId + ', chapterOrder = ' + item.chapterOrder);
                            item.needInsertLog = 100;       //需要插入
                            insertCatchList.push(item);
                        } else {
                            let catchItem = data.get(bookId + 'a' + item.chapterOrder);
                            if (catchItem.catchState === 100 && (!(CatchDataManager.allCatchQueue.has(bookId + 'a' + item.chapterOrder)))) {
                                //console.log('重新缓存失败章节，bookId = ' + bookId + ', chapterOrder = ' + item.chapterOrder);
                                item.needInsertLog = 200;      //不需要插入
                                insertCatchList.push(item);
                            }
                        }
                    }
                    if (insertCatchList.length <= 0) {
                        Toast.message('缓存已经存在，无需重新缓存', 'long', 'center');
                    }
                } else if (msgCode === 203) {
                    insertCatchList = catchChapterList;
                    //console.log('全新纪录，全部入库')
                } else {
                    return;
                }
                if (insertCatchList.length > 0) {
                    CatchSqlLiteUtil.insertChapterList(bookId, insertCatchList);
                    CatchUtil._addToQueue(bookId, insertCatchList)
                } else {
                    //console.log('无新纪录，无需入库')
                }
            })
        }
    }

    static _addToQueue(bookId, catchList) {
        if (bookId && catchList && catchList.length > 0) {

        } else {
            //console.log('加入到缓存队列失败， bookId == null 或者 catchList == null 或者 catchList.length <= 0')
            return;
        }

        if (CatchDataManager.allCatchMap) {
        } else {
            CatchDataManager.allCatchMap = new Map();
        }
        // let newBookQueue;
        if (CatchDataManager.allCatchMap.has(bookId + '')) {
            // newBookQueue = CatchDataManager.allCatchMap.get(bookId);
        } else {
            let newBookMap = new Map();
            CatchDataManager.allCatchMap.set(bookId + '', newBookMap);
        }
        if (CatchDataManager.allCatchQueue) {

        } else {
            CatchDataManager.allCatchQueue = new Map();
        }

        for (let i = 0; i < catchList.length; ++i) {
            let item = catchList[i];
            if (item.needCatch === 200) {
                CatchDataManager.allCatchMap.get(bookId + '').set(bookId + 'a' + item.chapterOrder, item);
                CatchDataManager.allCatchQueue.set(bookId + 'a' + item.chapterOrder, item);
            }
        }
        EventBus.emit(GlobleKey.EVENT_CATCH_CHANGED, { bookId: bookId })
        CatchUtil._toCatch();
    }
    /**
     * 处理失败章节
     */
    static _detilWidthErr(bookId, chapterOrder) {
        try {
            if (bookId && chapterOrder) {
                // console.log('错误1')
                if (CatchDataManager.allCatchQueue && CatchDataManager.allCatchQueue.size <= 0) {
                    // console.log('错误2')

                    EventBus.emit(GlobleKey.EVENT_CATCH_CHANGED, { bookId: bookId })
                }
                // console.log('错误3')
                /**
                 * 不要好奇map的key值为啥加个a字母，这里只是为了让bookId和chapterOrder分隔开而加的分割字母，由于js中的map的视乎值不能存在下划线（好像在哪里看到过这么说的我不冒险也没时间去试所以就先按照这样做了）
                 */
                if (CatchDataManager.allCatchQueue.has(bookId + 'a' + chapterOrder)) {
                    // console.log('错误4')
                    let item = CatchDataManager.allCatchQueue.get(bookId + 'a' + chapterOrder);
                    // console.log('错误5')
                    if (item && item.errTimes > 3) {        //累计错误超过三次，移出缓存队列
                        // console.log('错误6')
                        CatchDataManager.allCatchQueue.delete(bookId + 'a' + chapterOrder);
                        // console.log('错误7')
                        if (CatchDataManager.allCatchMap.has(bookId + '')) {
                            // console.log('错误8')
                            CatchDataManager.allCatchMap.get(bookId + '').delete(bookId + 'a' + chapterOrder);
                            if (CatchDataManager.allCatchMap.get(bookId + '').size <= 0) {
                                EventBus.emit(GlobleKey.EVENT_CATCH_CHANGED, { bookId: bookId })
                            }
                        }
                    } else if (item) {
                        // console.log('错误9')
                        item.errTimes += 1; //错误次数+1，
                        // console.log('错误10')
                        CatchDataManager.allCatchQueue.delete(bookId + 'a' + chapterOrder);
                        // console.log('错误11')
                        CatchDataManager.allCatchQueue.set(bookId + 'a' + chapterOrder, item);
                        // console.log('错误12')
                    }
                    // console.log('错误13')
                } else {
                    // console.log('错误14')
                    EventBus.emit(GlobleKey.EVENT_CATCH_CHANGED, { bookId: bookId })
                }
            }
            CatchDataManager.catchIsOver = true;
            CatchUtil._toCatch();   //处理完异常后继续缓存任务
        } catch (error) {

        }
    }

    /**
     * 开始请求缓存数据
     */
    static _toCatch() {
        if (CatchDataManager.allCatchQueue && CatchDataManager.allCatchQueue.size > 0) {
            if (CatchDataManager.catchIsOver) {
                CatchDataManager.catchIsOver = false;
                var promise = new Promise((resolve, reject) => {   //这里是异步处理方法
                    // while (CatchDataManager.allCatchQueue.size > 0) {
                    // let key = CatchDataManager.allCatchQueue.keys[0];
                    // //console.log('key = ' + JSON.stringify(CatchDataManager.allCatchQueue.keys))
                    let mapKey
                    let mapValue;
                    // CatchDataManager.allCatchQueue.map((value, index) => {
                    //     //console.log('value = ' + value + ', key = ' + index);
                    //     break;
                    // })

                    // // }
                    for (var map of CatchDataManager.allCatchQueue) { // 遍历Map
                        mapKey = map[0];
                        mapValue = map[1];
                        //console.log('mapKey = ' + mapKey + ', bookId = ' + mapValue.bookId + ', chapterOrder = ' + mapValue.chapterOrder)
                        break;
                    }
                    // let item = CatchDataManager.allCatchQueue.get(key);
                    let chapterDetailRequest = new GetChapterDetailRequest();
                    chapterDetailRequest.bookId = mapValue.bookId;
                    chapterDetailRequest.chapterOrder = mapValue.chapterOrder;
                    //console.log('CatchDataManager.allCatchQueue.size = ' + CatchDataManager.allCatchQueue.size + ', bookId = ' + mapValue.bookId + ', chapterOrder = ' + mapValue.chapterOrder)
                    NetWorkUtil.getJsonByPost(
                        GlobleUrl.URL_BASE_URL + GlobleUrl.URL_CHAPTER_INFO,
                        JSON.stringify(chapterDetailRequest),
                        (data) => {
                            //console.log('章节请求结束:' + data.msgCode)
                            if (data && data.msgCode === 200 && data.chapter) {
                                let newBean = new CatchChapterBean();
                                if (data.chapter.id) {
                                    newBean.chapterId = data.chapter.id + '';
                                }
                                if (data.chapter.bookId) {
                                    newBean.bookId = data.chapter.bookId + '';
                                }
                                if (data.chapter.chapterOrder) {
                                    newBean.chapterOrder = data.chapter.chapterOrder;
                                }
                                if (data.chapter.chapterContent && data.chapter.chapterContent.length > 0) {
                                    newBean.chapterContent = data.chapter.chapterContent + '';
                                    newBean.catchState = 200;
                                }
                                if (data.chapter.chapterUrl) {
                                    newBean.chapterUrl = data.chapter.chapterUrl + '';
                                }
                                if (data.count) {
                                    newBean.wordCount = data.count;
                                }
                                if (data.chapter.chapterName) {
                                    newBean.chapterName = data.chapter.chapterName + '';
                                }
                                if (newBean.catchState === 200 && newBean.wordCount > 0) {
                                    CatchSqlLiteUtil.updataChapterBean(newBean, (msgCode) => {
                                        if (msgCode === 200) {
                                            //console.log('章节缓存请求完成:' + mapValue.bookId + ' + ' + mapValue.chapterOrder + ' + chapterContent = ' + data.chapter.chapterContent.length + ' + ' + data.chapter.chapterName);
                                            CatchDataManager.allCatchQueue.delete(mapKey);
                                            if (CatchDataManager.allCatchMap.has(mapValue.bookId + '')) {
                                                CatchDataManager.allCatchMap.get(mapValue.bookId + '').delete(mapValue.bookId + 'a' + mapValue.chapterOrder);
                                            }
                                            //console.log('队列剩余大小:' + CatchDataManager.allCatchQueue.size);
                                            CatchDataManager.catchIsOver = true;
                                            /**
                                             * 发送出缓存数据变化的通知
                                             */
                                            EventBus.emit(GlobleKey.EVENT_CATCH_CHANGED, { bookId: mapValue.bookId, chapterOrder: mapValue.chapterOrder })
                                            CatchUtil._toCatch();
                                        } else {
                                            CatchUtil._detilWidthErr(mapValue.bookId, mapValue.chapterOrder)
                                        }
                                    })
                                } else {
                                    CatchUtil._detilWidthErr(mapValue.bookId, mapValue.chapterOrder)
                                }
                            } else {
                                // callBack({ msgCode: 2, errMsg: '章节数据为空' })
                                //console.log('章节缓存请求失败: msgCode ！= 200');
                                CatchUtil._detilWidthErr(mapValue.bookId, mapValue.chapterOrder)
                                // CatchDataManager.catchIsOver = true;
                            }
                        },
                        (err) => {
                            // // callBack({ msgCode: 2, errMsg: '章节数据获取异常' })
                            //console.log('章节缓存请求失败:' + JSON.stringify(err));
                            // CatchDataManager.catchIsOver = true;
                            CatchUtil._detilWidthErr(mapValue.bookId, mapValue.chapterOrder)
                        }
                    )
                    // }
                });
                //console.log('Promise结束');
            } else {
                //console.log('缓存任务正在进行，无需重新创建缓存线程');
            }
        } else {
            CatchDataManager.catchIsOver = true;
        }
    }
}   