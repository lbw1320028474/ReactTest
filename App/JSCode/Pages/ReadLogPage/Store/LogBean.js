import { observable, computed, action } from 'mobx'
/**
 * 整个App共享数据全部放在这里
 */
export default class LogBean {

    @observable
    bookId = '';

    @observable
    bookName = '';

    @observable
    bookCoverUrl = '';

    @observable
    bookAuthor = '';

    @observable
    lastReadTime = '';

    @observable
    lastReadChapterId = '';

    @observable
    lastReadChapterName = '';

    @observable
    lastReadChapterOrder = '';

    @observable
    lastReadPage = '';

    isPagBook = 0;
}



