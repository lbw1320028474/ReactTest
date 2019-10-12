import BaseRequest from './BaseRequest'
export default class CommonRecordRequest extends BaseRequest {
	/**
	 * 通用记录信息
	 */
	commonRecordInfos;//private List<CommonRecordInfo>

	/**
	 * 请求序列号
	 */
	reqSeq;//private String 
	/**
	 * 上次响应扩展信息
	 */
	rspExt;//private String


}