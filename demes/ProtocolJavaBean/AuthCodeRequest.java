package com.skymobi.payment.nvl.api.model;

import com.skymobi.payment.nvl.api.model.common.BaseRequest;


/**
 * 获取手机验证码请求类
 * @author raymond.fan
 *
 */
public class AuthCodeRequest extends BaseRequest{
	

	private String mobile;
	//3:小说wap注册 4:小说wap重置密码
	private String src;
	
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getSrc() {
		return src;
	}
	public void setSrc(String src) {
		this.src = src;
	}
	
}
