

export default class ChapterTrueCount {
    /**
     * 当前书的实际章节总数(从网络获取到的，不能使用缓存里面的，因为由于章节更新等原因，缓存里面的总数会不准)
     */
    static chapterCount = 0;        //这里的这两个字段是一起使用的
    /**
     * 对应的图书ID
     */
    static bookId = 0;      //


}