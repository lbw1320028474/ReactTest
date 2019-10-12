import { observable, computed, action } from 'mobx'
import CategoryGroupBean from './CategoryGroupBean'
/**
 * 整个App共享数据全部放在这里
 */
export default class CategoryStore {
    constructor() {
        this.categoryGroupList.push(new CategoryGroupBean())
        this.categoryGroupList.push(new CategoryGroupBean())
        this.categoryGroupList.push(new CategoryGroupBean())
        this.categoryGroupList.push(new CategoryGroupBean())
        this.categoryGroupList.push(new CategoryGroupBean())
        this.categoryGroupList.push(new CategoryGroupBean())
        this.categoryGroupList.push(new CategoryGroupBean())
    }

    @observable
    categoryGroupList = [];
}



