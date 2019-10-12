import { observable, computed, action } from 'mobx'
/**
 * 整个App共享数据全部放在这里
 */
export default class UpdataBean {
    bookId = '';    
    nowChapterOrder = 1;    //最后一次更新的章节
}



