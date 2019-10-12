/**
 * @author bangwen.lei
 */
export default class CatchChapterBean {
	id = 0;//Long
	chapterId = '';//String
	bookId = '';//Long
	chapterOrder = 1;//int
	chapterName = '';//String
	wordCount = 0;//Long		//这个是章节总数，不是字数，字段取名有问题，但是现在改了会导致很多地方使用有问题所以没有改为chapterCount，历史遗留问题
	chapterUrl = '';//String
	catchState = 100;	//是否缓存成功， 100：未成功， 200：成功，，可能你会好奇为啥要用数字100和200，因为sqlite里面boolean类型可能会莫名其妙的转换成数字0和1误导我做判断，干脆跳过boolean和0和1
	chapterContent = '';//String
	needInsertLog = 100;		//是否需要插入记录,100:需要插入， 200：不需要插入
	errTimes = 0;
	needCatch = 100;
}
