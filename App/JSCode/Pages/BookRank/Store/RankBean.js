import { observable, computed, action } from 'mobx'
import BookBean from './BookBean'
/**
 * 整个App共享数据全部放在这里
 */
export default class BookRankStore {
    // constructor() {

    //     for (let i = 0; i < 1000; ++i) {
    //         let bookBean = new BookBean();
    //         bookBean.rankNum = i;
    //         bookBean.bookAuthor = '囧囧有事';
    //         bookBean.bookCategory = '玄幻魔法';
    //         bookBean.bookCoverUrl = 'http://img.80txt.com/49/49287/49287s.jpg';
    //         bookBean.bookName = '一棍成天' + i;
    //         bookBean.bookDescript = '八零电子书免费为书友提供天上峡谷创作的一棍碎天txt全集下载;如果你觉得本站提供的txt电子书免费下载不错,请把一棍碎天txt全集下载分享推荐给你的朋友！';
    //         this.bookList.push(bookBean);
    //         this.bookList.push()
    //     }
    // }


    @observable
    rankId = 0;

    @observable
    rankName = '';

    @observable
    bookList = [];
}



