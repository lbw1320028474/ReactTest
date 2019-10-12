
export default class Page {
    pageType = -1;      //0:第一页, 1:中间页， 2：最后一页，3：第一页也是最后一页
    lines = [];   //页面内容
    pageIndex = 1;
    chapterOrder = 1;       //此页面属于哪一章节
    chapterName = '';       //此页面属于的章节名称
    bookId = 0;     //此页面属于哪一本书
    pageSize = 0;
}