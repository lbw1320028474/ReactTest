export default class PageData {
    bookId;     //书ID
    chapterUrl;     //章节URL
    chapterData;      //数据
    chapterOrder;   //章节序号
    chapterCount;       //章节总数
    chapterSections;      //页数据分段
    chapterLines;//分页数据行
    chapterPages;//分页数据页
    chapterViews;      //页组件

    copy() {
        let newObc = new PageData();
        newObc.chapterUrl = this.chapterUrl;
        newObc.bookId = this.bookId;
        newObc.chapterData = this.chapterData;
        newObc.chapterOrder = this.chapterOrder;
        newObc.chapterCount = this.chapterCount;
        newObc.chapterSections = this.chapterSections;
        newObc.chapterLines = this.bookId;
        newObc.chapterPages = this.chapterPages;
        newObc.chapterViews = this.chapterViews;
        return newObc;
    }


}