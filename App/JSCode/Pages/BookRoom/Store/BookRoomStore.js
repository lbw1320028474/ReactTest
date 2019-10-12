import { observable, computed, action } from 'mobx'
import BannerBean from '../HeadBanner/Store/BannerBean'
import BookMenuBean from '../BookMenu/Store/BookMenuBean'
import NormalBookBean from '../NormalList/Store/NormalBookBean'
import GroupStore from './GroupStore'
import HotBookBean from '../HotBookList/Store/HotBookBean'
/**
 * 整个App共享数据全部放在这里
 */
export default class BookRoomStore {
    // constructor() {
    //     /**
    //      * 头部banner
    //      */
    //     let headBannerBean = new GroupStore();

    //     let bannerBean = new BannerBean();
    //     bannerBean.bannerImage = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522405337344&di=181a248d1af8051f01edfddd342d63fe&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F010f28589d69e1a8012060c88796cc.png%401280w_1l_2o_100sh.png';
    //     bannerBean.bannerType = 1;
    //     headBannerBean.groupBeanList.push(bannerBean);

    //     let bannerBean1 = new BannerBean();
    //     bannerBean1.bannerType = 2;
    //     bannerBean1.bannerImage = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522405337344&di=181a248d1af8051f01edfddd342d63fe&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F010f28589d69e1a8012060c88796cc.png%401280w_1l_2o_100sh.png';
    //     headBannerBean.groupBeanList.push(bannerBean1);

    //     let bannerBean2 = new BannerBean();
    //     bannerBean2.bannerType = 3;
    //     bannerBean2.bannerImage = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522405337344&di=181a248d1af8051f01edfddd342d63fe&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F010f28589d69e1a8012060c88796cc.png%401280w_1l_2o_100sh.png';
    //     headBannerBean.groupBeanList.push(bannerBean2);

    //     headBannerBean.groupId = '123345';
    //     headBannerBean.groupName = '推荐书单';
    //     headBannerBean.groupType = 0;
    //     this.groupList.push(headBannerBean);
    //     /**
    //      * 推荐书单group模拟数据
    //      */
    //     let bookMenuBean = new GroupStore();
    //     let bookBean = new BookMenuBean();
    //     bookBean.bookMenuName = "仙草。粮库，收藏不了！"
    //     bookBean.bookMenuCoverUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521737908503&di=6b7840789d49493bbf8e29c3251faf5f&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Dfe5ba490e6fe9925cb596154019872e9%2F6159252dd42a2834f0e98a5e5db5c9ea15cebf1c.jpg";
    //     bookMenuBean.groupBeanList.push(bookBean);

    //     let bookBean1 = new BookMenuBean();
    //     bookBean1.bookMenuName = "麦田里的守望者"
    //     bookBean1.bookMenuCoverUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521737978850&di=20ffea2a6241ad6b78e0de434be0d079&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F4bed2e738bd4b31c023b2a8685d6277f9e2ff88c.jpg";
    //     bookMenuBean.groupBeanList.push(bookBean1);

    //     let bookBean2 = new BookMenuBean();
    //     bookBean2.bookMenuName = "从你的全世界路过"
    //     bookBean2.bookMenuCoverUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521737978849&di=ee766183dac572a27bfca8a42e564803&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01f8ae5a117fb3a80121985c0bd36b.jpg%401280w_1l_2o_100sh.jpg";
    //     bookMenuBean.groupBeanList.push(bookBean2);

    //     let bookBean3 = new BookMenuBean();
    //     bookBean3.bookMenuName = "蝴蝶花开紫丁香"
    //     bookBean3.bookMenuCoverUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521737978849&di=947122b6b2f3e892c70861db6b094e0d&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F3ac79f3df8dcd10086324bf5738b4710b8122fb3.jpg";
    //     bookMenuBean.groupBeanList.push(bookBean3);

    //     let bookBean4 = new BookMenuBean();
    //     bookBean4.bookMenuName = "心由我生"
    //     bookBean4.bookMenuCoverUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521737978873&di=c6346dedc98eaa88c2b70bbf1747c9ed&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fa50f4bfbfbedab644313c863f336afc379311e2b.jpg";
    //     bookMenuBean.groupBeanList.push(bookBean4);

