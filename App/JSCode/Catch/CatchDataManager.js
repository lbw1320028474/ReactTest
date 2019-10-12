export default class CatchDataManager {
    static allCatchMap = new Map();     //以bookid为节点的map，方便分类
    static allCatchQueue = new Map();       //以章节列表为节点的map， 方便增删改查
    static catchIsOver = true;     //缓存线程是否已经结束

}