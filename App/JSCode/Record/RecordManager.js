
/**
 * @author bangwen.lei
 */
import MySorage from '../Utils/MyStore/MySorage'
import GlobleKey from '../Globle/GlobleKey'
import GlobleVar from '../Globle/GlobleVar'
import GlobleUrl from '../Globle/GlobleUrl'
import storage from 'redux-persist/lib/storage'
import CommonRecordRequest from '../Protocol/CommonRecordRequest'
import NetWorkUtil from '../Network/NetWorkUtil'
export default class RecordManager {
    static recordManager;

    listLenLimit = 200;     //埋点本地记录最大条数，超过这个限制将删除旧数据
    uploadLenLimit = 5;     //埋点数据多余多少条时开始上传
    ploadTimeLimit = 10000;        //上传频率,10秒最多上传一次
    lastUploadTime = 0;        //上次上传时间
    tryUploadLimitTimes = 2;     //如果上传失败尝试次数
    tryingTimes = 2;     //剩余尝试次数,每试一次后-1
    isUploading = false;        //是否正在上传
    recordList = new Array();     //埋点数据列表
    tempRecordList = new Array();       //中转数组

    static getInstance() {
        let that = this;
        if (!RecordManager.recordManager) {
            RecordManager.recordManager = new RecordManager();
            RecordManager.recordManager.recordList = [];
        }
        MySorage.loadByDefault(GlobleKey.KeyRecordList, -1, (data) => {
            if (data && data !== -1) {
                RecordManager.recordManager.recordList = data;
            }
            // //console.log('读取埋点数据 = ' + JSON.stringify(RecordManager.recordManager.recordList))
        })
        return RecordManager.recordManager;
    }

    async record(recordInfo) {
        if (!recordInfo || recordInfo === null) {
            return;
        }
        if (this.isUploading) {
            this.tempRecordList.push(recordInfo);
            return;     //如果正在上传，先把埋点放到一个中转数组中，防止数据没有同步导致的漏传或者多传问题
        }
        if (!this.recordList || this.recordList === null) {
            this.recordList = new Array();
        }
        if (this.recordList.length >= this.listLenLimit) {
            this.recordList.splice(0, 1);
        }
        this.recordList.push(recordInfo);
        MySorage._sava(GlobleKey.KeyRecordList, this.recordList);   //每次都保存到本地
        //console.log('保存埋点数据')
        let curDate = new Date();
        if (this.recordList.length >= this.uploadLenLimit
            && (curDate.getTime() - this.lastUploadTime > this.ploadTimeLimit)) {
            this.tryUpload();
        }
    }

    cleanRecord() {
        MySorage._remove(GlobleKey.KeyRecordList);
        this.recordList.splice(0, this.recordList.length);
        if (this.tempRecordList && this.tempRecordList.length > 0) {
            this.recordList = this.tempRecordList.map((item, index) => {
                return item;
            })
            this.tempRecordList.splice(0, this.tempRecordList.length);
            MySorage._sava(GlobleKey.KeyRecordList, this.recordList);   //每次都保存到本地
        }
    }

    tryUpload() {
        if (this.recordList
            && this.recordList !== null
            && this.recordList.length > 0) {
            let that = this;
            let recordRequest = new CommonRecordRequest();
            recordRequest.commonRecordInfos = this.recordList;
            that.isUploading = true;
            console.log('上传埋点数据开始' + JSON.stringify(recordRequest))
            NetWorkUtil.getJsonByPost(
                GlobleUrl.URL_BASE_URL + GlobleUrl.URL_RECORD_LIST,
                JSON.stringify(recordRequest),
                (data) => {
                    //console.log('上传埋点数据 结束' + JSON.stringify(data))
                    if (data && data.msgCode === 200) {
                        that.cleanRecord();
                    }
                    that.isUploading = false;
                },
                (err) => {
                    //alert('上传错误' + err)
                    if (that.tryingTimes > 0) {
                        that.tryingTimes -= 1;
                        that.tryUpload();
                    } else {
                        that.tryingTimes = that.tryUploadLimitTimes;
                    }
                    that.isUploading = false;
                },
                90000
                //埋点比较特殊，
                //由于getJsonByPost方法是本地做的超时，
                //预防由于本地处理超时导致数据过了很久实际已经上传
                //了但是本地却没有清除导致的重复上传问题,所以超时时间设置得非常大
            )
        }
    }
}

