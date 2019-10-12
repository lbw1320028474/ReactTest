import { observable, computed, action } from 'mobx'
import CategoryBean from './CategoryBean'
/**
 * 整个App共享数据全部放在这里
 */
export default class CategoryGroupBean {
    constructor() {
        this.categoryGroupName = '现代言情';
        this.categoryGroupCover = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522832616736&di=996a1bbf224bafadff0a4e36a258f0a3&imgtype=0&src=http%3A%2F%2Fpic29.photophoto.cn%2F20131022%2F0005018361564860_b.jpg';
        this.categoryList.push(new CategoryBean());
        this.categoryList.push(new CategoryBean());
        this.categoryList.push(new CategoryBean());
        this.categoryList.push(new CategoryBean());
        this.categoryList.push(new CategoryBean());
    }


    @observable
    categoryGroupName = '';
    /**
     * 分组列表图片
     */
    @observable
    categoryGroupCover = '';

    @observable
    categoryList = [];      //对象是CategoryBean
}



