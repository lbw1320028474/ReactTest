import GlobleUrl from '../Globle/GlobleUrl'
import NetWorkUtil from '../Network/NetWorkUtil'
import AuthCodeRequest from '../Protocol/AuthCodeRequest'
import StringUtil from '../Utils/StringUtil'
export default class AuthCodeUtil {
    static getAuthCode(phoneNumber, callBack) {
        if (phoneNumber) {
            if (StringUtil.checkMobile(phoneNumber)) {
                try {
                    let authCodeRequest = new AuthCodeRequest();
                    authCodeRequest.mobile = phoneNumber;
                    NetWorkUtil.getJsonByPost(GlobleUrl.URL_BASE_URL + GlobleUrl.URL_AUTH_CODE,
                        JSON.stringify(authCodeRequest),
                        (data) => {
                            if (data && data.msgCode === 200) {
                                if (callBack) {
                                    callBack({ msgCode: 200, msg: '验证码获取成功' })
                                }
                            } else {
                                if (data) {
                                    if (callBack) {
                                        callBack({ msgCode: data.msgCode, msg: data.errMsg })
                                    }
                                } else {
                                    callBack({ msgCode: data.msgCode, msg: '' })
                                }
                            }
                        },
                        (err) => {
                            if (callBack) {
                                callBack({ msgCode: 0, msg: err })
                            }
                        }
                    )
                } catch (err) {
                    if (callBack) {
                        callBack({ msgCode: 0, msg: '验证码获取异常' })
                    }
                }
            } else {
                if (callBack) {
                    callBack({ msgCode: 0, msg: '电话号码不正确' })
                }
            }
        } else {
            if (callBack) {
                callBack({ msgCode: 0, msg: '电话号码不能为空' })
            }
        }
    }
}