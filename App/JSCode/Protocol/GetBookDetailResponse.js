
import BaseResponse from './BaseResponse'
export default class GetBookDetailResponse extends BaseResponse {
    recommendList;//List<NvlBookListDetail>
    detail;//NvlBookDetail
    chapterList;//List<NvlChapterInfo>
    latestChapterInfo;//NvlChapterInfo
}
