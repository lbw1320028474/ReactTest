import { observable, computed, action } from 'mobx'
import BookMenuBean from '../BookMenu/Store/BookMenuBean'
/**
 * 整个App共享数据全部放在这里
 */
export default class GroupStore {
    // constructor() {
    //     /**
    //      * 模拟数据，这里是测试
    //      */
    //     let bookBean = new BookMenuBean();
    //     bookBean.bookMenuName = "仙草。粮库，收藏不了！"
    //     bookBean.bookMenuCoverUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521737908503&di=6b7840789d49493bbf8e29c3251faf5f&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Dfe5ba490e6fe9925cb596154019872e9%2F6159252dd42a2834f0e98a5e5db5c9ea15cebf1c.jpg";
    //     this.groupBeanList.push(bookBean);

    //     let bookBean1 = new BookMenuBean();
    //     bookBean1.bookMenuName = "麦田里的守望者"
    //     bookBean1.bookMenuCoverUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521737978850&di=20ffea2a6241ad6b78e0de434be0d079&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F4bed2e738bd4b31c023b2a8685d6277f9e2ff88c.jpg";
    //     this.groupBeanList.push(bookBean1);

    //     let bookBean2 = new BookMenuBean();
    //     bookBean2.bookMenuName = "从你的全世界路过"
    //     bookBean2.bookMenuCoverUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521737978849&di=ee766183dac572a27bfca8a42e564803&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01f8ae5a117fb3a80121985c0bd36b.jpg%401280w_1l_2o_100sh.jpg";
    //     this.groupBeanList.push(bookBean2);

    //     let bookBean3 = new BookMenuBean();
    //     bookBean3.bookMenuName = "蝴蝶花开紫丁香"
    //     bookBean3.bookMenuCoverUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521737978849&di=947122b6b2f3e892c70861db6b094e0d&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F3ac79f3df8dcd10086324bf5738b4710b8122fb3.jpg";
    //     this.groupBeanList.push(bookBean3);

    //     let bookBean4 = new BookMenuBean();
    //     bookBean4.bookMenuName = "心由我生"
    //     bookBean4.bookMenuCoverUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521737978873&di=c6346dedc98eaa88c2b70bbf1747c9ed&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fa50f4bfbfbedab644313c863f336afc379311e2b.jpg";
    //     this.groupBeanList.push(bookBean4);

    //     let bookBean5 = new BookMenuBean();
    //     bookBean5.bookMenuName = "南方有乔木"
    //     bookBean5.bookMenuCoverUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521737978872&di=52432896c5c1c013b6bb776f8796813c&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fcaef76094b36acaffc053d1e7ad98d1000e99c6f.jpg";
    //     this.groupBeanList.push(bookBean5);

    //     this.groupId = '123345';
    //     this.groupName = '推荐书单';
    //     this.groupType = 1;
    // }

    @observable
    groupId = '';

    @observable
    groupName = '';

    @observable
    groupType = 0;      //分组类型，0:banner,  1：推荐书单 , 2: 热门追更， 3：小banner， 4：正常列表   ,5:3-1样式,  6:3-3样式

    @observable
    groupBeanList = [];      //类型是BookMenuBean的列表，这个不是最终数据，在此只是模拟

    @observable
    viewHeight = 0;

    viewOffset = 0;
}



