/**
 * @author bangwen.lei
 */
export default class NvlBookDetail {
    id;//private Long
    bookId;//private String
    chargeMode;//private Integer //0-斯凯免费，1-斯凯按本计费，2-斯凯按章计费，3-咪咕计费
    bookName; //private String//书名
    authorName;//private String //作者
    recommend; //private String//简介
    bookSrc;//private Integer//图书来源
    bookNameColor;//private String//图书名颜色
    icon;//private String //图书封面
    cover;//private String //自定义封面
    chapterCount;//private Integer//章节数
    isContinue;//private Integer //是否连载:0-完结，1-连载
    inBag = 0; //private int //是否在书包
    bookUrl; //private String //书URL
    categoryName;//类别 private String 
}