    //     let bookBean5 = new BookMenuBean();
    //     bookBean5.bookMenuName = "南方有乔木"
    //     bookBean5.bookMenuCoverUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521737978872&di=52432896c5c1c013b6bb776f8796813c&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fcaef76094b36acaffc053d1e7ad98d1000e99c6f.jpg";
    //     bookMenuBean.groupBeanList.push(bookBean5);

    //     bookMenuBean.groupId = '123345';
    //     bookMenuBean.groupName = '推荐书单';
    //     bookMenuBean.groupType = 1;
    //     this.groupList.push(bookMenuBean);


    //     /**
    //      * 热门追更group模拟数据
    //      */
    //     let hotBookGroup = new GroupStore();

    //     let hotbookBean = new HotBookBean();
    //     hotbookBean.bookName = "仙草。粮库，收藏不了！"
    //     hotbookBean.bookDescript = "一粒尘可填海，一根草斩尽日月星辰，弹指间天翻地覆。群雄并起，万族林立，诸圣争霸，乱天动地；问苍茫大地，谁主沉浮？一个少年从大荒中走出，一切从这里开始。";
    //     hotbookBean.bookCoverUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521737908503&di=6b7840789d49493bbf8e29c3251faf5f&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Dfe5ba490e6fe9925cb596154019872e9%2F6159252dd42a2834f0e98a5e5db5c9ea15cebf1c.jpg";
    //     hotBookGroup.groupBeanList.push(hotbookBean);

    //     let hotbookBean1 = new HotBookBean();
    //     hotbookBean1.bookName = "麦田里的守望者"
    //     hotbookBean1.bookDescript = "大主宰》是天蚕土豆在2013年创作的第四部长篇小说，于起点中文网首发，与《斗破苍穹》和《武动乾坤》有联系，讲述少年牧尘不断成长的的故事。该小说于2017年7月9号完结。";
    //     hotbookBean1.bookCoverUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521737978850&di=20ffea2a6241ad6b78e0de434be0d079&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F4bed2e738bd4b31c023b2a8685d6277f9e2ff88c.jpg";
    //     hotBookGroup.groupBeanList.push(hotbookBean1);

    //     let hotbookBean2 = new HotBookBean();
    //     hotbookBean2.bookName = "从你的全世界路过"
    //     hotbookBean2.bookDescript = "大主宰》是天蚕土豆在2013年创作的第四部长篇小说，于起点中文网首发，与《斗破苍穹》和《武动乾坤》有联系，讲述少年牧尘不断成长的的故事。该小说于2017年7月9号完结。";
    //     hotbookBean2.bookCoverUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521737978849&di=ee766183dac572a27bfca8a42e564803&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01f8ae5a117fb3a80121985c0bd36b.jpg%401280w_1l_2o_100sh.jpg";
    //     hotBookGroup.groupBeanList.push(hotbookBean2);

    //     let hotbookBean3 = new HotBookBean();
    //     hotbookBean3.bookName = "蝴蝶花开紫丁香"
    //     hotbookBean3.bookDescript = "大主宰》是天蚕土豆在2013年创作的第四部长篇小说，于起点中文网首发，与《斗破苍穹》和《武动乾坤》有联系，讲述少年牧尘不断成长的的故事。该小说于2017年7月9号完结。";
    //     hotbookBean3.bookCoverUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521737978849&di=947122b6b2f3e892c70861db6b094e0d&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F3ac79f3df8dcd10086324bf5738b4710b8122fb3.jpg";
    //     hotBookGroup.groupBeanList.push(hotbookBean3);

    //     hotBookGroup.groupId = '123345';
    //     hotBookGroup.groupName = '热门追更';
    //     hotBookGroup.groupType = 2;
    //     this.groupList.push(hotBookGroup);


    //     /**
    //      * 子banner模拟数据
    //      */
    //     let subBannerBean = new GroupStore();

    //     let subbannerBean = new BannerBean();
    //     subbannerBean.bannerImage = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522405337344&di=181a248d1af8051f01edfddd342d63fe&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F010f28589d69e1a8012060c88796cc.png%401280w_1l_2o_100sh.png';
    //     subbannerBean.bannerType = 1;
    //     subBannerBean.groupBeanList.push(subbannerBean);

