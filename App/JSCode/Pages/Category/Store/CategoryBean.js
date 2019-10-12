import { observable, computed, action } from 'mobx'
/**
 * 整个App共享数据全部放在这里
 */
export default class CategoryBean {
    constructor() {
        this.categoryCount = 200;
        this.categoryId = 1;
        this.categoryName = '现代言情';
    }


    @observable
    categoryName = '';

    @observable
    categoryId = '';

    @observable
    categoryCount = '';

    @observable
    categoryCover = '';
}



