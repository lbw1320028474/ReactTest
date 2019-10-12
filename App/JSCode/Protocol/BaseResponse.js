


/**
 * @author bangwen.lei
 */
const MSG_CODE_SUCCESS = 200;
const MSG_CODE_UNKNOWN_ERROR = 139999;
export default class BaseResponse {

	/**
	 * 消息号
	 * 200：成功
	 */
    msgCode = MSG_CODE_SUCCESS;

	/**
	 * 错误描述
	 */
    errMsg;
	/**
	 * 请求序列
	 */
    reqSeq;


}

