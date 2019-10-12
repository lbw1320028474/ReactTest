import { observable, computed, action } from 'mobx'
import ChapterBean from './ChapterBean'
import RecommendBean from './RecommendBean'
/**
 * 
 */
export default class BookInfoStore {
    constructor() {
        // this.bookId = 123;
        // this.chapterName = '请叫我什么';
        // this.chapterOrder = 1;

        this.lasterChapter = new ChapterBean();
        this.lasterChapter.chapterId = 1;
        this.lasterChapter.chapterName = '成为万物之主（大结局）';
        this.lasterChapter.chapterOrder = 1;

        this.chapter_01 = new ChapterBean();
        this.chapter_01.chapterId = 1;
        this.chapter_01.chapterName = '请叫我什么';
        this.chapter_01.chapterOrder = 1;

        this.chapter_02 = new ChapterBean();
        this.chapter_02.chapterId = 2;
        this.chapter_02.chapterName = '请家长';
        this.chapter_02.chapterOrder = 3;

        this.chapter_03 = new ChapterBean();
        this.chapter_03.chapterId = 3;
        this.chapter_03.chapterName = '胆大包天';
        this.chapter_03.chapterOrder = 3;

        this.bookName = '婚后相爱：腹黑老公堡门前';
        this.bookAuthor = '一笑倾城';
        this.bookCover = 'https://ss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=e12b65c2d7ca7bcb7d2ecf2b8b394755/78310a55b319ebc424602a988226cffc1e171692.jpg';
        this.bookCategory = '都市言情';
        this.isContinue = true;
        this.chapterCount = 1504;
        this.bookDescripte = '《大主宰》主角，号“牧尊” [2]  ，牧府府主，大千宫”诛魔王“。拥有“八部浮屠”和“一气化三清“，并将”一气化三清“修至三神境，外加真龙真凤之灵结合自成“一气化五身身”；’负八神脉与九神脉，掌握”太灵圣体“、“万古不朽身“、”无尽光明体”三座原始法身“，修成圣品肉身，借助三法身之力于“苍穹榜”上留下姓氏，超脱圣品。后再次掌握“荒神体”、“夜神古体”二座原始法身，”一气化三清“达到归一境，五法身归一，终于在苍穹榜上留下完整真名，将该境界命名为“主宰境”，大千世界有史以来牧尘是第一个在“苍穹榜”上留下全名的人。';


        let recomendBean = new RecommendBean();
        recomendBean.bookId = 1;
        recomendBean.bookName = '王者荣耀之汗血宝马：种菜交期来打我';
        recomendBean.bookCover = 'https://ss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=e12b65c2d7ca7bcb7d2ecf2b8b394755/78310a55b319ebc424602a988226cffc1e171692.jpg';
        this.reCommendList.push(recomendBean);

        let recomendBean1 = new RecommendBean();
        recomendBean1.bookId = 1;
        recomendBean1.bookName = '王者荣耀之汗血宝马：种菜交期来打我';
        recomendBean1.bookCover = 'https://ss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=e12b65c2d7ca7bcb7d2ecf2b8b394755/78310a55b319ebc424602a988226cffc1e171692.jpg';
        this.reCommendList.push(recomendBean1);

        let recomendBean2 = new RecommendBean();
        recomendBean2.bookId = 1;
        recomendBean2.bookName = '王者荣耀之汗血宝马：种菜交期来打我';
        recomendBean2.bookCover = 'https://ss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=e12b65c2d7ca7bcb7d2ecf2b8b394755/78310a55b319ebc424602a988226cffc1e171692.jpg';
        this.reCommendList.push(recomendBean2);

        let recomendBean3 = new RecommendBean();
        recomendBean3.bookId = 1;
        recomendBean3.bookName = '王者荣耀之汗血宝马：种菜交期来打我';
        recomendBean3.bookCover = 'https://ss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=e12b65c2d7ca7bcb7d2ecf2b8b394755/78310a55b319ebc424602a988226cffc1e171692.jpg';
        this.reCommendList.push(recomendBean3);

        let recomendBean4 = new RecommendBean();
        recomendBean4.bookId = 1;
        recomendBean4.bookName = '王者荣耀之汗血宝马：种菜交期来打我';
        recomendBean4.bookCover = 'https://ss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=e12b65c2d7ca7bcb7d2ecf2b8b394755/78310a55b319ebc424602a988226cffc1e171692.jpg';
        this.reCommendList.push(recomendBean4);

        let recomendBean5 = new RecommendBean();
        recomendBean5.bookId = 1;
        recomendBean5.bookName = '王者荣耀之汗血宝马：种菜交期来打我';
        recomendBean5.bookCover = 'https://ss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=e12b65c2d7ca7bcb7d2ecf2b8b394755/78310a55b319ebc424602a988226cffc1e171692.jpg';
        this.reCommendList.push(recomendBean5);

        let recomendBean6 = new RecommendBean();
        recomendBean6.bookId = 1;
        recomendBean6.bookName = '王者荣耀之汗血宝马：种菜交期来打我';
        recomendBean6.bookCover = 'https://ss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=e12b65c2d7ca7bcb7d2ecf2b8b394755/78310a55b319ebc424602a988226cffc1e171692.jpg';
        this.reCommendList.push(recomendBean6);
    }

    @observable
    bookId = '';

    @observable
    bookName = '';

    @observable
    bookAuthor = '';

    @observable
    bookCover = '';

    @observable
    bookCategory = '';

    @observable
    isContinue = false;

    @observable
    chapterCount = 0;

    @observable
    bookDescripte = '';

    @observable
    isContinue = '';

    /**
     * 最新章节
     */
    @observable
    lasterChapter;
    /**
     * 第一章
     */
    @observable
    chapter_01;
    /**
    * 第二章
    */
    @observable
    chapter_02;
    /**
    * 第三章
    */
    @observable
    chapter_03;

    /**
     * 是否是书包的书
     */
    @observable
    isPagBook = false;

    /**
     * 推荐列表,对象是RecommendBean
     */
    @observable
    reCommendList = [];

    @observable
    scrollViewOfsetY = 0;   //滑动组件滑动的距离，用来控制顶部组件的背景透明度

    @observable
    actionBarBgOpacity = 0;
}



