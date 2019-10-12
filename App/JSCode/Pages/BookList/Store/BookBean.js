import { observable, computed, action } from 'mobx'
/**
 * 整个App共享数据全部放在这里
 */
export default class BookBean {

    @observable
    bookId = '';

    @observable
    bookName = '';

    @observable
    bookCoverUrl = '';

    @observable
    bookAuthor = '';

    @observable
    bookDescript = '';

    @observable
    bookCategory = '';
}



