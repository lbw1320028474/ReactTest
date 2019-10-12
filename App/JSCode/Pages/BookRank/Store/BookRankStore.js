import { observable, computed, action } from 'mobx'
import RankBean from './RankBean'
/**
 * 整个App共享数据全部放在这里
 */
export default class BookRankStore {

    // constructor() {
    //     for (let i = 0; i < 20; i++) {
    //         let rankBean = new RankBean();
    //         rankBean.rankName = '最热榜' + i;
    //         if (i === 0) {
    //             rankBean.bookList[0].bookCoverUrl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522736253054&di=1a7810f37a9e2c948aa777b0ef7969e4&imgtype=0&src=http%3A%2F%2Fi-3.499.cn%2F2017%2F5%2F10%2F2d48a589-c333-4f9c-90ed-7c10240115b2.jpg';
    //         }
    //         this.rankList.push(rankBean);
    //     }
    // }

    /**
     * 当前展示的排行
     */
    @observable
    showIndex = 0;

    /**
     * 排行列表
     */
    @observable
    rankList = [];
}



