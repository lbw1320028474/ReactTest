
/**
 * @author bangwen.lei
 */
import RecordManager from './RecordManager'
import CommonRecordInfo from '../Protocol/CommonRecordInfo'
import ClickRecord from './ClickRecord'
import ShowRecord from './ShowRecord'
//nvlExt
export default class RecordUtil {
    //显示埋点
    static clickRecord(clickId, clickType, actionTime, nvlExt = '') {
        if (clickId && clickType && actionTime) {
            let recordInfo = new CommonRecordInfo();
            let recordMap = new ClickRecord();
            recordMap.nvlExt = nvlExt;
            recordMap.clickId = clickId + '';
            recordMap.clickType = clickType + '';
            recordMap.actionTime = actionTime + '';
            recordInfo.map = recordMap;
            recordInfo.recordType = 'nvlClickRecord';
            RecordManager.getInstance().record(recordInfo);
        }
    }

    //点击埋点
    static showRecord(showId, showType, actionTime, showTime = '0', pageView = '0') {
        if (showId && showType && actionTime) {
            let recordInfo = new CommonRecordInfo();
            let recordMap = new ShowRecord();
            recordMap.showId = showId + '';
            recordMap.showType = showType + '';
            recordMap.actionTime = actionTime + '';
            if (pageView) {
                recordMap.pageView = pageView + '';
            }
            if (showTime) {
                recordMap.showTime = showTime + '';
            }
            recordInfo.map = recordMap;
            recordInfo.recordType = 'nvlShowRecord';
            // alert(JSON.stringify(recordMap))
            RecordManager.getInstance().record(recordInfo);
        }
    }



}

