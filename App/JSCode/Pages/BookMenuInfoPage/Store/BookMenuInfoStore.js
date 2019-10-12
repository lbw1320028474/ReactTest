import { observable, computed, action } from 'mobx'
import BookMenuInfoBean from './BookMenuInfoBean'

/**
 * 整个App共享数据全部放在这里
 */
export default class BookMenuBean {
    // constructor() {
    //     let bookBean1 = new BookMenuInfoBean();
    //     bookBean1.bookAuthor = '囧囧有事';
    //     bookBean1.bookCategory = '玄幻魔法';
    //     bookBean1.bookCoverUrl = 'http://img.80txt.com/49/49287/49287s.jpg';
    //     bookBean1.bookName = '一棍成天';
    //     bookBean1.bookDescript = '八零电子书免费为书友提供天上峡谷创作的一棍碎天txt全集下载;如果你觉得本站提供的txt电子书免费下载不错,请把一棍碎天txt全集下载分享推荐给你的朋友！';
    //     this.bookList.push(bookBean1);

    //     let bookBean2 = new BookMenuInfoBean();
    //     bookBean2.bookAuthor = '囧囧有事';
    //     bookBean2.bookCategory = '玄幻魔法';
    //     bookBean2.bookCoverUrl = 'http://img.80txt.com/49/49287/49287s.jpg';
    //     bookBean2.bookName = '一棍成天';
    //     bookBean2.bookDescript = '八零电子书免费为书友提供天上峡谷创作的一棍碎天txt全集下载;如果你觉得本站提供的txt电子书免费下载不错,请把一棍碎天txt全集下载分享推荐给你的朋友！';
    //     this.bookList.push(bookBean2);

    //     let bookBean3 = new BookMenuInfoBean();
    //     bookBean3.bookAuthor = '囧囧有事';
    //     bookBean3.bookCategory = '玄幻魔法';
    //     bookBean3.bookCoverUrl = 'http://img.80txt.com/49/49287/49287s.jpg';
    //     bookBean3.bookName = '一棍成天';
    //     bookBean3.bookDescript = '八零电子书免费为书友提供天上峡谷创作的一棍碎天txt全集下载;如果你觉得本站提供的txt电子书免费下载不错,请把一棍碎天txt全集下载分享推荐给你的朋友！';
    //     this.bookList.push(bookBean3);

    //     let bookBean4 = new BookMenuInfoBean();
    //     bookBean4.bookAuthor = '囧囧有事';
    //     bookBean4.bookCategory = '玄幻魔法';
    //     bookBean4.bookCoverUrl = 'http://img.80txt.com/49/49287/49287s.jpg';
    //     bookBean4.bookName = '一棍成天';
    //     bookBean4.bookDescript = '八零电子书免费为书友提供天上峡谷创作的一棍碎天txt全集下载;如果你觉得本站提供的txt电子书免费下载不错,请把一棍碎天txt全集下载分享推荐给你的朋友！';
    //     this.bookList.push(bookBean4);

    //     let bookBean5 = new BookMenuInfoBean();
    //     bookBean5.bookAuthor = '囧囧有事1';
    //     bookBean5.bookCategory = '玄幻魔法';
    //     bookBean5.bookCoverUrl = 'http://img.80txt.com/49/49287/49287s.jpg';
    //     bookBean5.bookName = '一棍成天';
    //     bookBean5.bookDescript = '八零电子书免费为书友提供天上峡谷创作的一棍碎天txt全集下载;如果你觉得本站提供的txt电子书免费下载不错,请把一棍碎天txt全集下载分享推荐给你的朋友！';
    //     this.bookList.push(bookBean5);


    //     let bookBean6 = new BookMenuInfoBean();
    //     bookBean6.bookAuthor = '囧囧有事2';
    //     bookBean6.bookCategory = '玄幻魔法';
    //     bookBean6.bookCoverUrl = 'http://img.80txt.com/49/49287/49287s.jpg';
    //     bookBean6.bookName = '一棍成天';
    //     bookBean6.bookDescript = '八零电子书免费为书友提供天上峡谷创作的一棍碎天txt全集下载;如果你觉得本站提供的txt电子书免费下载不错,请把一棍碎天txt全集下载分享推荐给你的朋友！';
    //     this.bookList.push(bookBean6);

    //     this.bookMenuName = '我们的青春时光，永远难忘！一起的回忆';
    //     this.bookMenuCover = 'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=801ef7ad9252982205333ec5eff11cf6/d000baa1cd11728b812d4748cafcc3cec3fd2c5c.jpg';
    //     this.bookMenuDescript = '《艺术的故事》概括地叙述了从最早的洞窟绘画到当今的实验艺术的发展历程，以阐明艺术史是“各种传统不断迂回、不断改变的历史，每一件作品在这历史中都既回顾过去又导向未来。继1997年三联版《艺术的故事》后，英国费顿出版社授权广西美术出版社独家出版，也是国内唯一合法授权的版本';
    // }
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

    @observable
    isBagBook = false;

    /**
     * 小说列表， item对象是BookMenuInfoBean
     */
    @observable
    bookList = [];
}



