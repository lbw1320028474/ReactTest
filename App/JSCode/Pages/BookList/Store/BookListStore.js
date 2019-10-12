import { observable, computed, action } from 'mobx'
/**
 * 小说列表数据
 */
export default class BookListStore {
    @observable
    listName = '';

    @observable
    listId = '';

    @observable
    boolList = [];
}



