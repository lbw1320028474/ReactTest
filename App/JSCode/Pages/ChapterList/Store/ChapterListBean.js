import { observable, computed, action } from 'mobx'
/**
 * 
 */
export default class ChapterListBean {
    constructor() {

    }


    @observable
    chapterId = 0;

    @observable
    chapterOrder = 0;

    @observable
    chapterName = '';

    @observable
    catchState = 0;     //0;无缓冲，，1：正在缓存，，2：缓存完成


    @observable
    readState = 0;      //阅读状态，0：正常，  1：正在阅读
}



