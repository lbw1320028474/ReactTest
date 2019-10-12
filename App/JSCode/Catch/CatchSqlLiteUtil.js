

import React, { Component } from 'react';
import SQLiteStorage from 'react-native-sqlite-storage';
import NvlChapterInfo from '../Protocol/NvlChapterInfo'
import CatchChapterBean from './Bean/CatchChapterBean'
import ChapterListBean from '../Pages/ChapterList/Store/ChapterListBean'
SQLiteStorage.DEBUG(true);
var database_name = "YYNovel.db";//数据库文件  
var database_version = "1.0";//版本号  
var database_displayname = "YYNovel";

var database_size = -1;//-1应该是表示无限制  
var db;
export default class CatchSqlLiteUtil {
    static open() {
        db = SQLiteStorage.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
            () => {
                ////console.log('数据库打开成功')
            },
            (err) => {
                if (err) {
                    ////console.log('YYNovel数据库打开失败，' + JSON.stringify(err));
                } else {
                    ////console.log('YYNovel数据库打开失败, 未知异常');
                }
            });
        return db;
    }

    static close() {
        try {
            if (db) {
                db.close();
                ////console.log("YYNovel数据库关闭成功");
            } else {
                ////console.log("YYNovel数据库无需关闭");
            }
            db = null;
        } catch (err) {
            ////console.log("YYNovel数据库关闭异常，" + err);
        }
    }

    static queryChapterBean(bookId, chapterOrder, callBack) {
        try {
            //查询  
            if (!db || db === null) {
                CatchSqlLiteUtil.open();
            }
            bookId = bookId + '';
            // alert('type = ' + (typeof bookId))
            db.transaction((tx) => {
                tx.executeSql("select * from ChapterCatch where book_id=? and chapter_order=? and catch_state=?", [bookId, chapterOrder, 200], (tx, results) => {
                    if (results && results !== null) {
                        var len = results.rows.length;
                        if (len <= 0) {
                            callBack(203, '查询完成,无记录');
                        } else if (len > 0) {
                            var item = results.rows.item(0);
                            let catchBean = new CatchChapterBean();
                            catchBean.bookId = item.book_id;
                            catchBean.catchState = item.catch_state;
                            catchBean.chapterContent = item.chapter_content;
                            catchBean.chapterId = item.chapter_id;
                            catchBean.chapterName = item.chapter_name;
                            catchBean.chapterOrder = item.chapter_order;
                            catchBean.chapterUrl = item.chapter_url;
                            catchBean.wordCount = item.chapter_count;

                            if (catchBean.chapterContent && catchBean.chapterContent.length > 0) {
                                callBack(200, catchBean);
                            } else {
                                callBack(206, '有缓存但无内容');
                            }
                        } else {
                            callBack(205, '查询失败，未知错误');
                        }
                    } else {
                        if (callBack) {
                            callBack(204, '查询结果为null');
                        }
                    }

                }, (err) => {

                });
            }, (error) => {//打印异常信息  
                if (callBack) {
                    callBack(201, '查询异常1');
                }
            });
        } catch (error) {
            if (callBack) {
                callBack(202, '查询异常2' + error);
            }
        }
    }

    static updataChapterBean(chapterBean, callBack) {
        try {
            if (chapterBean) {
                if (!db || db === null) {
                    CatchSqlLiteUtil.open();
                }
                let updataSql = "UPDATE ChapterCatch SET chapter_id=?,chapter_url=?,catch_state=?,chapter_content=?,chapter_count=? where book_id=? and chapter_order=?"
                // let createIndexSqlStr = 'CREATE INDEX IF NOT EXISTS ChapterCatchIndex ON ChapterCatch ( book_id, chapter_id, chapter_order, catch_state)';
                // //创建用户表  
                db.transaction((tx) => {
                    tx.executeSql(updataSql, [chapterBean.chapterId, chapterBean.chapterUrl, chapterBean.catchState, chapterBean.chapterContent, chapterBean.wordCount, chapterBean.bookId + '', chapterBean.chapterOrder], (tx, results) => {
                        //{"rows":{"length":0},"rowsAffected":1}    //如果更新成功，数据结构会是这样的，rowsAffected:1
                        //console.log('缓存数据库更新成功 = ' + JSON.stringify(results));

                        callBack(200);
                    }, (err) => {
                        ////console.log('更新失败')

                        callBack(201);
                    });
                }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。  
                    callBack(203);
                }, () => {
                    // callBack(204);
                })
            } else {
                callBack(206);
            }
        } catch (error) {
            callBack(205);
        }
    }


    // id;//Long
    // chapterId;//String
    // bookId;//Long
    // chapterOrder;//int
    // chapterName;//String
    // wordCount;//Long
    // chapterUrl;//String
    // catchState = false;
    // chapterContent;//String
    static insertChapterList(bookId, chapterList) {
        //console.log('缓存记录开始插入该记录');
        if (chapterList && chapterList.length > 0 && bookId) {
            try {
                //console.log('缓存记录开始插入该记录1');
                if (!db || db === null) {
                    CatchSqlLiteUtil.open();
                }
                //console.log('缓存记录开始插入该记录2');
                let insertValueStr = '';
                let i = 0;
                let insertCount = 0;
                //console.log('缓存记录开始插入该记录3');
                for (i; i < chapterList.length; ++i) {
                    insertCount += 1;
                    let item = chapterList[i];
                    //console.log('缓存记录开始插入该记录 index = ' + i);
                    if (item.needInsertLog === 100) {
                        if (i === chapterList.length - 1 || insertCount === 200) {
                            insertValueStr = insertValueStr + "('" + bookId + "','" + item.chapterId + "'," + item.chapterOrder + ",'" + item.chapterName + "','" + item.chapterUrl + "','" + item.chapterContent + "'," + item.wordCount + ")";
                            let insertSql = "INSERT INTO ChapterCatch(book_id,chapter_id,chapter_order,chapter_name,chapter_url,chapter_content,chapter_count)" +
                                "values" + insertValueStr;
                            // console.log('缓存记录列表插入开始' + (new Date()).getTime());
                            db.transaction((tx) => {
                                tx.executeSql(insertSql, [], () => {
                                    // console.log('缓存记录列表插入成功' + (new Date()).getTime());
                                    // alert('缓存记录列表插入成功，' + JSON.stringify(err))

                                }, (err) => {

                                    // console.log('缓存记录列表插入失败，' + JSON.stringify(err));
                                    // alert('缓存记录列表插入失败，' + JSON.stringify(err))
                                });
                            }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。  
                                // console.log('缓存记录列表事务创建失败' + err);
                                // alert('缓存记录列表事务创失败' + err);
                            }, () => {
                                // console.log('缓存记录列表事务创建成功');
                            })
                            insertCount = 0;
                            insertValueStr = '';

                        } else {
                            insertValueStr = insertValueStr + "('" + bookId + "','" + item.chapterId + "'," + item.chapterOrder + ",'" + item.chapterName + "','" + item.chapterUrl + "','" + item.chapterContent + "'," + item.wordCount + "),";
                        }
                    } else {
                        // console.log('缓存记录无需插入该记录，已存在');
                    }
                    // if (insertCount === 200 || i === chapterList.length - 1) {

                    // }

                    ////console.log('插入记录 ；' + i + ', item.chapterOrder = ' + item.chapterOrder + ' + item.chapterName = ' + item.chapterName);
                }

            } catch (error) {
                // console.log('缓存章节记录列表插入异常，' + error);
            }
        } else {
            // console.log('不符合条件' + chapterList.length + ' + ' + bookId)
            // alert(chapterList.length + ' + ' + bookId)
        }
    }


    static cleanCatch(callBack) {
        try {
            if (!db || db === null) {
                CatchSqlLiteUtil.open();
            }
            //查询  
            db.transaction((tx) => {
                tx.executeSql("DELETE FROM ChapterCatch", [], (back) => {
                    callBack(200, '删除成功');
                }, (err) => {

                    callBack(201, '删除失败' + err);
                });
            }, (error) => {//打印异常信息  
                callBack(203, '删除失败' + error);
            });
        } catch (error) {
            if (callBack) {
                callBack(202, '异常,' + error);
            }
        }
    }

    static queryCatchSize(callBack) {
        try {
            if (!db || db === null) {
                CatchSqlLiteUtil.open();
            }
            db.transaction((tx) => {
                tx.executeSql("select count(_id) total from ChapterCatch where catch_state=200", [], (tx, results) => {
                    if (results && results !== null) {
                        var len = results.rows.length;
                        if (len <= 0) {
                            callBack(203, '查询完成,无记录');
                        } else {
                            let size = results.rows.item(0).total;
                            callBack(200, size);
                        }
                    } else {
                        if (callBack) {
                            callBack(204, '查询结果为null');
                        }
                    }

                }, (err) => {

                });
            }, (error) => {//打印异常信息  
                if (callBack) {
                    callBack(201, '查询异常,' + error);
                }
            });
        } catch (error) {
            if (callBack) {
                callBack(202, '查询异常,' + error);
            }
        }
    }


    static queueChapterListByBookId(bookId, callBack) {
        ////console.log('开始查询章节列表');
        try {
            ////console.log('开始查询章节列表1');
            if (!db || db === null) {
                CatchSqlLiteUtil.open();
            }
            ////console.log('开始查询章节列表2');
            db.transaction((tx) => {
                tx.executeSql("select * from ChapterCatch where book_id='" + bookId + "' ORDER BY chapter_order", [], (tx, results) => {
                    ////console.log('开始查询章节列表3');
                    if (results && results !== null) {
                        var len = results.rows.length;
                        if (len <= 0) {
                            ////console.log('开始查询章节列表4');
                            callBack(203, '查询完成,无记录');
                        } else {
                            ////console.log('开始查询章节列表5 size = ' + len);
                            try {
                                let catchListBean = [];
                                for (let i = 0; i < len; i++) {
                                    var item = results.rows.item(i);
                                    let catchBean = new ChapterListBean();
                                    // catchBean.bookId = item.book_id;
                                    // catchBean.catchState = item.catch_state;
                                    // catchBean.chapterContent = item.chapter_content;
                                    // catchBean.chapterId = item.chapter_id;
                                    // catchBean.chapterName = item.chapter_name;
                                    // catchBean.chapterOrder = item.chapter_order;
                                    // catchBean.chapterUrl = item.chapter_url;
                                    // catchBean.wordCount = item.chapter_count;
                                    catchBean.chapterId = item.chapter_id;
                                    catchBean.chapterName = item.chapter_name;
                                    catchBean.chapterOrder = item.chapter_order;
                                    if (i < 100) {
                                        ////console.log(item.catch_state + ' + ' + (item.catch_state === 200))
                                    }
                                    if (item.catch_state === 200) {
                                        catchBean.catchState = 2;
                                    }

                                    ////console.log('查询结果 ；' + i + ' = ' + "catchBean.catchState ：" + catchBean.catchState + "catchBean.chapterName = " + catchBean.chapterName + "，catchBean.chapterOrder ：" + catchBean.chapterOrder + ', item.chapter_count:' + item.chapter_count);
                                    catchListBean.push(catchBean);
                                }
                                ////console.log('开始查询章节列表6');
                                callBack(200, catchListBean);
                            } catch (error) {
                                ////console.log('开始查询章节列表异常 = ' + error)
                            }

                        }
                    } else {
                        ////console.log('开始查询章节列表7');
                        if (callBack) {
                            callBack(204, '查询结果为null');
                        }
                    }

                }, () => {

                });
            }, (error) => {//打印异常信息  
                ////console.log('开始查询章节列表8');
                ////console.log(201 + '查询异常,' + error)
                if (callBack) {
                    callBack(201, '查询异常,' + error);
                }
            });
        } catch (error) {
            ////console.log('开始查询章节列表9');
            ////console.log('查询异常,' + error)
            if (callBack) {
                callBack(202, '查询异常,' + error);
            }
        }
    }


    static queueCatchByBookId(bookId, callBack) {
        try {
            if (!db || db === null) {
                CatchSqlLiteUtil.open();
            }
            db.transaction((tx) => {
                tx.executeSql("select * from ChapterCatch where book_id='" + bookId + "'", [], (tx, results) => {
                    if (results && results !== null) {
                        var len = results.rows.length;
                        if (len <= 0) {
                            callBack(203, '查询完成,无记录');
                        } else {
                            let catchListBean = new Map();
                            for (let i = 0; i < len; i++) {
                                var item = results.rows.item(i);
                                let catchBean = new CatchChapterBean();
                                catchBean.bookId = item.book_id;
                                catchBean.catchState = item.catch_state;
                                catchBean.chapterContent = item.chapter_content;
                                catchBean.chapterId = item.chapter_id;
                                catchBean.chapterName = item.chapter_name;
                                catchBean.chapterOrder = item.chapter_order;
                                catchBean.chapterUrl = item.chapter_url;
                                catchBean.wordCount = item.chapter_count;
                                ////console.log('查询结果；' + "catchBean.catchState ：" + catchBean.catchState + "，catchBean.chapterOrder ：" + catchBean.chapterOrder + ', item.chapter_count:' + item.chapter_count);
                                catchListBean.set(catchBean.bookId + 'a' + catchBean.chapterOrder, catchBean);
                            }
                            callBack(200, catchListBean);
                        }
                    } else {
                        if (callBack) {
                            callBack(204, '查询结果为null');
                        }
                    }

                }, () => {

                });
            }, (error) => {//打印异常信息  
                if (callBack) {
                    callBack(201, '查询异常,' + error);
                }
            });
        } catch (error) {
            if (callBack) {
                callBack(202, '查询异常,' + error);
            }
        }
    }

    static deleteTab() {
        try {
            //查询  
            db.transaction((tx) => {
                tx.executeSql("DROP TABLE ChapterCatch", [], (back) => {
                    ////console.log('删除完成 = ');
                }, (err) => {
                    ////console.log('删除异常1 = ' + JSON.stringify(err));
                });

            }, (error) => {//打印异常信息  
                ////console.log('删除异常2 = ' + JSON.stringify(error));

            });
        } catch (error) {

        }
    }

    static createTable() {
        try {
            if (!db || db === null) {
                CatchSqlLiteUtil.open();
            }
            let createTabSqlStr = 'CREATE TABLE IF NOT EXISTS ChapterCatch(_id INTEGER PRIMARY KEY AUTOINCREMENT, book_id VARCHAR NOT NULL, chapter_id VARCHAR, chapter_order INT NOT NULL, chapter_name TEXT, chapter_url TEXT, catch_state INT DEFAULT 100, chapter_content TEXT, chapter_count INT)'
            let createIndexSqlStr = 'CREATE INDEX IF NOT EXISTS ChapterCatchIndex ON ChapterCatch ( book_id, chapter_id, chapter_order, catch_state)';
            db.transaction((tx) => {
                tx.executeSql(createTabSqlStr, [], () => {
                    ////console.log('创建ChapterCatch表完成')
                }, (err) => {
                    ////console.log('创建ChapterCatch表失败' + err)
                });
                tx.executeSql(createIndexSqlStr, [], () => {
                    ////console.log('创建ChapterCatch表索引完成')
                }, (err) => {
                    ////console.log('创建ChapterCatch表索引完成')
                });
            }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。  
                ////console.log('创建事务失败，' + err)
            }, () => {
                ////console.log('创建事务完成')
            })
        } catch (error) {
            ////console.log('创建ChapterCatch表异常，' + error)
        }

    }
}   