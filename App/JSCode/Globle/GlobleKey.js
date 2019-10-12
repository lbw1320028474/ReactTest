export default class GlobleKey {
    static EVENT_BOOKCASE_RELOAD = 'EVENT_BOOKCASE_RELOAD';       //书架重新加载
    static EVENT_BOOKCASEITEM_LONGCLICK = 'EVENT_BOOKCASEITEM_LONGCLICK';       //书架item长按
    static EVENT_BOOKINFO_OPENCHAPTERLIST = 'EVENT_BOOKINFO_OPENCHAPTERLIST';       //图书详情打开抽屉
    static EVENT_READPAGE_OPENCHAPTERLIST = 'EVENT_READPAGE_OPENCHAPTERLIST';       //阅读页打开抽屉
    static EVENT_BOOKINFO_LOAD_NEWBOOK = 'EVENT_BOOKINFO_LOAD_NEWBOOK';       //加载新书
    static EVENT_BOOKREAD_RELOAD = 'EVENT_BOOKREAD_RELOAD';       //从新加载阅读页
    static EVENT_CATCH_CHANGED = 'EVENT_CATCH_CHANGED';       //缓存数据有更新
    static EVENT_WEB_BACK = 'EVENT_WEB_BACK';       //WEB页面返回
    static EVENT_TO_SEARCH = 'EVENT_TO_SEARCH';       //搜索
    static EVENT_CLICK_TO_CHANGEPAGE = 'EVENT_CLICK_TO_CHANGEPAGE';       //点击翻页
    static EVENT_SHARE_DIALOG = 'EVENT_SHARE_DIALOG';       //强制分享弹窗
    static EVENT_STAR_DIALOG = 'EVENT_STAR_DIALOG';       //评分弹窗



    static KeySearchHistoryList = 'KeySearchHistoryList';       //搜索历史列表
    static KeyBookCaseList = 'KeyBookCaseList';       //书架列表
    static KeyBookTag = 'KeyBookTag';       //书签
    static KeyUserLoadData = 'KeyUserLoadData';       //书签
    static KeyReadThemes = 'KeyReadThemes';       //阅读页主题缓存
    static KeyHomeTabData = 'KeyHomeTabData';       //首页tab数据缓存
    static KeyBookRoomData = 'KeyBookRoomData';       //书库
    static KeyBookCaseData = 'KeyBookCaseData';       //书架
    static KeyCategoryData = 'KeyCategoryData';       //分类
    static KeyRankData = 'KeyRankData';       //排行
    static KeyRecordList = 'KeyRecordList';       //埋点
    static KeyBookCaseType = 'KeyBookCaseType';       //埋点
    static KeyReadLogData = 'KeyReadLogData';     //阅读记录log
    static KeyAppUseLog = 'AppUseLog';     //app使用记录log
    static KeyGiveStar = 'KeyGiveStar';     //评分记录log
    static UpdataData = 'UpdataData';     //章节更新记录
    static QqIsInstall = 'QqIsInstall';     //章节更新记录
}