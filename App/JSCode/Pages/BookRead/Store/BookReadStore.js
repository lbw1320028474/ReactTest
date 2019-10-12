import { observable, computed, action } from 'mobx'
import ReadThemeStore from './ReadThemeStore'
/**
 * 整个App共享数据全部放在这里
 */
export default class BookReadStore {
    // constructor() {
    //     this.bookId = 1;
    //     this.bookName = '大主宰';
    //     this.readChapterOrder = 12;
    //     this.readChapterId = 12;
    //     this.readChapterName = '换世门生';

    // }

    /**
     * 书ID
     */
    @observable
    bookId = 0;
    /**
     * 书名
     */
    @observable
    bookName = '';


    /**
     * 章节总数
     */
    @observable
    chapterCount = 0;
    /**
     * 正在阅读的章节序号
     */
    @observable
    readChapterOrder = '';
    /**
     * 正在阅读的章节id
     */
    @observable
    readChapterId = '';

    /**
    * 正在阅读的章节名称
    */
    @observable
    readChapterName = '';

    // 章节URL
    @observable
    readChapterUrl = '';

    @observable
    readTheme = new ReadThemeStore();


    @observable
    menuIsOpen = false;

    @observable
    settingIsOpen = false;

    @action
    resetMenuState() {
        this.menuIsOpen = false;
        this.settingIsOpen = false;
    }

    /**
     * 行间距类型0：大， 1：中， 2：小
     */
    @observable
    lineHightType = 1;
    @action
    setLineHightType(type) {
        this.lineHightType = type;
        if (type === 0) {
            this.readTheme.setLineHeightRate(1.9);
        } else if (type === 1) {
            this.readTheme.setLineHeightRate(1.6);
        } else if (type === 2) {
            this.readTheme.setLineHeightRate(1.3);
        }
    }

}



