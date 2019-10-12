import { observable, computed, action } from 'mobx'
/**
 * 
 */
export default class ChapterBean {


    @observable
    chapterOrder = 0;

    @observable
    chapterName = '';

    @observable
    chapterId = 0;

    @observable
    chapterUrl = '';

    /**
     * 是否有缓存
     */
    @observable
    isCatch = false;
}



