import GlobleVar from '../../../Globle/GlobleVar'
import GlobleUrl from '../../../Globle/GlobleUrl'
import GlobleKey from '../../../Globle/GlobleKey'
import NetWorkUtil from '../../../Network/NetWorkUtil'
import StringUtil from '../../../Utils/StringUtil'
import BookBagRequest from '../../../Protocol/BookBagRequest'
import MySorage from '../../../Utils/MyStore/MySorage'
import EventBus from '../../../Utils/EventBus'

//import PersonalPage from '../Personal/PersonalPage'
export default class BookCaseUtil {
    // static bagUpdataList = new Map();
    // static getBagUpdataData() {
    //     MySorage.loadByDefault('eee', -1, (data) => {
    //         // if (data && data !== -1) {
    //         //     BookCaseUtil.bagUpdataList = data;
    //         //     // alert(JSON.stringify(BookCaseUtil.bagUpdataList));
    //         // } else {
    //         //     //alert('没有记录')
    //         // }
    //     })
    //     // MySorage._load(GlobleKey.KeyBagUpdataData, (data) => {

    //     // })
    // }

    // static getIsNew(bookId, chapterOrder) {
    //     if (bookId && chapterOrder && chapterOrder > 0) {
    //         if (BookCaseUtil.bagUpdataList.has(bookId)) {
    //             let order = BookCaseUtil.bagUpdataList.get(bookId);
    //             if (chapterOrder > order) {
    //                 return true;
    //             } else {
    //                 return false;
    //             }
    //         } else {
    //             return false;
    //         }
    //     } else {
    //         return false;
    //     }
    // }


    // static setUpdataList(bookId, chapterOrder) {
    //     // if (bookId && chapterOrder) {
    //     //     alert(JSON.stringify(BookCaseUtil.bagUpdataList));
    //     //     BookCaseUtil.bagUpdataList.set(bookId, chapterOrder - 1);
    //     //     // alert('位置：' + JSON.stringify(BookCaseUtil.bagUpdataList));
    //     //     MySorage._sava3('eee', BookCaseUtil.bagUpdataList);
    //     //     // MySorage.loadByDefault('eee', -1, (data) => {
    //     //     //     if (data && data !== -1) {
    //     //     //         BookCaseUtil.bagUpdataList = data;
    //     //     //     } else {
    //     //     //         alert('没有记录')
    //     //     //     }
    //     //     // })
    //     // }

    // }


    //获取图书列表
    static getBookBagList(callBack, userId) {
        try {
            let bookBagRequest = new BookBagRequest();
            bookBagRequest.operateType = 0;
            bookBagRequest.userId = userId;
            NetWorkUtil.getJsonByPost(GlobleUrl.URL_BASE_URL + GlobleUrl.URL_BOOKBAG,
                JSON.stringify(bookBagRequest),
                (data) => {


                    if (data && data.msgCode === 200) {
                        if (callBack) {
                            callBack({ msgCode: 200, req: data })
                        }
                    } else {
                        if (data) {
                            callBack({ msgCode: 0, req: data })
                        } else {
                            callBack({ msgCode: 0, req: 'empty' })
                        }
                    }
                },
                (err) => {
                    if (callBack) {
                        callBack({ msgCode: 0, req: err })
                    }
                }
            )
        } catch (err1) {
            if (callBack) {
                callBack({ msgCode: 0, req: err1 })
            }
        }
    }

    //书包图书操作
    /**
     * 
     * @param {*} bookId 
     * @param {*} userId 
     * @param {*} operType 0:获取书包；1：加书；2：删书；3：置顶, 4:非手动置顶
     * @param {*} callBack 
     */
    static bookMenuBagAction(bookId, userId, operType = 1, callBack) {
        try {
            if (bookId) {
                let bookBagRequest = new BookBagRequest();
                bookBagRequest.userId = userId;
                bookBagRequest.operateType = operType;
                bookBagRequest.listId = bookId;
                console.log("书架操作：" + JSON.stringify(bookBagRequest));
                NetWorkUtil.getJsonByPost(GlobleUrl.URL_BASE_URL + GlobleUrl.URL_BOOKBAG,
                    JSON.stringify(bookBagRequest),
                    (data) => {
                        console.log("书架操作：完成");
                        if (data && data.msgCode === 200) {
                            if (callBack) {
                                callBack({ msgCode: 200, req: data });
                                console.log("书架操作：成功");
                                EventBus.emit(GlobleKey.EVENT_BOOKCASE_RELOAD);
                            }
                        } else {
                            if (data) {
                                if (callBack) {
                                    callBack({ msgCode: 0, req: data })
                                }
                            } else {
                                if (callBack) {
                                    callBack({ msgCode: 0, req: 'empty' })
                                }
                            }
                        }
                    },
                    (err) => {
                        if (callBack) {
                            callBack({ msgCode: 0, req: err })
                        }
                    }
                )
            } else {
                if (callBack) {
                    callBack({ msgCode: 0, req: '图书ID为空' })
                }
            }
        } catch (err1) {
            if (callBack) {
                callBack({ msgCode: 0, req: err1 })
            }
        }
    }


    //书包图书操作
    /**
     * 
     * @param {*} bookId 
     * @param {*} userId 
     * @param {*} operType 0:获取书包；1：加书；2：删书；3：置顶
     * @param {*} callBack 
     */
    static bookBagAction(bookId, userId, operType = 1, callBack) {
        try {
            if (bookId) {
                let bookBagRequest = new BookBagRequest();
                bookBagRequest.userId = userId;
                bookBagRequest.operateType = operType;
                bookBagRequest.bookId = bookId;
                // alert("书架操作：" + operType)
                NetWorkUtil.getJsonByPost(GlobleUrl.URL_BASE_URL + GlobleUrl.URL_BOOKBAG,
                    JSON.stringify(bookBagRequest),
                    (data) => {
                        if (data && data.msgCode === 200) {
                            // alert("书架操作：完成：" + operType)
                            if (callBack) {
                                callBack({ msgCode: 200, req: data });
                                EventBus.emit(GlobleKey.EVENT_BOOKCASE_RELOAD);
                            }
                        } else {
                            if (data) {
                                if (callBack) {
                                    callBack({ msgCode: 0, req: data })
                                }
                            } else {
                                if (callBack) {
                                    callBack({ msgCode: 0, req: 'empty' })
                                }
                            }
                        }
                    },
                    (err) => {
                        if (callBack) {
                            callBack({ msgCode: 0, req: err })
                        }
                    }
                )
            } else {
                if (callBack) {
                    callBack({ msgCode: 0, req: '图书ID为空' })
                }
            }
        } catch (err1) {
            if (callBack) {
                callBack({ msgCode: 0, req: err1 })
            }
        }
    }
}