    //     let subbannerBean1 = new BannerBean();
    //     subbannerBean1.bannerType = 2;
    //     subbannerBean1.bannerImage = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522405337344&di=181a248d1af8051f01edfddd342d63fe&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F010f28589d69e1a8012060c88796cc.png%401280w_1l_2o_100sh.png';
    //     subBannerBean.groupBeanList.push(subbannerBean1);

    //     let subbannerBean2 = new BannerBean();
    //     subbannerBean2.bannerType = 3;
    //     subbannerBean2.bannerImage = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522405337344&di=181a248d1af8051f01edfddd342d63fe&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F010f28589d69e1a8012060c88796cc.png%401280w_1l_2o_100sh.png';
    //     subBannerBean.groupBeanList.push(subbannerBean2);

    //     subBannerBean.groupId = '123345';
    //     subBannerBean.groupName = '推荐书单';
    //     subBannerBean.groupType = 0;
    //     this.groupList.push(subBannerBean);


    //     /**
    //      * 正常列表分组
    //      */
    //     let normalBookGroup = new GroupStore();

    //     let normalhotbookBean = new NormalBookBean();
    //     normalhotbookBean.bookName = "仙草。粮库，收藏不了！"
    //     normalhotbookBean.bookDescript = "一粒尘可填海，一根草斩尽日月星辰，弹指间天翻地覆。群雄并起，万族林立，诸圣争霸，乱天动地；问苍茫大地，谁主沉浮？一个少年从大荒中走出，一切从这里开始。";
    //     normalhotbookBean.bookCoverUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521737908503&di=6b7840789d49493bbf8e29c3251faf5f&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Dfe5ba490e6fe9925cb596154019872e9%2F6159252dd42a2834f0e98a5e5db5c9ea15cebf1c.jpg";
    //     normalBookGroup.groupBeanList.push(normalhotbookBean);

    //     let normalhotbookBean1 = new NormalBookBean();
    //     normalhotbookBean1.bookName = "麦田里的守望者"
    //     normalhotbookBean1.bookDescript = "大主宰》是天蚕土豆在2013年创作的第四部长篇小说，于起点中文网首发，与《斗破苍穹》和《武动乾坤》有联系，讲述少年牧尘不断成长的的故事。该小说于2017年7月9号完结。";
    //     normalhotbookBean1.bookCoverUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521737978850&di=20ffea2a6241ad6b78e0de434be0d079&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F4bed2e738bd4b31c023b2a8685d6277f9e2ff88c.jpg";
    //     normalBookGroup.groupBeanList.push(normalhotbookBean1);

    //     let normalhotbookBean2 = new NormalBookBean();
    //     normalhotbookBean2.bookName = "从你的全世界路过"
    //     normalhotbookBean2.bookDescript = "大主宰》是天蚕土豆在2013年创作的第四部长篇小说，于起点中文网首发，与《斗破苍穹》和《武动乾坤》有联系，讲述少年牧尘不断成长的的故事。该小说于2017年7月9号完结。";
    //     normalhotbookBean2.bookCoverUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521737978849&di=ee766183dac572a27bfca8a42e564803&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01f8ae5a117fb3a80121985c0bd36b.jpg%401280w_1l_2o_100sh.jpg";
    //     normalBookGroup.groupBeanList.push(normalhotbookBean2);

    //     let normalhotbookBean3 = new NormalBookBean();
    //     normalhotbookBean3.bookName = "蝴蝶花开紫丁香"
    //     normalhotbookBean3.bookDescript = "大主宰》是天蚕土豆在2013年创作的第四部长篇小说，于起点中文网首发，与《斗破苍穹》和《武动乾坤》有联系，讲述少年牧尘不断成长的的故事。该小说于2017年7月9号完结。";
    //     normalhotbookBean3.bookCoverUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521737978849&di=947122b6b2f3e892c70861db6b094e0d&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F3ac79f3df8dcd10086324bf5738b4710b8122fb3.jpg";
    //     normalBookGroup.groupBeanList.push(normalhotbookBean3);

    //     normalBookGroup.groupId = '123345';
    //     normalBookGroup.groupName = '热门追更';
    //     normalBookGroup.groupType = 4;
    //     this.groupList.push(normalBookGroup);
    // }
    /**
 * banner列表
 */
    // @observable
    // headBannerList = [];    //类型是BannerBean的列表

    @observable
    scrollViewOfsetY = 0;

    @observable
    groupList = [];      //类型是GroupStore的列表，这个不是最终数据，在此只是模拟
}



