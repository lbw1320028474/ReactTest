import { observable, computed, action } from 'mobx'
/**
 * 整个App共享数据全部放在这里
 */
export default class BookCaseBean {
    @observable
    bookId = '';

    @observable
    bookName = '';

    @observable
    bookCoverUrl = '';

    @observable
    hasNewChapter = false;

    @observable
    lastChapterUrl = '';

    @observable
    lastChapterName = '';

    @observable
    lastChapterOrder = 1;

    @observable
    lastChapterId;

    @observable
    selected = false;       //编辑模式下是否被选中


    @observable
    describe = '';

    //排序索引
    @observable
    index = 0;


    @observable
    itemType = 0;       //item  类型0：图书，   1：书单

    @observable
    isTop = 0;       //是否是手动置顶 0：否   1：是
}



