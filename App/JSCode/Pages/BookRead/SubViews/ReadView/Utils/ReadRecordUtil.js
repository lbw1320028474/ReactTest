import RecordUtil from '../../../../../Record/RecordUtil'
import RecordVar from '../../../../../Record/RecordVar'
import ReadRecordTime from './ReadRecordTime'
export default class ReadRecordUtil {
    // static startTimer;
    // static pages = 1;
    // static endTimer;

    static startRead() {
        ReadRecordTime.startTimer = (new Date()).getTime();
    }
    //这里的chapterId实际传进来的是bookid
    static endRead(chapterId, chapterOrder) {
        try {
            let timeData = new Date();
            let currentTime = timeData.getTime();
            if (ReadRecordTime.startTimer > 0 && ReadRecordTime.pages) {
                //static showRecord(showId, showType, actionTime, showTime, pageView) {
                let distanceTime = currentTime - ReadRecordTime.startTimer;
                if (currentTime > 0 && distanceTime > 0 && distanceTime < 3600000) {
                    RecordUtil.showRecord(chapterId, RecordVar.show_read_chapter, currentTime, distanceTime, chapterOrder);
                }
                //alert('上传埋点了' + chapterId + ' + ' + ((new Date()).getTime() - ReadRecordUtil.startTimer) + ' + ' + ReadRecordUtil.pages);
                // alert(timeData.getTime() - ReadRecordTime.startTimer);
                ReadRecordTime.pages = 1;
            }
            ReadRecordTime.startTimer = currentTime;
        } catch (error) {
            console.log("阅读埋点异常");
        }

    }
}


// import RecordUtil from '../../../../../Record/RecordUtil'
// import RecordVar from '../../../../../Record/RecordVar'
// import ReadRecordTime from './ReadRecordTime'
// export default class ReadRecordUtil {
//     static startRead() {
//         ReadRecordTime.startTimer = (new Date()).getMilliseconds();
//     }
//     //这里的chapterId实际传进来的是bookid
//     static endRead(chapterId, chapterOrder) {
//         let timeData = new Date();
//         console.log("当前时间:" + timeData.getTime());
//         if (ReadRecordTime.startTimer && ReadRecordTime.pages) {
//             //static showRecord(showId, showType, actionTime, showTime, pageView) {

//             console.log("时间1= " + timeData.getTime());
//             console.log("startTimer= " + ReadRecordTime.startTimer);
//             let timeCount = timeData.getTime() - ReadRecordTime.startTimer;
//             console.log("时间差= " + timeCount);
//             RecordUtil.showRecord(chapterId, RecordVar.show_read_chapter, timeData.getTime(), timeData.getTime() - ReadRecordTime.startTimer, chapterOrder);
//             //alert('上传埋点了' + chapterId + ' + ' + ((new Date()).getTime() - ReadRecordUtil.startTimer) + ' + ' + ReadRecordUtil.pages);
//             ReadRecordTime.pages = 1;
//         }
//         ReadRecordTime.startTimer = timeData.getTime();
//         console.log("新的 ReadRecordUtil.startTimer:" + ReadRecordTime.startTimer);
//     }


//     // //这里的chapterId实际传进来的是bookid
//     // static endRead(chapterId, chapterOrder) {
//     //     if (ReadRecordTime.startTimer && ReadRecordTime.pages) {
//     //         //static showRecord(showId, showType, actionTime, showTime, pageView) {
//     //         let timeData = new Date();
//     //         let currentTme = timeData.getTime();
//     //         RecordUtil.showRecord(chapterId, RecordVar.show_read_chapter, currentTme, currentTme - ReadRecordTime.startTimer, chapterOrder);
//     //         //alert('上传埋点了' + chapterId + ' + ' + ((new Date()).getTime() - ReadRecordUtil.startTimer) + ' + ' + ReadRecordUtil.pages);
//     //         ReadRecordTime.pages = 1;
//     //     }
//     //     ReadRecordUtil.startTimer = currentTme;
//     // }
// }