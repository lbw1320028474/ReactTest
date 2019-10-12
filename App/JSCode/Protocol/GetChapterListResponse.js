/**
 * @author bangwen.lei
 */
import BaseResponse from './BaseResponse'
export default class GetChapterListResponse extends BaseResponse {

	chapterList;//List<NvlChapterInfo>
	detail;//private NvlBookListDetail
}
