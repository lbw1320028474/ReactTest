/**
 * @author bangwen.lei
 */
import BaseRequest from './BaseRequest'
export default class GetChapterDetailRequest extends BaseRequest {

	bookId;//long 书籍ID
	//章节序号
	chapterOrder; //int 

	chapterUrl;

}
