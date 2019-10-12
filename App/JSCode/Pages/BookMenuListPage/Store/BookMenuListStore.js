import { observable, computed, action } from 'mobx'
import BookMenuBean from './BookMenuBean'

/**
 * 整个App共享数据全部放在这里
 */
export default class BookMenuListStore {
    // constructor() {
    //     let bookMenuBean1 = new BookMenuBean();
    //     bookMenuBean1.bookCount = '120';
    //     bookMenuBean1.bookMenuCover = 'http://img.80txt.com/49/49287/49287s.jpg';
    //     bookMenuBean1.bookMenuName = '一棍成天';
    //     bookMenuBean1.bookMenuDescript = '八零电子书免费为书友提供天上峡谷创作的一棍碎天txt全集下载;如果你觉得本站提供的txt电子书免费下载不错,请把一棍碎天txt全集下载分享推荐给你的朋友！';
    //     this.bookMenuList.push(bookMenuBean1);

    //     let bookMenuBean2 = new BookMenuBean();
    //     bookMenuBean2.bookCount = '120';
    //     bookMenuBean2.bookMenuCover = 'http://img.80txt.com/49/49287/49287s.jpg';
    //     bookMenuBean2.bookMenuName = '一棍成天';
    //     bookMenuBean2.bookMenuDescript = '八零电子书免费为书友提供天上峡谷创作的一棍碎天txt全集下载;如果你觉得本站提供的txt电子书免费下载不错,请把一棍碎天txt全集下载分享推荐给你的朋友！';
    //     this.bookMenuList.push(bookMenuBean2);

    //     let bookMenuBean3 = new BookMenuBean();
    //     bookMenuBean3.bookCount = '120';
    //     bookMenuBean3.bookMenuCover = 'http://img.80txt.com/49/49287/49287s.jpg';
    //     bookMenuBean3.bookMenuName = '一棍成天';
    //     bookMenuBean3.bookMenuDescript = '八零电子书免费为书友提供天上峡谷创作的一棍碎天txt全集下载;如果你觉得本站提供的txt电子书免费下载不错,请把一棍碎天txt全集下载分享推荐给你的朋友！';
    //     this.bookMenuList.push(bookMenuBean3);

    //     let bookMenuBean4 = new BookMenuBean();
    //     bookMenuBean4.bookCount = '120';
    //     bookMenuBean4.bookMenuCover = 'http://img.80txt.com/49/49287/49287s.jpg';
    //     bookMenuBean4.bookMenuName = '一棍成天';
    //     bookMenuBean4.bookMenuDescript = '八零电子书免费为书友提供天上峡谷创作的一棍碎天txt全集下载;如果你觉得本站提供的txt电子书免费下载不错,请把一棍碎天txt全集下载分享推荐给你的朋友！';
    //     this.bookMenuList.push(bookMenuBean4);

    //     let bookMenuBean5 = new BookMenuBean();
    //     bookMenuBean5.bookCount = '120';
    //     bookMenuBean5.bookMenuCover = 'http://img.80txt.com/49/49287/49287s.jpg';
    //     bookMenuBean5.bookMenuName = '一棍成天';
    //     bookMenuBean5.bookMenuDescript = '八零电子书免费为书友提供天上峡谷创作的一棍碎天txt全集下载;如果你觉得本站提供的txt电子书免费下载不错,请把一棍碎天txt全集下载分享推荐给你的朋友！';
    //     this.bookMenuList.push(bookMenuBean5);

    //     let bookMenuBean6 = new BookMenuBean();
    //     bookMenuBean6.bookCount = '120';
    //     bookMenuBean6.bookMenuCover = 'http://img.80txt.com/49/49287/49287s.jpg';
    //     bookMenuBean6.bookMenuName = '一棍成天';
    //     bookMenuBean6.bookMenuDescript = '八零电子书免费为书友提供天上峡谷创作的一棍碎天txt全集下载;如果你觉得本站提供的txt电子书免费下载不错,请把一棍碎天txt全集下载分享推荐给你的朋友！';
    //     this.bookMenuList.push(bookMenuBean6);

    //     let bookMenuBean7 = new BookMenuBean();
    //     bookMenuBean7.bookCount = '120';
    //     bookMenuBean7.bookMenuCover = 'http://img.80txt.com/49/49287/49287s.jpg';
    //     bookMenuBean7.bookMenuName = '一棍成天';
    //     bookMenuBean7.bookMenuDescript = '八零电子书免费为书友提供天上峡谷创作的一棍碎天txt全集下载;如果你觉得本站提供的txt电子书免费下载不错,请把一棍碎天txt全集下载分享推荐给你的朋友！';
    //     this.bookMenuList.push(bookMenuBean7);

    //     let bookMenuBean8 = new BookMenuBean();
    //     bookMenuBean8.bookCount = '120';
    //     bookMenuBean8.bookMenuCover = 'http://img.80txt.com/49/49287/49287s.jpg';
    //     bookMenuBean8.bookMenuName = '一棍成天';
    //     bookMenuBean8.bookMenuDescript = '八零电子书免费为书友提供天上峡谷创作的一棍碎天txt全集下载;如果你觉得本站提供的txt电子书免费下载不错,请把一棍碎天txt全集下载分享推荐给你的朋友！';
    //     this.bookMenuList.push(bookMenuBean8);
    // }
    // /**
    //  * 书单名称
    //  */
    // @observable
    // bookMenuName = '';

    // /**
    //  * 书单封面
    //  */
    // @observable
    // bookMenuCover = '';

    // /**
    //  * 书单ID
    //  */
    // @observable
    // bookMenuId = '';

    // /**
    //  * 书单描述
    //  */
    // @observable
    // bookMenuDescript = '';


    // @observable
    // bookCount = 100;

    // /**
    //  * 小说列表， item对象是BookMenuInfoBean
    //  */
    @observable
    bookMenuList = [];
}



