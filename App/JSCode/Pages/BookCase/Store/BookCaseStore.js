import { observable, computed, action } from 'mobx'
import BookCaseBean from './BookCaseBean'
import MySorage from '../../../Utils/MyStore/MySorage'
import GlobleKey from '../../../Globle/GlobleKey';
/**
 * 整个App共享数据全部放在这里
 */
export default class BookCaseStore {
    constructor() {
        let that = this;
        MySorage.loadByDefault(GlobleKey.KeyBookCaseType, 1, (type) => {
            that.listType = type;
        })

        MySorage.loadByDefault(GlobleKey.UpdataData, -1, (data) => {
            if (data && data != -1) {
                that.updateList = data;
            }
        })
    }

    @observable
    listType = 1;       //0：封面模式， 1：列表模式

    @observable
    bookCaseList = [];      //图书列表,对象是BookCaseBean

    updateList = [];        //更新记录列表数据
    // bookId = '';    
    // nowChapterOrder = 1;    //最后一次更新的章节
    @action
    addNewUpdataBean(updataBean) {
        if (updataBean && updataBean != null && updataBean.bookId && updataBean.nowChapterOrder) {
            if (this.updateList) {

            } else {
                this.updateList = [];
            }
            for (let i = 0; i < this.updateList.length; ++i) {
                if (this.updateList[i].bookId == updataBean.bookId) {
                    this.updateList.splice(i, 1);
                    break;
                }
            }
            for (let i = 0; i < this.bookCaseList.length; ++i) {
                if (this.bookCaseList[i].bookId + '' == updataBean.bookId + '') {
                    this.bookCaseList[i].hasNewChapter = false;
                    break;
                }
            }
            this.updateList.push(updataBean);
            MySorage._sava(GlobleKey.UpdataData, this.updateList);
        } else {
        }
    }

    @action
    addDefaultBean() {
        if (this.bookCaseList
            && this.bookCaseList != null
            && this.bookCaseList.length > 0) {
            try {
                if (this.updateList
                    && this.updateList != null
                    && this.updateList.length > 0) {
                    let upDataMap = new Map();
                    for (let i = 0; i < this.updateList.length; ++i) {
                        upDataMap.set('id' + this.updateList[i].bookId, this.updateList[i].nowChapterOrder + '1');
                    }
                    for (let i = 0; i < this.bookCaseList.length; ++i) {
                        if (this.bookCaseList[i].itemType == 0) {
                            if (upDataMap.get('id' + this.bookCaseList[i].bookId) && upDataMap.get('id' + this.bookCaseList[i].bookId) != null) {

                            } else {
                                // bookCaseStore.addNewUpdataBean({
                                //     bookId: itemData.bookId + '',
                                //     nowChapterOrder: itemData.lastChapterOrder + ''
                                //   })
                                this.updateList.push({
                                    bookId: this.bookCaseList[i].bookId + '',
                                    nowChapterOrder: this.bookCaseList[i].lastChapterOrder + ''
                                });
                            }
                        }
                    }
                } else {
                    for (let i = 0; i < this.bookCaseList.length; ++i) {
                        if (this.bookCaseList[i].itemType == 0) {
                            this.updateList.push({
                                bookId: this.bookCaseList[i].bookId + '',
                                nowChapterOrder: this.bookCaseList[i].lastChapterOrder + ''
                            });
                        }
                    }
                }
                console.log("添加更新书了");
                MySorage._sava(GlobleKey.UpdataData, this.updateList);
            } catch (error) {
                console.log("addDefaultBean error = " + error);
            }

        }
    }

    checkIsPagBook(id) {
        try {
            if (id && id != null) {
                if (this.bookCaseList && this.bookCaseList != null && this.bookCaseList.length > 0) {
                    for (let i = 0; i < this.bookCaseList.length; ++i) {
                        if (this.bookCaseList[i].bookId == id) {
                            return true;
                        }
                    }
                }
            }
        } catch (error) {
            console.log("判断错误");
        }

        return false;
    }


    @action
    setHaveNewChapter() {
        if (this.updateList
            && this.updateList != null
            && this.updateList.length > 0
            && this.bookCaseList
            && this.bookCaseList != null
            && this.bookCaseList.length > 0) {
            try {
                let upDataMap = new Map();
                for (let i = 0; i < this.updateList.length; ++i) {
                    upDataMap.set('id' + this.updateList[i].bookId, this.updateList[i].nowChapterOrder + '');
                }
                for (let i = 0; i < this.bookCaseList.length; ++i) {
                    if (upDataMap.get('id' + this.bookCaseList[i].bookId) && upDataMap.get('id' + this.bookCaseList[i].bookId) != null) {
                        if (this.bookCaseList[i].lastChapterOrder + '' != upDataMap.get('id' + this.bookCaseList[i].bookId)) {
                            this.bookCaseList[i].hasNewChapter = true;
                        }
                    }
                }
            } catch (error) {
            }

        }
    }
}



