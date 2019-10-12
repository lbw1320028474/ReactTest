import { observable, computed, action } from 'mobx'
import MySorage from '../../../Utils/MyStore/MySorage'
import GlobleKey from '../../../Globle/GlobleKey'
/**
 * 小说列表数据
 */
export default class ReadLogStore {

    constructor() {
        let that = this;
        MySorage.loadByDefault(GlobleKey.KeyReadLogData, -1, (data) => {
            if (data && data !== -1) {
                if (data.length > 0) {
                    that.readLogList = data;
                }
            }
        })
    }


    @observable
    readLogList = [];


    @action
    addLogBean(logBean) {
        if (logBean && logBean != null && logBean.bookId != '') {


            // @observable
            // bookId = '';

            // @observable
            // bookName = '';

            // @observable
            // bookCoverUrl = '';

            // @observable
            // bookAuthor = '';

            // @observable
            // lastReadTime = '';

            // @observable
            // lastReadChapterId = '';

            // @observable
            // lastReadChapterName = '';

            // @observable
            // lastReadChapterOrder = '';

            // @observable
            // lastReadPage = '';

            try {
                for (let i = 0; i < this.readLogList.length; i++) {
                    if (this.readLogList[i].bookId + '' == logBean.bookId + '' || this.readLogList[i].bookName + '' == logBean.bookName + '' || this.readLogList[i] == logBean) {
                        this.readLogList.splice(i, 1);
                        break;
                    }
                }
                console.log("开始添加记录");
                this.readLogList.unshift(logBean);
                if (this.readLogList.length > 100) {
                    this.readLogList.pop();
                }
                // for (let i = 0; i < this.readLogList.length; ++i) {
                //     if(this.readLogList[i].bookName == )
                // }
                MySorage._sava(GlobleKey.KeyReadLogData, this.readLogList);
                console.log("添加记录完成");
            } catch (error) {

            }
        }
    }

    @action
    cleanLogBean() {
        this.readLogList = [];
        MySorage._remove(GlobleKey.KeyReadLogData);
    }

    /**
     * 判断是否是书包的书
     */
    resetIsPag(bookcaseList) {
        if (bookcaseList && bookcaseList != null && bookcaseList.length > 0 && this.readLogList && this.readLogList.length > 0) {
            let logMap = new Map();
            for (let i = 0; i < bookcaseList.length; ++i) {
                logMap.set('id' + bookcaseList[i].bookId, 1);
            }
            for (let i = 0; i < this.readLogList.length; ++i) {
                if (logMap.get('id' + this.readLogList[i].bookId) == 1) {
                    this.readLogList[i].isPagBook = 1;
                } else {
                    this.readLogList[i].isPagBook = 0;
                }
            }
            MySorage._sava(GlobleKey.KeyReadLogData, this.readLogList);
        } else {
            if (this.readLogList && this.readLogList.length > 0) {
                for (let i = 0; i < this.readLogList.length; ++i) {
                    this.readLogList[i].isPagBook = 0;
                }
                MySorage._sava(GlobleKey.KeyReadLogData, this.readLogList);
            }
        }
    }

}



