import { observable, computed, action } from 'mobx'
import ChapterListBean from './ChapterListBean'
/**
 * 整个App共享数据全部放在这里
 */
export default class ChapterListStore {
    // constructor() {
    //     this.bookId = 0;
    //     this.bookName = '皇家小子';
    //     this.bookAuthor = '天蚕土豆';
    //     this.bookCover = 'http://www.ouoou.com/image/3/3446.jpg';

    //     for (let i = 0; i < 4254; ++i) {
    //         let chapterBean = new ChapterListBean();
    //         chapterBean.chapterId = i;
    //         chapterBean.chapterName = '第' + i + '章 大主宰';
    //         chapterBean.chapterOrder = i + 1;
    //         if (i > 5 && i < 20) {
    //             chapterBean.catchState = 1;
    //         } else if (i > 30 && i < 50) {
    //             chapterBean.catchState = 2;
    //         } else {
    //             chapterBean.catchState = 0;
    //         }
    //         if (i === 30) {
    //             chapterBean.readState = 1;
    //         }
    //         this.chapterList.push(chapterBean);
    //     }
    //     this.chapterCount = this.chapterList.length;
    // }


    @observable
    bookId = 0;

    @observable
    bookName = '';

    @observable
    bookAuthor = '';

    @observable
    bookCover = '';

    @observable
    chapterList = [];       //ChapterListBean对象列表

    @observable
    chapterCount = 0;
}



