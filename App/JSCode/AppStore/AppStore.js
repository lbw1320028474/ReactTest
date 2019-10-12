import { observable, computed, action } from 'mobx'

import TabStore from '../Pages/Tab/Store/TabStore'

import BookCaseStore from '../Pages/BookCase/Store/BookCaseStore'
import BookRoomStore from '../Pages/BookRoom/Store/BookRoomStore'
import CategoryStore from '../Pages/Category/Store/CategoryStore'
import SearchStore from '../Pages/Search/Store/SearchStore'
import BookMenuInfoStore from '../Pages/BookMenuInfoPage/Store/BookMenuInfoStore'
import BookMenuListStore from '../Pages/BookMenuListPage/Store/BookMenuListStore'
import BookRankStore from '../Pages/BookRank/Store/BookRankStore'
import BookInfoStore from '../Pages/BookInfo/Store/BookInfoStore'
import BookListStore from '../Pages/BookList/Store/BookListStore'
// import TabStore from '../Pages/Tab/Store/TabStore'
import ChapterListStore from '../Pages/ChapterList/Store/ChapterListStore'
import BookReadStore from '../Pages/BookRead/Store/BookReadStore'
import AppTheme from '../Themes/AppTheme'
import MyPageStore from '../Pages/MyPage/Store/MyPageStore'
import ReadLogStore from '../Pages/ReadLogPage/Store/ReadLogStore'
import LoadStore from '../Pages/Load/Store/LoadStore'
/**
 * 整个App共享数据全部放在这里
 */
export default class AppStore {
    // //bookInfo页面数据
    // @observable
    // bookInfoStore = new BookInfoStore();

    //bookInfo页面数据
    @observable
    bookInfoStore = new BookInfoStore();

    //tab页面数据
    @observable
    tabData = new TabStore();

    //书籍列表页面数据
    @observable
    bookListStore = new BookListStore();

    //书架页面数据
    @observable
    bookCaseStore = new BookCaseStore();

    //书库页面数据
    @observable
    bookRankStore = new BookRankStore();

    //分类页面数据
    @observable
    bookRoomStore = new BookRoomStore();

    //搜索页面数据
    @observable
    categoryStore = new CategoryStore();

    //排行页面数据
    @observable
    searchStore = new SearchStore();

    //app主题数据
    @observable
    appTheme = new AppTheme();

    /**
     * 书单详情数据
     */
    @observable
    bookMenuInfoStore = new BookMenuInfoStore();

    /**
     * 书单列表数据
     */
    @observable
    bookMenuListStore = new BookMenuListStore();

    /**
     * 我的页面数据
     */
    @observable
    myPageStore = new MyPageStore();

    /**
     * 章节列表数据
     */
    @observable
    chapterListStore = new ChapterListStore();

    /**
     * 阅读页数据
     */
    readPageStore = new BookReadStore();


    /**
     * 阅读历史数据
     */
    readLogStore = new ReadLogStore();


    /**
     * 登录数据
     */
    loadStore = new LoadStore();
}



