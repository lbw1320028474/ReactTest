import { observable, computed, action } from 'mobx'
/**
 * 整个App共享数据全部放在这里
 */
export default class BookMenuBean {
    /**
        * 书单名称
        */
    @observable
    bookMenuName = '';

    /**
     * 书单封面
     */
    @observable
    bookMenuCover = '';

    /**
     * 书单ID
     */
    @observable
    bookMenuId = '';

    /**
     * 书单描述
     */
    @observable
    bookMenuDescript = '';


    @observable
    bookCount = 0;

    /**
     * 手数
     */
    @observable
    collectorCount = 0;


    @observable
    isBagBook = false;
}



