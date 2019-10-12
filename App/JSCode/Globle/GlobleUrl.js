// const URL_BASE = 'http://charge.mo-sky.cn:10206/zm-nvl-mis';
const URL_BASE = 'http://android.51mrp.com/zm-nvl-mis';
// const URL_BASE = 'http://172.16.10.44:8482/zm-nvl-mis';
export default class GlobleUrl {

    static URL_BASE_URL = URL_BASE;  //基础请求URL地址
    static URL_BOOKBAG = '/nvl/bookbag/operate.do';       //书包操作
    static URL_TABHOME_DATA = '/nvl/navi/query.do';       //tab页所有数据
    static URL_SEARCH_WORD_LIST = '/nvl/searchwords/query.do';       //搜索关键词列表
    static URL_SEARCH_BOOK_LIST = '/nvl/searchbook/query.do';       //搜索
    static URL_AUTH_CODE = '/nvl/authcode/query.do';       //验证码
    static URL_LOGIN = '/nvl/login/login.do';       //登录
    static URL_REGISTER = '/nvl/register/register.do';       //注册
    static URL_THIRDLOGIN_UID = '/nvl/thirdlogin/login.do';       //第三方登录唯一标识上传
    static URL_SEARCHTIPS = '/nvl/searchtips/query.do';       //联想词
    static URL_CHAPTER_LIST = '/nvl/chapterlist/query.do';       //章节列表
    static URL_BOOK_INFO = '/nvl/book/query.do';       //小说详情
    static URL_CHAPTER_INFO = '/nvl/chapter/query.do';       //小说章节详情
    static URL_UPDATA_CHECK = '/nvl/upgrade/query.do';       //检测插件更新
    static URL_PASSWORD_RESET = '/nvl/getpassword/getpassword.do';       //密码重置
    static URL_GROUP_LIST = '/nvl/groupbook/query.do';       //组列表
    static URL_GET_SKY_ID = '/nvl/thirdlogin/login.do';       //获取第三方登录后的skyID
    static URL_RECORD_LIST = '/record/upload.do';       //上传埋点
    static URL_NAVIL_LIST = '/nvl/navilist/query.do';       //导航
    static URL_NAVIL_INFO = '/nvl/naviinfo/query.do';       //导航详情
    static URL_BOOKMENU_LIST_INFO = '/nvl/modulebooklist/query.do';       //书单更多
    static URL_BOOKMENU_INFO = '/nvl/listbook/query.do';       //书单详情
}