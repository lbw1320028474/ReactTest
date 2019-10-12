import { observable, computed, action } from 'mobx'
/**
 * 
 */
export default class RecommendBean {


    @observable
    id = 0;

    @observable
    bookId = 0;

    @observable
    bookName = '';

    @observable
    bookCover = '';


}



